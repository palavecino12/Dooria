import { useEffect, useRef, useState } from "react";
import { socket } from "../services/socketServices";
import type { FormValues } from "../schemas/schemaForm";

interface props {
    isMobile: boolean,
    streamRef: React.RefObject<MediaStream | null>,
    faceDetection?: {
        estadoRostro: string;
        estadoAcceso: string;
        user: FormValues | null;
    }
}

export const useWebRTC = ({ isMobile, streamRef, faceDetection }: props) => {

    const peerConnection = useRef<RTCPeerConnection | null>(null);

    const [remoteState, setRemoteState] = useState({
        estadoRostro: "ninguno",
        estadoAcceso: "denegado",
        user: null,
    });


    //Cuando el intercom detecta que un viewer se conectó
    const onViewerConnected = async (viewerId: string) => {
        try {
            console.log("Nuevo espectador:", viewerId);

            await createOffer(viewerId);

        } catch (error) {
            console.error("Error creando la oferta:", error);
        }
    };

    //Creamos la oferta y la enviamos
    const createOffer = async (viewerId: string) => {

        createPeerConnection();

        if (!peerConnection.current) return;

        // Sólo agregamos tracks si todavía no hay ninguno.
        if (peerConnection.current.getSenders().length === 0) {
            addLocalTracks();
        }

        const offer = await peerConnection.current.createOffer();

        await peerConnection.current.setLocalDescription(offer);

        socket.emit("offer", {
            viewerId,
            offer,
        });
    };

    //Respondemos a la oferta recibida en el mobile
    const onOffer = async (offer: RTCSessionDescriptionInit) => {
        try {

            console.log("Oferta recibida", offer);

            await createAnswer(offer);

        } catch (error) {
            console.error("Error creando la respuesta:", error);
        }


    };

    //Creamos una respuesta del mobile al intercom.
    const createAnswer = async (offer: RTCSessionDescriptionInit) => {

        createPeerConnection();

        if (!peerConnection.current) return;

        //Guardamos la Offer del Intercom
        await peerConnection.current.setRemoteDescription(offer);
        console.log(peerConnection.current.remoteDescription);

        //Creamos la Answer
        const answer = await peerConnection.current.createAnswer();

        //La guardamos como descripción local
        await peerConnection.current.setLocalDescription(answer);
        console.log(peerConnection.current.localDescription);
        console.log("Answer creada", answer);

        socket.emit("answer", {
            answer
        });

    };

    //Recibimos la respuesta del mobile.
    const onAnswer = async (answer: RTCSessionDescriptionInit) => {

        if (!peerConnection.current) return;

        await peerConnection.current.setRemoteDescription(answer);

        console.log("Answer recibida");
    };

    //Eventos del intercom.
    const registerIntercomEvents = () => {

        socket.on("viewer-connected", ({ viewerId }) => {
            onViewerConnected(viewerId);
        });

        socket.on("answer", ({ answer }) => {
            onAnswer(answer);
        });

        socket.on("ice-candidate", ({ candidate }) => {
            onIceCandidate(candidate);
        });

    };

    //Eventos del mobile
    const registerMobileEvents = () => {

        socket.on("offer", ({ offer }) => {
            onOffer(offer);
        });

        socket.on("ice-candidate", ({ candidate }) => {
            onIceCandidate(candidate);
        });

        socket.on("face-state", (state) => {
            console.log("Estado recibido", state);
            setRemoteState(state);
        });

    };

    const createPeerConnection = () => {

        if (peerConnection.current) {
            return peerConnection.current;
        }

        peerConnection.current = new RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun.l.google.com:19302",
                },
            ],
        });

        peerConnection.current.onicecandidate = (event) => {

            console.log("Evento ICE", event);

            if (!event.candidate) return;
            console.log("ICE generado", event.candidate);

            if (isMobile) {

                socket.emit("ice-candidate-mobile", {
                    candidate: event.candidate
                });

            } else {

                socket.emit("ice-candidate-intercom", {
                    candidate: event.candidate
                });

            }

        };

        peerConnection.current.onicegatheringstatechange = () => {
            console.log(
                "ICE Gathering:",
                peerConnection.current?.iceGatheringState
            );
        };

        return peerConnection.current;

    };

    const addLocalTracks = () => {

        if (!peerConnection.current) return;

        if (!streamRef.current) {
            console.log("No hay stream todavía");
            return;
        }

        streamRef.current.getTracks().forEach(track => {
            peerConnection.current?.addTrack(track, streamRef.current);
        });

        console.log("Tracks agregados");
    };

    const onIceCandidate = async (candidate: RTCIceCandidateInit) => {

        if (!peerConnection.current) return;

        await peerConnection.current.addIceCandidate(candidate);

        console.log("ICE agregado");

    };

    useEffect(() => {

        if (isMobile) return;
        if (!faceDetection) return;

        console.log("Enviando face-state:", faceDetection);

        socket.emit("face-state", faceDetection);

    }, [faceDetection, isMobile]);

    useEffect(() => {



        //Le identificamos al back cuando alguien represente el intercom
        //Y cuando alguien quiera verlo desde mobile.
        socket.emit(isMobile ? "watch-intercom" : "join-intercom");

        //Eventos del intercom y del mobile.
        if (isMobile) {
            registerMobileEvents();
        } else {
            registerIntercomEvents();
        }

        return () => {
            socket.off("viewer-connected");
            socket.off("offer");
            socket.off("answer");
            socket.off("face-state");

            peerConnection.current?.close();
            peerConnection.current = null;
        };

    }, [isMobile]);

    return { peerConnection, remoteState };
};
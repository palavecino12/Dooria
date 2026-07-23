import { useEffect, useRef, useState } from "react";
import { socket } from "../services/socketServices";
import type { FormValues } from "../schemas/schemaForm";

interface props {
    isMobile: boolean,
    streamRef: React.RefObject<MediaStream | null>,
    videoRef: React.RefObject<HTMLVideoElement | null>,
    faceDetection?: {
        estadoRostro: string;
        estadoAcceso: string;
        user: FormValues | null;
    }
}

export const useWebRTC = ({ isMobile, streamRef, faceDetection, videoRef }: props) => {

    //STATES
    const peerConnection = useRef<RTCPeerConnection | null>(null);
    const [remoteState, setRemoteState] = useState({
        estadoRostro: "ninguno",
        estadoAcceso: "denegado",
        user: null,
    });

    //SOCKET EVENTS

    //Cuando el intercom detecta que un viewer se conectó:
    const onViewerConnected = async (viewerId: string) => {
        try {
            console.log("Nuevo espectador:", viewerId);
            await createOffer(viewerId);
        } catch (error) {
            console.error("Error creando la oferta:", error);
        }
    };

    //Respondemos a la oferta recibida en el mobile.
    const onOffer = async (offer: RTCSessionDescriptionInit) => {
        try {
            await createAnswer(offer);
        } catch (error) {
            console.error("Error creando la respuesta:", error);
        }
    };

    //Recibimos la respuesta del mobile en el intercom.
    const onAnswer = async (answer: RTCSessionDescriptionInit) => {
        if (!peerConnection.current) return;
        //Almacenamos la respuesta.
        await peerConnection.current.setRemoteDescription(answer);
        console.log("Answer recibida");
    };

    //Recibimos un ice candidate del otro extremo (intercom o mobile) y lo agregamos a la conexión webrtc.
    const onIceCandidate = async (candidate: RTCIceCandidateInit) => {
        if (!peerConnection.current) return;
        await peerConnection.current.addIceCandidate(candidate);
    };

    //WEBRTC

    //Funcion para crear la conexion webrtc.
    const createPeerConnection = () => {

        //Evitamos crear dos conexiones.
        if (peerConnection.current) {
            return peerConnection.current;
        }

        //Creamos la conexion webrtc.
        peerConnection.current = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302", },],
        });

        //Cada vez que webrtc encuentra una posible ruta: 
        peerConnection.current.onicecandidate = (event) => {

            if (!event.candidate) return;

            //Mandamos el ice al otro dispositivo.
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

        //Se ejecuta cuando webrtc recibe un track remoto.
        peerConnection.current.ontrack = (event) => {

            if (!videoRef.current) return;

            //Asignamos el MediaStream recibido al elemento <video>.
            videoRef.current.srcObject = event.streams[0];
        };

        return peerConnection.current;
    };

    //Agregamos el track del video, creamos la oferta y la emitimos.
    const createOffer = async (viewerId: string) => {

        const pc = createPeerConnection();

        if (!pc) return;

        //Sólo agregamos tracks si todavía no hay ninguno.
        if (pc.getSenders().length === 0) {
            addLocalTracks();
        }

        const offer = await pc.createOffer();

        await pc.setLocalDescription(offer);

        socket.emit("offer", { viewerId, offer, });
    };


    //Creamos una respuesta del mobile al intercom.
    const createAnswer = async (offer: RTCSessionDescriptionInit) => {

        const pc = createPeerConnection();

        if (!pc) return;

        //Guardamos la offer del intercom.
        await pc.setRemoteDescription(offer);

        //Creamos la answer.
        const answer = await pc.createAnswer();

        //La guardamos como descripción local.
        await pc.setLocalDescription(answer);

        socket.emit("answer", { answer });
    };

    //Agregamos el video (tracks) de la camara a la conexion webrtc para que pueda transmitirse.
    const addLocalTracks = () => {

        if (!peerConnection.current) return;
        if (!streamRef.current) return;

        const stream = streamRef.current;

        streamRef.current.getTracks().forEach(track => {
            peerConnection.current?.addTrack(track, stream);
        });
    };

    //REGISTRO DE EVENTOS

    //Eventos del intercom.
    const registerIntercomEvents = () => {

        //El back nos avisa que llego un viewer.
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

    //Eventos del mobile.
    const registerViewerEvents = () => {

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

    //EFFECTS

    //Solo pasamos por socket el estado del rostro en tiempo real.
    useEffect(() => {

        if (isMobile) return;
        if (!faceDetection) return;

        socket.emit("face-state", faceDetection);

    }, [faceDetection, isMobile]);

    useEffect(() => {

        //Le identificamos al back cuando alguien represente el intercom
        //Y cuando alguien quiera verlo desde mobile.
        socket.emit(isMobile ? "watch-intercom" : "join-intercom");

        //Eventos del intercom y del mobile.
        if (isMobile) {
            registerViewerEvents();
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
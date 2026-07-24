//Este hook gestiona la conexion WebRTC (transmisin de video) entre el intercom y los viewers.
//Usa socket.io para manejar la señalización, intercambiando offers, answers y ice candidates entre ambas entidades.
import { useEffect, useRef } from "react";
import { socket } from "../services/socketServices";

interface props {
    isMobile: boolean,
    streamRef: React.RefObject<MediaStream | null>,
    videoRef: React.RefObject<HTMLVideoElement | null>,
}

export const useWebRTC = ({ isMobile, streamRef, videoRef }: props) => {

    //REFS

    //Intercom: muchas conexiones
    const peerConnections = useRef<Map<string, RTCPeerConnection>>(new Map());
    //Viewer: una sola conexión
    const peerConnection = useRef<RTCPeerConnection | null>(null);

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
    const onAnswer = async (viewerId: string, answer: RTCSessionDescriptionInit) => {

        const pc = peerConnections.current.get(viewerId)

        if (!pc) return;

        //Almacenamos la respuesta.
        await pc.setRemoteDescription(answer);
    };

    //Recibimos un ice candidate del viewer y lo agregamos a la conexión webrtc.
    const onIceCandidateIntercom = async (viewerId: string, candidate: RTCIceCandidateInit) => {

        const pc = peerConnections.current.get(viewerId)

        if (!pc) return

        await pc.addIceCandidate(candidate);
    };

    //Recibimos un ice candidate del intercom y lo agregamos a la conexión webrtc.
    const onIceCandidateViewer = async (candidate: RTCIceCandidateInit) => {

        if (!peerConnection.current) return;

        await peerConnection.current.addIceCandidate(candidate);
    };

    //WEBRTC

    const createViewerPeerConnection = () => {

        if (peerConnection.current) {
            return peerConnection.current;
        }

        const pc = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
        });

        pc.onicecandidate = (event) => {
            if (!event.candidate) return;
            if (!socket.id) return;

            socket.emit("ice-candidate-mobile", {
                viewerId: socket.id,
                candidate: event.candidate
            });
        };

        pc.ontrack = (event) => {
            if (!videoRef.current) return;
            videoRef.current.srcObject = event.streams[0];
        };

        peerConnection.current = pc;

        return pc;
    };

    const createIntercomPeerConnection = (viewerId: string) => {

        const existing = peerConnections.current.get(viewerId);
        if (existing) return existing;

        //Creamos la conexion webrtc.
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302", },],
        });

        //La guardamos para reutilizarla.
        peerConnections.current.set(viewerId, pc);

        pc.onicecandidate = (event) => {

            if (!event.candidate) return;

            socket.emit("ice-candidate-intercom", {
                viewerId,
                candidate: event.candidate
            });
        };

        return pc;
    };

    //Agregamos el track del video, creamos la oferta y la emite.
    const createOffer = async (viewerId: string) => {

        const pc = createIntercomPeerConnection(viewerId);

        if (!pc) return;

        //Sólo agrega tracks si todavía no hay ninguno.
        if (pc.getSenders().length === 0) {
            addLocalTracks(pc);
        }

        const offer = await pc.createOffer();

        await pc.setLocalDescription(offer);

        socket.emit("offer", { viewerId, offer, });
    };


    //Crea una respuesta del viewer al intercom.
    const createAnswer = async (offer: RTCSessionDescriptionInit) => {

        const pc = createViewerPeerConnection();

        await pc.setRemoteDescription(offer);

        const answer = await pc.createAnswer();

        await pc.setLocalDescription(answer);

        if (!socket.id) return

        socket.emit("answer", { viewerId: socket.id, answer });
    };

    //Agrega el video (tracks) de la camara a la conexion webrtc para que pueda transmitirse.
    const addLocalTracks = (pc: RTCPeerConnection) => {

        if (!streamRef.current) return;

        const stream = streamRef.current;

        streamRef.current.getTracks().forEach(track => {
            pc.addTrack(track, stream);
        });
    };

    //REGISTRO DE EVENTOS

    //Eventos del intercom.
    const registerIntercomEvents = () => {

        //El back nos avisa que llego un viewer.
        socket.on("viewer-connected", ({ viewerId }) => {
            onViewerConnected(viewerId);
        });

        socket.on("answer", ({ viewerId, answer }) => {
            onAnswer(viewerId, answer);
        });

        socket.on("ice-candidate", ({ viewerId, candidate }) => {
            onIceCandidateIntercom(viewerId, candidate);
        });
    };

    //Eventos del mobile.
    const registerViewerEvents = () => {

        socket.on("offer", ({ offer }) => {
            onOffer(offer);
        });

        socket.on("ice-candidate", ({ candidate }) => {
            onIceCandidateViewer(candidate);
        });
    };

    //EFFECT

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

        //Guarda las referencias actuales para el cleanup seguro
        const currentPeerConnections = peerConnections.current;
        const currentPeerConnection = peerConnection.current;

        return () => {
            socket.off("viewer-connected");
            socket.off("offer");
            socket.off("answer");

            currentPeerConnections.forEach(pc => pc.close());
            currentPeerConnections.clear();

            currentPeerConnection?.close();
        };

    }, [isMobile]);

    return null;
};
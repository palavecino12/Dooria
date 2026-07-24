//Este hook gestiona la comunicacion del estado del rostro entre el intercom y los viewers mediante socket.io.
//El intercom emite el estado detectado y los viewers reciben dicho estado en tiempo real.
import { useEffect, useState } from "react";
import { socket } from "../services/socketServices";
import type { FormValues } from "../schemas/schemaForm";

interface Props {
    isMobile: boolean;
    faceDetection?: {
        estadoRostro: string;
        estadoAcceso: string;
        user: FormValues | null;
    }
}

export const useFaceStateSocket = ({ isMobile, faceDetection }: Props) => {

    const [remoteState, setRemoteState] = useState({
        estadoRostro: "ninguno",
        estadoAcceso: "denegado",
        user: null,
    });

    //Intercom manda el estado.
    useEffect(() => {

        if (isMobile) return;
        if (!faceDetection) return;

        socket.emit("face-state", faceDetection);

    }, [faceDetection, isMobile]);

    //Viewer recibe el estado.
    useEffect(() => {

        if (!isMobile) return;

        const handleFaceState = (state: typeof remoteState) => {
            console.log("Estado recibido", state);
            setRemoteState(state);
        };

        socket.on("face-state", handleFaceState);

        return () => { socket.off("face-state", handleFaceState); };

    }, [isMobile]);

    return { remoteState };
};
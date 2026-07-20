//Componente final del registro de usario, obtiene todos los datos de los formularios, crea el descriptor y almacena el usuario
import { useState } from "react";
import { useCamera } from "../../hooks/useCamera";
import { useFaceDetection } from "../../hooks/useFaceDetection";
import type { FormValues } from "../../schemas/schemaForm";
import { SuccessFeedback } from "../feedback/SuccessFeedback";
import { FaceGuide } from "./FaceGuide";
import { Header } from "../common/Header";
import { useRegisterUser } from "../../hooks/useRegisterUser";
import { Loading } from "../feedback/Loading";
import { ErrorFeedback } from "../feedback/ErrorFeedback";

interface props {
    data: FormValues
    backToForm: () => void
}

export const CameraRegister = ({ data, backToForm }: props) => {

    const videoRef = useCamera();

    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { estadoRostro, latestDescriptorRef } = useFaceDetection({ videoRef });
    const { createUser, loading } = useRegisterUser()

    //Funcion para almacenar el usuario
    const handleRegister = async () => {
        try {

            if (!latestDescriptorRef.current) {
                throw new Error("No hay descriptor disponible");
            }

            const message = await createUser(data, latestDescriptorRef.current);
            setSuccessMessage(message);

        } catch (err) {
            if (err instanceof Error) {
                setErrorMessage(err.message);
            } else {
                setErrorMessage("Error desconocido");
            }
        }
    };

    //Mostramos pantalla de feedback
    if (successMessage) return <SuccessFeedback message={successMessage} />;
    if (errorMessage) return <ErrorFeedback message={errorMessage} />;

    //Diferentes estados de la UI dependiendo del estado del rostro
    const faceUI = {
        ninguno: {
            color: "border-gray-300",
            glow: "",
            messageBg: "bg-gray-900",
            messageText: "text-white",
            message: "Coloque su rostro en la cámara",
        },
        procesando: {
            color: "border-[#b9911c]",
            glow: "shadow-[0_0_25px_rgba(250,204,21,0.7)] animate-pulse",
            messageBg: "bg-[#b9911c]",
            messageText: "text-black",
            message: "Analizando rostro...",
        },
        desconocido: {
            color: "border-[#15803d]",
            glow: "shadow-[0_0_25px_rgba(34,197,94,0.8)]",
            messageBg: "bg-[#15803d]",
            messageText: "text-white",
            message: "Registrar",
        },
        reconocido: {
            color: "border-[#b91c1c]",
            glow: "shadow-[0_0_25px_rgba(239,68,68,0.8)]",
            messageBg: "bg-[#b91c1c]",
            messageText: "text-white",
            message: "Este usuario ya existe",
        },
    };
    const currentUI = faceUI[estadoRostro];

    return (
        <>
            {/* Componente loading */}
            {loading && <Loading />}

            <div className="w-full h-dvh bg-gray-200 text-white flex flex-col">

                <Header title="Escaneo de Rostro"></Header>

                <main className="flex-1 flex flex-col items-center justify-center gap-6">
                    {/* Contenedor del video */}
                    <div className={`relative w-75 h-[400px] overflow-hidden rounded-[50%] bg-black border-[5px] transition-all duration-300 ${currentUI.color} ${currentUI.glow}`}>
                        <video ref={videoRef} autoPlay muted className="absolute inset-0 w-full h-full object-cover -scale-x-100"></video>
                        <FaceGuide color={currentUI.color} />
                    </div>

                    {/* Estado del rostro */}
                    {/* Colocamos los mensajes en un boton para poder hacer transicion */}
                    <button
                        onClick={estadoRostro === "desconocido" ? handleRegister : undefined}
                        disabled={estadoRostro !== "desconocido" || loading}
                        className={`font-medium text-lg transition-all duration-300 ${currentUI.messageBg} ${currentUI.messageText}
                ${estadoRostro === "desconocido"
                                ? "h-11 w-40 rounded-lg font-medium shadow-lg transition-all duration-150 active:scale-95 select-none"
                                : "px-6 py-2 rounded-3xl cursor-default"
                            }`}>
                        {currentUI.message}
                    </button>

                    {/* Botones */}
                    <div className="flex transition-all duration-300">
                        {estadoRostro !== "desconocido" && (
                            <button
                                onClick={backToForm}
                                className="bg-white border border-black/20 w-40 h-11 text-black rounded-lg shadow-lg transition-all 
                        duration-200 active:bg-gray-200 active:shadow-inner">
                                Volver
                            </button>)
                        }
                    </div>
                </main>
            </div>
        </>

    );
}

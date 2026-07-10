//Componente final del registro de usario, obtiene todos los datos de los formularios, crea el descriptor y almacena el usuario
import { useState } from "react";
import { useCamera } from "../../hooks/useCamera";
import { useFaceDetection } from "../../hooks/useFaceDetection";
import type { FormValues } from "../../schemas/schemaForm";
import { Success } from "../feedback/Success";
import { FaceGuide } from "./FaceGuide";
import { Header } from "../common/Header";

interface props {
    data: FormValues
    backToForm: () => void
}

export const CameraRegister = ({ data, backToForm }: props) => {

    const [success, setSuccess] = useState(false)
    const videoRef = useCamera();
    const { estadoRostro, registrarRostro } = useFaceDetection({ videoRef });

    //Funcion para almacenar el usuario
    const handleRegister = async () => {
        try {
            const resp = await registrarRostro({
                name: data.name,
                lastName: data.lastName,
                dni: data.dni,
                number: data.number,
                address: data.address,
                rol: data.rol,
                allowedDays: data.allowedDays,
                allowedDates: data.allowedDates
                //Agregar los atributos de acceso opcionales
            });
            console.log("Respuesta registro:", resp);

            setSuccess(true);
            
        } catch (err) {
            console.error("Error al registrar rostro:", err);
        }
    };
    //Mostramos pantalla de exito si todo sale bien (hay que crear el hook para registraer el ususario y usarlo aca)
    if (success) return <Success message="Usuario creado con exito!" />;

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
            color: "border-yellow-400",
            glow: "shadow-[0_0_25px_rgba(250,204,21,0.7)] animate-pulse",
            messageBg: "bg-yellow-400",
            messageText: "text-black",
            message: "Analizando rostro...",
        },
        desconocido: {
            color: "border-green-500",
            glow: "shadow-[0_0_25px_rgba(34,197,94,0.8)]",
            messageBg: "bg-green-600",
            messageText: "text-white",
            message: "Registrar",
        },
        reconocido: {
            color: "border-red-500",
            glow: "shadow-[0_0_25px_rgba(239,68,68,0.8)]",
            messageBg: "bg-red-600",
            messageText: "text-white",
            message: "Este usuario ya existe",
        },
    };
    const currentUI = faceUI[estadoRostro];

    return (
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
                    disabled={estadoRostro !== "desconocido"}
                    className={`font-medium text-lg transition-all duration-300 ${currentUI.messageBg} ${currentUI.messageText}
                ${estadoRostro === "desconocido"
                            ? "h-11 w-40 rounded-xl cursor-pointer active:scale-95 hover:scale-105"
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
    );
}

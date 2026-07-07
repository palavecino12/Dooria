//Componente final del registro de usario, obtiene todos los datos de los formularios, crea el descriptor y almacena el usuario
import { useState } from "react";
import { useCamera } from "../../hooks/useCamera";
import { useFaceDetection } from "../../hooks/useFaceDetection";
import type { FormValues } from "../../schemas/schemaForm";
import { useNavigate } from "react-router-dom";
import { Success } from "../feedback/Success";

interface props {
    data: FormValues
    backToForm: () => void
}

export const CameraRegister = ({ data, backToForm }: props) => {

    const [success, setSuccess] = useState(false)
    const videoRef = useCamera();
    const { estadoRostro, registrarRostro } = useFaceDetection({ videoRef });
    const navigate = useNavigate()

    //Funcion para almacenar el usuario
    const handleRegistrar = async () => {
        try {
            const resp = await registrarRostro({
                name: data.name,
                lastName: data.lastName,
                dni: data.dni,
                number: data.number,
                address: data.address,
                rol: data.rol,
                accessType: data.accessType,
                allowedDays: data.allowedDays,
                allowedDates: data.allowedDates
                //Agregar los atributos de acceso opcionales
            });
            console.log("Respuesta registro:", resp);

            //En caso de exito mostramos una pantalla de success, luego redirigimos al inicio
            setSuccess(true);
            setTimeout(() => {
                navigate("/mobile")
            }, 2500);


        } catch (err) {
            console.error("Error al registrar rostro:", err);
        }
    };
    //Mostramos pantalla de exito si todo sale bien
    if (success) return <Success />;

    //Diferentes estados de la UI dependiendo del estado del rostro
    const faceUI = {
        ninguno: {
            border: "border-gray-300",
            glow: "",
            messageBg: "bg-gray-900",
            messageText: "text-white",
            message: "Coloque su rostro en la cámara",
        },
        procesando: {
            border: "border-yellow-400",
            glow: "shadow-[0_0_25px_rgba(250,204,21,0.7)] animate-pulse",
            messageBg: "bg-yellow-400",
            messageText: "text-black",
            message: "Analizando rostro...",
        },
        desconocido: {
            border: "border-green-500",
            glow: "shadow-[0_0_25px_rgba(34,197,94,0.8)]",
            messageBg: "bg-green-600",
            messageText: "text-white",
            message: "Rostro listo para registrar",
        },
        reconocido: {
            border: "border-red-500",
            glow: "shadow-[0_0_25px_rgba(239,68,68,0.8)]",
            messageBg: "bg-red-600",
            messageText: "text-white",
            message: "Este usuario ya existe",
        },
    };
    const currentUI = faceUI[estadoRostro];

    return (
        <div className="w-full h-screen bg-gray-200 text-white flex flex-col items-center justify-center gap-6">

            {/* Titulo */}
            <h1 className="text-black text-3xl font-medium">Escaneo de rostro</h1>

            <div className=" flex flex-col items-center gap-10 pt-10 pb-10 m-10 bg-white
                shadow-[0_4px_10px_rgba(0,0,0,0.15),0_-4px_10px_rgba(0,0,0,0.15)] w-full">

                {/* Contenedor del video y el canvas superpuestos */}
                <div className={`relative w-75 h-[400px] overflow-hidden rounded-[50%] bg-black border-[5px] transition-all duration-300 ${currentUI.border} ${currentUI.glow}`}>
                    <video ref={videoRef} autoPlay muted className="absolute inset-0 w-full h-full object-contain"></video>
                </div>

                {/* Estado del rostro */}
                <p className={`px-5 py-3 rounded-xl font-medium transition-all duration-300 ${currentUI.messageBg} ${currentUI.messageText}`}>
                    {currentUI.message}
                </p>
            </div>

            {/* Botones */}
            <div className="flex flex-row-reverse gap-20">
                <button
                    onClick={handleRegistrar}
                    className="bg-black w-34 h-11 text-white rounded-lg shadow-lg transition-all duration-200
                        active:bg-gray-200 active:shadow-inner">Registrar rostro</button>
                <button
                    onClick={backToForm}
                    className="bg-white border border-black/20 w-28 h-11 text-black rounded-lg shadow-lg transition-all duration-200
                        active:bg-gray-200 active:shadow-inner">Volver</button>
            </div>
        </div>
    );
}

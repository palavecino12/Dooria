//Componente final del registro de usario, obtiene todos los datos de los formularios, crea el descriptor y almacena el usuario
import { useState } from "react";
import { useCamera } from "../../hooks/useCamera";
import { useFaceDetection } from "../../hooks/useFaceDetection";
import type { FormValues } from "../../schemas/schemaForm";
import { useNavigate } from "react-router-dom";
import { Success } from "../feedback/Success";

interface props{
    data:FormValues
    backToForm:()=>void
}

export const CameraRegister=({data,backToForm}:props)=> {

    const [success, setSuccess]=useState(false)
    const videoRef = useCamera();
    const component="register"
    const { canvasRef, estadoRostro, registrarRostro } = useFaceDetection({videoRef,component});
    const navigate = useNavigate()

    //Funcion para almacenar el usuario
    const handleRegistrar = async () => {
        try {
            const resp = await registrarRostro({
                name: data.name,
                lastName: data.lastName,
                dni: data.dni,
                number: data.number,
                address:data.address,
                rol: data.rol,
                accessType:data.accessType,
                allowedDays:data.allowedDays,
                allowedDates:data.allowedDates                
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
    if(success) return <Success/>;

    return (
        <div className="w-full h-screen bg-white text-white flex flex-col items-center justify-center p-6 gap-6">

            {/* Contenedor del video y el canvas superpuestos */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl">
                <video ref={videoRef} autoPlay muted className="absolute inset-0 w-full h-full object-cover"></video>
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
            </div>

            {/* Estado del rostro */}
            <p className={`
                    text-lg font-semibold px-4 py-2 rounded-xl
                    ${estadoRostro === "reconocido" ? "bg-red-700" : ""}
                    ${estadoRostro === "desconocido" ? "bg-green-700" : ""}
                    ${estadoRostro === "procesando" ? "bg-yellow-600 text-black" : ""}
                    ${estadoRostro === "ninguno" ? "bg-gray-700" : ""}`}>
                    
                    {estadoRostro === "reconocido" ? "Este usuario ya existe" : ""}
                    {estadoRostro === "desconocido" ? "Rostro listo para almacenar" : ""}
                    {estadoRostro === "procesando" ? "Espere..." : ""}
                    {estadoRostro === "ninguno" ? "Coloque su rostro en la camara" : ""}
            </p>

            {/* Botones */}
            <div className="flex flex-row-reverse gap-20">
                <button
                    onClick={handleRegistrar}
                    className="bg-gray-900/20 p-3 text-black/70 rounded-xl shadow-lg transition-all duration-200 
                            active:bg-gray-200 active:shadow-inner">Registrar rostro</button>
                <button
                    onClick={backToForm}
                    className="bg-white border border-black/20 w-28 h-11 text-black rounded-xl shadow-lg transition-all duration-200 
                        active:bg-gray-200 active:shadow-inner">Volver</button>
            </div>
        </div>
    );
}

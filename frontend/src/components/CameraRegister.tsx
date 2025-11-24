import { useCamera } from "../hooks/useCamera";
import { useFaceDetection } from "../hooks/useFaceDetection";
import type { FormValues } from "../schemas/schemaForm";

interface props{
    data:FormValues
    backToForm:()=>void
}

export default function CameraRegister({data,backToForm}:props) {
    const videoRef = useCamera();
    const { canvasRef, estadoRostro, registrarRostro } = useFaceDetection(videoRef);

    const handleRegistrar = async () => {
        try {
            const resp = await registrarRostro({
                name: data.name,
                lastName: data.lastName,
                dni: data.dni,
                number: data.number,
                address:data.address,
                rol: data.rol
            });

            console.log("Respuesta registro:", resp);
        } catch (err) {
            console.error("Error al registrar rostro:", err);
        }
    };

    return (
        <div className="w-full bg-white text-white flex flex-col items-center justify-center p-6 gap-6">

            {/* Contenedor del video y el canvas superpuestos */}
            <div className="relative w-full max-w-3xl aspect-video rounded-xl overflow-hidden shadow-xl">
                <video ref={videoRef} autoPlay muted className="absolute inset-0 w-full h-full object-cover"></video>
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
            </div>

            {/* Estado del rostro */}
            <p className={`
                    text-lg font-semibold px-4 py-2 rounded-xl
                    ${estadoRostro === "reconocido" ? "bg-green-700" : ""}
                    ${estadoRostro === "desconocido" ? "bg-red-700" : ""}
                    ${estadoRostro === "procesando" ? "bg-yellow-600 text-black" : ""}
                    ${estadoRostro === "ninguno" ? "bg-gray-700" : ""}`}>
                Estado rostro: {estadoRostro}
            </p>

            {/* Botones */}
            <div className="flex flex-row-reverse gap-20">
                <button
                    onClick={handleRegistrar}
                    className="bg-gray-900/20 p-3 text-black/70 rounded-xl shadow-lg transition-all duration-200 cursor-pointer
                            hover:shadow-2xl hover:-translate-y-1 active:bg-gray-200 active:shadow-inner">Registrar rostro</button>

                <button
                    onClick={backToForm}
                    className="bg-white border border-black/20 w-28 h-11 text-black rounded-xl shadow-lg transition-all duration-200 cursor-pointer
                        hover:shadow-2xl hover:-translate-y-1 active:bg-gray-200 active:shadow-inner">Volver</button>

            </div>
        </div>
    );
}

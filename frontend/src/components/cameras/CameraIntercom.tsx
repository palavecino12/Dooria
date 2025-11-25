import { useCamera } from "../../hooks/useCamera";
import { useFaceDetection } from "../../hooks/useFaceDetection";

export const CameraIntercom=() => {
    const videoRef = useCamera();
    const component="intercom"
    const { canvasRef, estadoRostro} = useFaceDetection({videoRef,component});

    return (
        <div className="min-h-screen bg-white text-white flex flex-col items-center justify-center p-6 gap-6">

            {/* Contenedor del video y el canvas superpuestos */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl">
                <video ref={videoRef} autoPlay muted className="absolute inset-0 w-full h-full object-cover"></video>
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
            </div>

            {/* Estado del rostro */}
            <p
                className={`
                    text-lg font-semibold px-4 py-2 rounded-lg
                    ${estadoRostro === "reconocido" ? "bg-green-700" : ""}
                    ${estadoRostro === "desconocido" ? "bg-red-700" : ""}
                    ${estadoRostro === "procesando" ? "bg-yellow-600 text-black" : ""}
                    ${estadoRostro === "ninguno" ? "bg-gray-700" : ""}
                `}
            >Estado rostro: {estadoRostro}
            </p>
        </div>
    );
}

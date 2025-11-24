import { useCamera } from "../hooks/useCamera";
import { useFaceDetection } from "../hooks/useFaceDetection";

export default function Camera() {
    const videoRef = useCamera();
    const { canvasRef, estadoRostro, registrarRostro } = useFaceDetection(videoRef);

    const handleRegistrar = async () => {
        try {
            const resp = await registrarRostro({
                nombre: "Facu",
                email: "facu@test.com",
                edad: 25,
            });

            console.log("Respuesta registro:", resp);
        } catch (err) {
            console.error("Error al registrar rostro:", err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 gap-6">

            {/* Contenedor del video y el canvas superpuestos */}
            <div className="relative w-full max-w-lg aspect-video rounded-xl overflow-hidden shadow-xl">

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
        >
        Estado rostro: {estadoRostro}
        </p>

        {/* Botón */}
        <button
            onClick={handleRegistrar}
            className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl text-lg font-medium shadow-lg"
        >
        Registrar rostro
        </button>
        </div>
    );
}

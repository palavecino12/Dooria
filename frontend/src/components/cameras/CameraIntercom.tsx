import { useCamera } from "../../hooks/useCamera";
import { useFaceDetection } from "../../hooks/useFaceDetection";

export const CameraIntercom=() => {
    const videoRef = useCamera();
    const component="intercom"
    const { canvasRef, estadoRostro, estadoAcceso, user} = useFaceDetection({videoRef,component});

    //Filtramos las fechas a tipo YYYY-MM-DD para que sea mas legible para el usuario
    const userDates = user?.allowedDates?.map(date => date.slice(0, 10));
    //Convertimos de numero a dias de la semana
    const daysMap = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    const userDays = user?.allowedDays
        ? user.allowedDays.map(d => daysMap[d])
        : [];


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
            >Estado Rostro: {estadoRostro}
            </p>

            {/* Estado de acceso */}
            <p
                className={`
                    text-lg font-semibold px-4 py-2 rounded-lg
                    ${estadoAcceso === "permitido" ? "bg-green-700" : ""}
                    ${estadoAcceso === "denegado" ? "bg-red-700" : ""}
                `}
            >Estado Acceso: {estadoAcceso}
            </p>

            {/* Indicamos que dias tiene acceso */}
            {estadoRostro==="reconocido" && estadoAcceso==="denegado" && (
                <div className="border border-black/20 rounded-xl shadow-xl p-5">
                    <p className="text-black">Usuario: {user?.name} {user?.lastName}</p>

                    {user?.accessType === "semanal" ? (
                        <p className="text-black">Dias que tenes permitidos: {userDays?.join(", ")}</p>
                    ):(
                        <p className="text-black">Fechas que tenes permitidas: {userDates?.join(", ")}</p>
                    )}
                </div>                
            )}

        </div>
    );
}

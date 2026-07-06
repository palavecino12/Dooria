import { useCamera } from "../../hooks/useCamera";
import { useFaceDetection } from "../../hooks/useFaceDetection";

export const CameraIntercom = () => {
    const videoRef = useCamera();
    const { estadoRostro, estadoAcceso, user } = useFaceDetection({ videoRef });

    //Filtramos las fechas a tipo YYYY-MM-DD para que sea mas legible para el usuario
    const userDates = user?.allowedDates?.map(date => date.slice(0, 10))?? [];
    //Convertimos de numero a dias de la semana
    const daysMap = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    const userDays = user?.allowedDays
        ? user.allowedDays.map(d => daysMap[d])
        : [];


    return (
        <div className="min-h-screen bg-white text-white flex flex-col items-center justify-center p-6 gap-6">

            {/* Contenedor del video y el canvas superpuestos */}
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-xl">
                <video ref={videoRef} autoPlay muted className="absolute inset-0 w-full h-full object-cover"></video>
            </div>

            {/* Estado del rostro */}
            <p
                className={`
                    text-lg font-semibold px-4 py-2 rounded-lg
                    ${estadoRostro === "reconocido" ? "bg-green-800" : ""}
                    ${estadoRostro === "desconocido" ? "bg-red-800" : ""}
                    ${estadoRostro === "procesando" ? "bg-yellow-600 text-black" : ""}
                    ${estadoRostro === "ninguno" ? "bg-black" : ""}
                `}
            >Estado Rostro: {estadoRostro}
            </p>

            {/* Estado de acceso */}
            <p
                className={`
                    text-lg font-semibold px-4 py-2 rounded-lg
                    ${estadoAcceso === "permitido" ? "bg-green-800" : ""}
                    ${estadoAcceso === "denegado" ? "bg-red-800" : ""}
                `}
            >Estado Acceso: {estadoAcceso}
            </p>

            {/* Indicamos que dias tiene acceso */}
            {estadoRostro === "reconocido" && estadoAcceso === "denegado" && (
                <div className="border border-black/20 rounded-xl shadow-xl p-5">
                    <p className="text-black">Usuario: {user?.name} {user?.lastName}</p>

                    {(userDays?.length > 0 || userDates?.length > 0) && (
                        <div className="text-black">
                            {userDays?.length > 0 && (
                                <p>Días que tenés permitidos: {userDays.join(", ")}</p>
                            )}

                            {userDates?.length > 0 && (
                                <p>Fechas que tenés permitidas: {userDates.join(", ")}</p>
                            )}
                        </div>
                    )}
                </div>
            )}

        </div>
    );
}

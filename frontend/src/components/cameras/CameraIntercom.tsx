import { useCamera } from "../../hooks/useCamera";
import { useFaceDetection } from "../../hooks/useFaceDetection";

export const CameraIntercom = () => {
    const videoRef = useCamera();
    const { estadoRostro, estadoAcceso, user } = useFaceDetection({ videoRef });

    //Filtramos las fechas a tipo YYYY-MM-DD para que sea mas legible para el usuario
    const userDates = user?.allowedDates?.map(date => date.slice(0, 10)) ?? [];
    //Convertimos de numero a dias de la semana
    const daysMap = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    const userDays = user?.allowedDays
        ? user.allowedDays.map(d => daysMap[d])
        : [];

    //Usamos esta variable para identificar mas facil cuando un ususario esta registrado pero no tiene acceso
    const screenState =
        estadoRostro === "ninguno"
            ? "idle"
            : estadoRostro === "procesando"
                ? "loading"
                : estadoRostro === "desconocido"
                    ? "unknown"
                    : estadoAcceso === "permitido"
                        ? "granted"
                        : "denied";

    //Estilos del video y de la tarjeta con los mensajes que vamos a mostrar
    const screenUI = {
        idle: {
            videoBorder: "border-gray-300",
            glow: "",
            bg: "bg-gray-900",
            text: "text-white",
            title: "Esperando usuario",
            message: "Coloque su rostro frente a la cámara.",
        },

        loading: {
            videoBorder: "border-yellow-400",
            glow: "shadow-[0_0_25px_rgba(250,204,21,.7)]",
            bg: "bg-yellow-400",
            text: "text-black",
            title: "Verificando identidad",
            message: "Espere un momento...",
        },

        granted: {
            videoBorder: "border-green-500",
            glow: "shadow-[0_0_25px_rgba(34,197,94,.8)]",
            bg: "bg-green-600",
            text: "text-white",
            title: "Acceso permitido",
            message: `Bienvenido ${user?.name ?? ""}`,
        },

        denied: {
            videoBorder: "border-red-500",
            glow: "shadow-[0_0_25px_rgba(239,68,68,.8)]",
            bg: "bg-red-600",
            text: "text-white",
            title: "Acceso denegado",
            message: `${user?.name} ${user?.lastName}`,
        },

        unknown: {
            videoBorder: "border-red-500",
            glow: "shadow-[0_0_25px_rgba(239,68,68,.8)]",
            bg: "bg-red-600",
            text: "text-white",
            title: "Usuario no registrado",
            message: "Solicite asistencia.",
        },
    };
    const currentScreen = screenUI[screenState];

    return (
        <div className="min-h-screen bg-white text-white flex flex-col items-center justify-center gap-6">

            {/* Contenedor del video */}
            <div className={`relative w-full aspect-video overflow-hidden rounded-2xl border-[5px] transition-all 
                duration-300 ${currentScreen.videoBorder} ${currentScreen.glow}`}>
                <video ref={videoRef} autoPlay muted className="absolute inset-0 w-full h-full object-cover"></video>
            </div>

            {/* Tarjeta de mensaje del estado del ususario */}
            <div
                className={`w-full rounded-2xl px-6 py-5 transition-all duration-300 shadow-xl ${currentScreen.bg} ${currentScreen.text}`}>
                {/* Titulo de la tarjeta */}
                <h2 className="text-3xl font-bold">
                    {currentScreen.title}
                </h2>
                {/* Subtitulo de la tarjeta */}
                <p className="mt-2 text-lg">
                    {currentScreen.message}
                </p>
            </div>

            {/* En caso de estar registrado pero no tener acceso, mostramos mensaje adicional */}
            {screenState === "denied" && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-5 text-gray-800">

                    <h3 className="text-lg font-semibold">
                        Motivo del rechazo
                    </h3>
                    <p className="mt-2">
                        Hoy no posee autorización para ingresar.
                    </p>

                    {/* Mostramos los dias permitidos si es que tiene */}
                    {userDays.length > 0 && (
                        <div className="mt-4">
                            <p className="font-medium">
                                Días habilitados
                            </p>
                            <p className="text-gray-600">
                                {userDays.join(", ")}
                            </p>
                        </div>
                    )}

                    {/* Mostramos las fechas permitidos si es que tiene */}
                    {userDates.length > 0 && (
                        <div className="mt-4">
                            <p className="font-medium">
                                Fechas habilitadas
                            </p>
                            <p className="text-gray-600">
                                {userDates.join(", ")}
                            </p>
                        </div>
                    )}

                </div>
            )}

        </div>
    );
}

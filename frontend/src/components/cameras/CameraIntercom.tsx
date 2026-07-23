import { useNavigate } from "react-router-dom";
import { useCamera } from "../../hooks/useCamera";
import { useFaceDetection } from "../../hooks/useFaceDetection";
import { Button } from "../common/Button";
import { Header } from "../common/Header";
import { useWebRTC } from "../../hooks/useWebRTC";
import { useEffect } from "react";

interface CameraIntercomProps {
    isMobile?: boolean
}

export const CameraIntercom = ({ isMobile = false }: CameraIntercomProps) => {

    const navigate = useNavigate()

    //La camara solo se va a usar en el intercom.
    const { videoRef, streamRef } = useCamera(!isMobile);
    //La deteccion de rostro solo se va a usar en el intercom.
    const faceDetection = useFaceDetection({ videoRef, enabled: !isMobile });
    //Comunicacion con sel servidor de socket.io
    const { remoteState } = useWebRTC({ isMobile, streamRef, videoRef, faceDetection })

    useEffect(() => {
        console.log(remoteState);
    }, [remoteState]);

    //Si es mobile usamos los datos que recibimos del interom
    //Y si es intercom usamos los datos directos de faceDetection.
    const currentState = isMobile
        ? remoteState
        : faceDetection;

    //Filtramos las fechas a tipo YYYY-MM-DD para que sea mas legible para el usuario
    const userDates = currentState.user?.allowedDates?.map(date => date.slice(0, 10)) ?? [];
    //Convertimos de numero a dias de la semana
    const daysMap = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    const userDays = currentState.user?.allowedDays
        ? currentState.user.allowedDays.map(d => daysMap[d])
        : [];

    //Usamos esta variable para identificar mas facil cuando un ususario esta registrado pero no tiene acceso
    const screenState =
        currentState.estadoRostro === "ninguno"
            ? "idle"
            : currentState.estadoRostro === "procesando"
                ? "loading"
                : currentState.estadoRostro === "desconocido"
                    ? "unknown"
                    : currentState.estadoAcceso === "permitido"
                        ? "granted"
                        : "denied";

    //Estilos del video y de la tarjeta con los mensajes que vamos a mostrar
    const screenUI = {
        idle: {
            videoBorder: "border-gray-300",
            glow: "",
            bg: "bg-gray-900",
            text: "text-white text-center",
            title: "Esperando usuario",
            message: "Coloque su rostro frente a la cámara",
        },
        loading: {
            videoBorder: "border-yellow-400",
            glow: "shadow-[0_0_25px_rgba(250,204,21,.7)]",
            bg: "bg-yellow-400",
            text: "text-black text-center",
            title: "Verificando identidad",
            message: "Espere un momento...",
        },
        granted: {
            videoBorder: "border-green-500",
            glow: "shadow-[0_0_25px_rgba(34,197,94,.8)]",
            bg: "bg-green-600",
            text: "text-white text-center",
            title: "Acceso permitido",
            message: `Bienvenido ${currentState.user?.name ?? ""}`,
        },
        denied: {
            videoBorder: "border-red-500",
            glow: "shadow-[0_0_25px_rgba(239,68,68,.8)]",
            bg: "bg-red-600",
            text: "text-white text-center",
            title: "Acceso denegado",
            message: `${currentState.user?.name} ${currentState.user?.lastName}`,
        },
        unknown: {
            videoBorder: "border-red-500",
            glow: "shadow-[0_0_25px_rgba(239,68,68,.8)]",
            bg: "bg-red-600",
            text: "text-white text-center",
            title: "Usuario no registrado",
            message: "Solicite asistencia",
        },
    };
    const currentScreen = screenUI[screenState];

    //Estilos de la pantalla del intercom dependiendo si lo vemos desde el intercom o desde el telefonoo
    const layout = isMobile
        ? {
            statusCard: "py-3 px-10",
            statusTitle: "text-lg font-bold",
            statusMessage: "text-base font-medium text-white/90",

            deniedCard: "p-2",
            deniedTitle: "text-base font-semibold",
            deniedSection: "mt-1",
        }
        : {
            statusCard: "w-full py-5",
            statusTitle: "text-3xl font-bold",
            statusMessage: "mt-2 text-lg font-medium",

            deniedCard: "p-5",
            deniedTitle: "text-lg font-semibold",
            deniedSection: "mt-3",
        };

    return (
        <div className="w-full h-dvh bg-gray-200 text-white flex flex-col">

            {isMobile && <Header title="Portero" />}

            <main className="flex-1 flex flex-col items-center justify-center gap-6">
                {/* Contenedor del video */}
                <div className={`relative w-full aspect-video overflow-hidden rounded-2xl border-[5px] transition-all 
                duration-300 ${currentScreen.videoBorder} ${currentScreen.glow}`}>
                    <video ref={videoRef} autoPlay muted className="absolute inset-0 w-full h-full object-cover -scale-x-100"></video>
                </div>

                {/* Tarjeta de mensaje del estado del ususario */}
                <div
                    className={`${layout.statusCard} rounded-4xl transition-all duration-300 shadow-xl ${currentScreen.bg} ${currentScreen.text}`}>
                    {/* Titulo de la tarjeta */}
                    <h2 className={`${layout.statusTitle}`}>
                        {currentScreen.title}
                    </h2>
                    {/* Subtitulo de la tarjeta (lo mostramos solo en caso de usarlo desde Intercom o de un usuario registrado pero sin acceso ese dia) */}
                    {(!isMobile || screenState === "denied") && (
                        <p className={`${layout.statusMessage} font-medium`}>
                            {currentScreen.message}
                        </p>
                    )}

                </div>

                {/* En caso de estar registrado pero no tener acceso, mostramos mensaje adicional */}
                {screenState === "denied" && (
                    <div className={`rounded-xl border border-red-200 bg-red-50 text-gray-800 ${layout.deniedCard}`}>

                        <h3 className={layout.deniedTitle}>
                            Motivo del rechazo:
                        </h3>
                        <p>Hoy no posee autorización para ingresar.</p>

                        {/* Mostramos los dias permitidos si es que tiene */}
                        {userDays.length > 0 && (
                            <div className={`${layout.deniedSection}`}>
                                <p className="font-semibold">
                                    Días habilitados:
                                </p>
                                <p>
                                    {userDays.join(", ")}
                                </p>
                            </div>
                        )}

                        {/* Mostramos las fechas permitidos si es que tiene */}
                        {userDates.length > 0 && (
                            <div className={`${layout.deniedSection}`}>
                                <p className="font-semibold">
                                    Fechas habilitadas:
                                </p>
                                <p>
                                    {userDates.join(", ")}
                                </p>
                            </div>
                        )}

                    </div>
                )}

                {isMobile && (
                    <div className={`flex justify-center w-full gap-10 ${screenState !== "denied" ? "mt-30" : "mt-1"}`}>
                        <Button variant="secundario" onClick={() => navigate("/mobile")}>Volver</Button>
                        <Button>Permitir acceso</Button>
                    </div>
                )}
            </main>
        </div>
    );
}

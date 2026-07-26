import { useEffect, useRef, useState } from "react";

export const useCamera = (enabled = true) => {

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [streamReady, setStreamReady] = useState(false);

  useEffect(() => {

    //En caso de que lo use el mobile retornamos null ya que el no lo tiene que recibir el video.
    if (!enabled) return;

    const startVideo = async () => {

      try {
        //Almacenamos el MediaStream del video.
        streamRef.current = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (videoRef.current) {
          //Colocamos el video en en el componente.
          videoRef.current.srcObject = streamRef.current;
        }

        setStreamReady(true);

      } catch (err) {
        console.error("No se pudo acceder a la cámara:", err);
      }

    };

    startVideo();

    return () => {
      streamRef.current?.getTracks().forEach(track => track.stop());
      setStreamReady(false);
    };

  }, [enabled]);

  return { videoRef, streamRef, streamReady };
};
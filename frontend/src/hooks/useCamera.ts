import { useEffect, useRef } from "react";

export const useCamera = (enabled = true) => {

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {

    //En caso de que lo use el mobile retornamos null ya que el no lo tiene que recibir.
    if (!enabled) return;

    const startVideo = async () => {

      try {

        streamRef.current = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = streamRef.current;
        }

      } catch (err) {
        console.error("No se pudo acceder a la cámara:", err);
      }

    };

    startVideo();

    return () => {
      streamRef.current?.getTracks().forEach(track => track.stop());
    };

  }, [enabled]);

  return { videoRef, streamRef, };

};
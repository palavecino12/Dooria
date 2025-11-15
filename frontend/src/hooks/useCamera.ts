// hook que se encarga unicamente de iniciar la camara y mostrar el video en pantalla.
import { useEffect, useRef } from "react"

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    const startVideo = async () => {
      try {
        streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true })
        if (videoRef.current) videoRef.current.srcObject = streamRef.current
      } catch (err) {
        console.error("No se pudo acceder a la cámara:", err)
      }
    }
    startVideo()

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop())
      }
    }
  }, [])

  return videoRef
}

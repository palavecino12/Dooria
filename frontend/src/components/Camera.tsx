// este componente une todo, muestra la cámara y dibuja en tiempo real las caras detectadas.
import { useCamera } from "../hooks/useCamera"
import { useFaceDetection } from "../hooks/useFaceDetection"

export default function Camera() {
  const videoRef = useCamera()
  const canvasRef = useFaceDetection(videoRef)

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
      <div style={{ position: "relative" }}>
        <video ref={videoRef} autoPlay muted playsInline style={{ borderRadius: 10 }} />
        <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0 }} />
      </div>
    </div>
  )
}

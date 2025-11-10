// este hook se encarga de analizar el video en tiempo real y dibujar las detecciones de rostros en un canvas superpuesto.
import { useEffect, useRef } from "react"
import * as faceapi from "face-api.js"

export function useFaceDetection(videoRef: React.RefObject<HTMLVideoElement|null>) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
  let intervalId: number | null = null

  const video = videoRef.current // ✅ guardamos el valor actual
  const canvas = canvasRef.current

  const loadModels = async () => {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models/tiny_face_detector"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models/face_landmark_68"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models/face_recognition"),
    ])
    console.log("✅ Modelos cargados correctamente")
  }

  const handlePlay = () => {
    if (!video || !canvas) return

    canvas.width = video.videoWidth || 640
    canvas.height = video.videoHeight || 480

    const displaySize = { width: canvas.width, height: canvas.height }
    faceapi.matchDimensions(canvas, displaySize)

    intervalId = window.setInterval(async () => {
      if (video.paused || video.ended) return

      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions({ inputSize: 160, scoreThreshold: 0.5 }))
        .withFaceLandmarks()
        .withFaceDescriptors()

      const resizedDetections = faceapi.resizeResults(detections, displaySize)

      const ctx = canvas.getContext("2d")
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      faceapi.draw.drawDetections(canvas, resizedDetections)
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    }, 150)
  }

  loadModels().then(() => {
    if (video) video.addEventListener("play", handlePlay)
  })

  return () => {
    if (intervalId) window.clearInterval(intervalId)
    if (video) video.removeEventListener("play", handlePlay) // ✅ usamos la variable local
  }
}, [videoRef])


  return canvasRef
}

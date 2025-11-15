import { useEffect, useRef, useState, type RefObject } from "react";
import * as faceapi from "face-api.js";

type EstadoRostro = "ninguno" | "procesando" | "reconocido" | "desconocido";

export function useFaceDetection(videoRef: RefObject<HTMLVideoElement | null>) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [estadoRostro, setEstadoRostro] = useState<EstadoRostro>("ninguno");

  // refs
  const estadoRostroRef = useRef<EstadoRostro>("ninguno");
  const intentosRef = useRef<number>(0);
  const processingRef = useRef<boolean>(false);
  const detenerBackendRef = useRef<boolean>(false);
  const latestDescriptorRef = useRef<number[] | null>(null);

  const MAX_INTENTOS = 3;
  const BACKEND_URL = "http://localhost:3000";

  useEffect(() => {
    estadoRostroRef.current = estadoRostro;
  }, [estadoRostro]);

  useEffect(() => {
    let intervalId: number | null = null;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models/tiny_face_detector"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models/face_landmark_68"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models/face_recognition"),
      ]);
      console.log("Modelos cargados");
    };

    const reconocerRostro = async (descriptor: number[]) => {
      try {
        const resp = await fetch(`${BACKEND_URL}/usuarios/buscar-rostro`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ descriptor }),
        });
        return resp.json();
      } catch (err) {
        console.error("Error fetch buscar-rostro:", err);
        return { match: false };
      }
    };

    const handlePlay = () => {
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      const displaySize = { width: canvas.width, height: canvas.height };
      faceapi.matchDimensions(canvas, displaySize);

      intervalId = window.setInterval(async () => {
        if (video.paused || video.ended) return;

        if (processingRef.current) return;
        processingRef.current = true;

        if (estadoRostroRef.current === "ninguno") {
          setEstadoRostro("procesando");
        }

        try {
          const detections = await faceapi
            .detectAllFaces(
              video,
              new faceapi.TinyFaceDetectorOptions({
                inputSize: 160,
                scoreThreshold: 0.5,
              })
            )
            .withFaceLandmarks()
            .withFaceDescriptors();

          const resized = faceapi.resizeResults(detections, displaySize);
          const ctx = canvas.getContext("2d");
          if (!ctx) return;

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // SI NO HAY CARA → RESET TOTAL
          if (!detections || detections.length === 0) {
            intentosRef.current = 0;
            latestDescriptorRef.current = null;

            setEstadoRostro("ninguno");
            estadoRostroRef.current = "ninguno";

            detenerBackendRef.current = false;

            processingRef.current = false;
            return;
          }

          // descriptor
          const descriptor = detections[0].descriptor;
          const descriptorArray = Array.from(descriptor) as number[];
          latestDescriptorRef.current = descriptorArray;

          // ➤ SOLO CONSULTAMOS AL BACKEND SI NO ESTÁ PAUSADO
          if (!detenerBackendRef.current) {
            const resultado = await reconocerRostro(descriptorArray);
            console.log("resultado backend:", resultado);

            if (resultado.match) {
              setEstadoRostro("reconocido");
              estadoRostroRef.current = "reconocido";

              detenerBackendRef.current = true;
              intentosRef.current = 0;

              // se vuelve a habilitar el backend a los 1500ms
              setTimeout(() => {
                detenerBackendRef.current = false;
              }, 1500);
            } else {
              intentosRef.current++;

              if (intentosRef.current >= MAX_INTENTOS) {
                setEstadoRostro("desconocido");
                estadoRostroRef.current = "desconocido";

                detenerBackendRef.current = true;

                setTimeout(() => {
                  detenerBackendRef.current = false;
                }, 1500);
              }
            }
          }

          // DIBUJAR bounding box SIEMPRE
          const box = resized[0].detection.box;
          ctx.lineWidth = 3;
          ctx.strokeStyle = estadoColor(estadoRostroRef.current);
          ctx.strokeRect(box.x, box.y, box.width, box.height);

          faceapi.draw.drawFaceLandmarks(canvas, resized);

        } catch (err) {
          console.error("Error en loop detección:", err);
        } finally {
          processingRef.current = false;
        }
      }, 150);
    };

    loadModels()
      .then(() => {
        video.addEventListener("play", handlePlay);
        if (!video.paused && !video.ended) handlePlay();
      })
      .catch((err) => console.error("Error cargando modelos:", err));

    return () => {
      if (intervalId) window.clearInterval(intervalId);
      video.removeEventListener("play", handlePlay);
    };
  }, [videoRef]);

  function estadoColor(estado: EstadoRostro) {
    if (estado === "reconocido") return "green";
    if (estado === "desconocido") return "red";
    if (estado === "procesando") return "yellow";
    return "rgba(255,255,255,0.2)";
  }

  async function registrarRostro(payload?: { nombre?: string; email?: string; edad?: number }) {
    const descriptor = latestDescriptorRef.current;
    if (!descriptor) throw new Error("No hay descriptor disponible para registrar");

    const body = { ...payload, descriptor };
    const resp = await fetch(`${BACKEND_URL}/usuarios/registrar-rostro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return resp.json();
  }

  return { canvasRef, estadoRostro, registrarRostro };
}

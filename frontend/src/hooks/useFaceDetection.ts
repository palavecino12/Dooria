//GOD HOOK (Fucnional pero falta modularizar y mejorar)
import { useEffect, useRef, useState, type RefObject } from "react";
import * as faceapi from "face-api.js";
import { type FormValues } from "../schemas/schemaForm";

type EstadoRostro = "ninguno" | "procesando" | "reconocido" | "desconocido";
type EstadoAcceso = "permitido" | "denegado";

interface props {
  videoRef: RefObject<HTMLVideoElement | null>,
}

interface FaceMatchResult {
  match: boolean,
  access: boolean,
  user?: FormValues
}

export function useFaceDetection({ videoRef }: props) {

  const [estadoRostro, setEstadoRostro] = useState<EstadoRostro>("ninguno");
  const [estadoAcceso, setEstadoAcceso] = useState<EstadoAcceso>("denegado");
  const [user, setUser] = useState<FormValues | null>(null);

  //refs
  const estadoRostroRef = useRef<EstadoRostro>("ninguno");
  const intentosRef = useRef<number>(0); //Cantidad de veces que no coincidio
  const processingRef = useRef<boolean>(false); //Si un loop esta procesando un frame, no permite que otro loop empiece
  const detenerBackendRef = useRef<boolean>(false); //Bloqueo temporal de request al backend (es true si reconocemos a alguien o los intentos superan el limite)
  const latestDescriptorRef = useRef<number[] | null>(null); //Ultimo descriptor detectado
  const intervalRef = useRef<number | null>(null); //Ref para almacenar el id del intervalo

  const MAX_INTENTOS = 3;
  const BACKEND_URL = "http://localhost:3000";

  useEffect(() => {
    estadoRostroRef.current = estadoRostro;
  }, [estadoRostro]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    //Carga de modelos
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models/tiny_face_detector"), //Detecta la cara
        faceapi.nets.faceLandmark68Net.loadFromUri("/models/face_landmark_68"), //Encuentra ojos, cejas, nariz, boca
        faceapi.nets.faceRecognitionNet.loadFromUri("/models/face_recognition"), //Genera el descriptor
      ]);
      console.log("Modelos cargados");
    };

    //Funcion donde le mandamos un descriptor y lo busca en la base de datos
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

    //Funcion donde comienza la reproduccion del video
    const handlePlay = () => {

      //Cerebro del hook
      if (intervalRef.current != null) return; //Si ya existe un intervalo, no creamos otro
      intervalRef.current = window.setInterval(async () => {
        if (video.paused || video.ended) return;

        if (processingRef.current) return; //Si hay una deteccion en curso no interferimos
        processingRef.current = true; //Si no hay una deteccion en curso, colocamos true para indicar que comenzamos una

        try {
          //Detectamos la cara usando los modelos
          //Detections se convierte en un array con info del rostro
          const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions({ inputSize: 160, scoreThreshold: 0.5, }))
            .withFaceLandmarks()
            .withFaceDescriptors();

          //Si no se detecto ninguna cara, resetea todos los datos
          if (!detections || detections.length === 0) {
            intentosRef.current = 0;
            latestDescriptorRef.current = null;
            setEstadoRostro("ninguno");
            detenerBackendRef.current = false;
            processingRef.current = false;
            setEstadoAcceso("denegado");
            setUser(null);
            return;
          }
          
          //Si detectamos un rostro, pasamos al estado de procesando
          if (estadoRostroRef.current === "ninguno") {
            setEstadoRostro("procesando");
          }

          //En caso de que si detecte un rostro, almacena el descriptor actual en el ref
          const descriptor = detections[0].descriptor;
          const descriptorArray = Array.from(descriptor) as number[];
          latestDescriptorRef.current = descriptorArray;

          //Si el backend no esta pausado, consultamos si existe el rostro en la base de datos
          if (!detenerBackendRef.current) {
            const resultado: FaceMatchResult = await reconocerRostro(descriptorArray);
            console.log("resultado backend:", resultado);

            //Si hubo march frenamos todo, colocamos como reconocido el rostro y guardamos el usuario
            if (resultado.match) {

              //Almacenamos el ususario que se encontro
              if (resultado.user) setUser(resultado.user)
              setEstadoRostro("reconocido");

              if (resultado.access) {
                setEstadoAcceso("permitido")
              } else {
                setEstadoAcceso("denegado")
              }

              //Frenamos el back
              detenerBackendRef.current = true;
              intentosRef.current = 0;

              //Se vuelve a habilitar el backend a los 1500ms
              setTimeout(() => {
                detenerBackendRef.current = false;
              }, 1500);
            } else {
              //Si no hubo match incrementamos los intentos
              intentosRef.current++;
              //Si los intentos llegan a 3, marcamos el rostro como desconocido y frenamos backend por 1.5s
              if (intentosRef.current >= MAX_INTENTOS) {

                setEstadoAcceso("denegado")
                setEstadoRostro("desconocido");
                detenerBackendRef.current = true;

                setTimeout(() => {
                  detenerBackendRef.current = false;
                }, 1500);
              }
            }
          }

        } catch (err) {
          console.error("Error en loop detección:", err);
        } finally {
          //Final del loop, permitimos que la proxima deteccion corra
          processingRef.current = false;
        }
      }, 150);
    };

    loadModels() //Cargamos los modelos antes de empezar la deteccion sobre el video
      .then(() => {
        video.addEventListener("play", handlePlay);
        if (!video.paused && !video.ended) handlePlay(); //Llamammos a la funcion en caso de que el video ya este corriendo y los modelos hayan cargado tarde
      })
      .catch((err) => console.error("Error cargando modelos:", err));

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);

      video.removeEventListener("play", handlePlay);

    };
  }, [videoRef]); //Colocamos VideoRef como dependencia ya que a veces el componente se monta antes que el DOM, por lo tanto VideoRef no tiene ninguna referencia

  return { estadoRostro, estadoAcceso, user, latestDescriptorRef };
}

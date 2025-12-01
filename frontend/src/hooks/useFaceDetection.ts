//GOD HOOK (Fucnional pero falta modularizar y mejorar)
import { useEffect, useRef, useState, type RefObject } from "react";
import * as faceapi from "face-api.js";
import {type FormValues } from "../schemas/schemaForm";

type EstadoRostro = "ninguno" | "procesando" | "reconocido" | "desconocido";
type EstadoAcceso = "permitido" | "denegado"; 

interface props{
  videoRef: RefObject<HTMLVideoElement | null>,
  component:"register"|"intercom"//Pasamos por parametro que componente estamos usando para colocar diferentes colores 
}

interface FaceMatchResult{
    match:boolean,
    access:boolean,
    user?:FormValues
}

export function useFaceDetection({videoRef,component}:props) {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [estadoRostro, setEstadoRostro] = useState<EstadoRostro>("ninguno");
  const [estadoAcceso, setEstadoAcceso] = useState<EstadoAcceso>("denegado");
  const [user, setUser] = useState<FormValues|null>(null);
  

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
    const canvas = canvasRef.current;

    if (!video || !canvas) return;
    
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
      //Ajustamos el canvas al mismo tamaño que el video
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      const displaySize = { width: canvas.width, height: canvas.height };
      faceapi.matchDimensions(canvas, displaySize);//Adaptamos las detecciones al tamaño real del canvas

      //Cerebro del hook
      if (intervalRef.current != null) return; //Si ya existe un intervalo, no creamos otro
      intervalRef.current = window.setInterval(async () => {
        if (video.paused || video.ended) return;

        if (processingRef.current) return; //Si hay una deteccion en curso no interferimos
        processingRef.current = true; //Si no hay una deteccion en curso, colocamos true para indicar que comenzamos una

        if (estadoRostroRef.current === "ninguno") {
          setEstadoRostro("procesando");
        }

        try {
          //Detectamos la cara usando los modelos
          //Detections se convierte en un array con info del rostro
          const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions({inputSize: 160, scoreThreshold: 0.5,}))
            .withFaceLandmarks()
            .withFaceDescriptors();

          const resized = faceapi.resizeResults(detections, displaySize);//Escalamos la deteccion de la cara al tamaño del canvas para dibujarlas bien
          const ctx = canvas.getContext("2d"); //Contexto 2d del canvas para poder dibujar
          if (!ctx) return;

          ctx.clearRect(0, 0, canvas.width, canvas.height);//Limpiamos el canvas en cada frame (sino cada cuadro se pintaria encima del anterior)

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

          //En caso de que si detecte un rostro, almacena el descriptor actual en el ref
          const descriptor = detections[0].descriptor;
          const descriptorArray = Array.from(descriptor) as number[];
          latestDescriptorRef.current = descriptorArray;

          //Si el backend no esta pausado, consultamos si existe el rostro en la base de datos
          if (!detenerBackendRef.current) {
            const resultado:FaceMatchResult = await reconocerRostro(descriptorArray);
            console.log("resultado backend:", resultado);

            //Si hubo march frenamos todo, colocamos como reconocido el rostro y guardamos el usuario
            if (resultado.match) {

              //Almacenamos el ususario que se encontro
              if(resultado.user)setUser(resultado.user)
              setEstadoRostro("reconocido");

              if(resultado.access){
                setEstadoAcceso("permitido")
              }else{
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

          //Dibujamos el bounding box siempre
          const box = resized[0].detection.box;
          ctx.lineWidth = 3;//Grosor de la linea
          ctx.strokeStyle = estadoColor(estadoRostroRef.current, component);//Colocamos el color de la caja dependiendo del estado del rostro
          ctx.strokeRect(box.x, box.y, box.width, box.height);//Dibujamos el rectangulo en la cara

          faceapi.draw.drawFaceLandmarks(canvas, resized);//Dibujamos los parametros de la cara (lo hace automatico)

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
  }, [videoRef,component]); //Colocamos VideoRef como dependencia ya que a veces el componente se monta antes que el DOM, por lo tanto VideoRef no tiene ninguna referencia

  //Funcion para colocar color a la caja dependiendo del estado del rostro (dependiendo si se usa en register o intercom)
  function estadoColor(estado: EstadoRostro, component: "intercom" | "register") {
  if (component === "intercom") {
    if (estado === "reconocido") return "green";
    if (estado === "desconocido") return "red";
    if (estado === "procesando") return "yellow";
    return "rgba(255,255,255,0.2)";
  } else {
    if (estado === "reconocido") return "red";      
    if (estado === "desconocido") return "green"; 
    if (estado === "procesando") return "yellow";  
    return "rgba(255,255,255,0.1)";                 
  }
}


  //Funcion para almacenar un rostro
  async function registrarRostro({name,lastName,dni,number,address,rol,accessType,allowedDays,allowedDates}:FormValues) {
    const descriptor = latestDescriptorRef.current;
    if (!descriptor) throw new Error("No hay descriptor disponible para registrar");

    const body = {
      name,
      lastName,
      dni,
      number,
      address,
      rol,
      accessType,
      allowedDays,
      allowedDates,
      descriptor
    };

    const resp = await fetch(`${BACKEND_URL}/usuarios/registrar-rostro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return resp.json();
  }

  return { canvasRef, estadoRostro, estadoAcceso, user, registrarRostro };
}

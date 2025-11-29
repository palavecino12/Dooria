//Componente especifico para crear un usuario usando el formulario reutilizable
import { useState } from "react"
import { FormUser } from "./FormUser"
import { CameraRegister } from "../cameras/CameraRegister"
import { type FormValues } from "../../schemas/schemaForm"
import { useNavigate } from "react-router-dom"
import { FormUserAccess } from "./FormUserAccess"

export const FormUserCreate=()=>{

    const navigate=useNavigate()
    const [dataUser,setDataUser]=useState<FormValues|null>(null)
    const [showCameraRegister, setShowCameraRegister]=useState(false)

    //Funcion para tomar los valores del usuario y mandarlos al componente de camara, tambien pasamos a el
    const handleSubmitUser =(data: FormValues):void => {
        setDataUser(data)
        setShowCameraRegister(true)
    };

    //Funcion para abrir el componente de camara o volver al componente de formulario
    const toggleCameraRegister=()=>{
        setShowCameraRegister(!showCameraRegister)
    }

    //Si el usuario es local, lo redirigimos a la camara ya que tendria acceso siempre
    if (showCameraRegister && dataUser?.rol==="local") return <CameraRegister data={dataUser} backToForm={toggleCameraRegister} />
    //Si el usuario es visitante lo redirigimos al formulario de acceso
    if (showCameraRegister && dataUser?.rol==="visitante") return <FormUserAccess data={dataUser} backToForm={toggleCameraRegister}/> 
    //Lo primero que renderizamos es el formulario de registro
    return <FormUser initialValues={dataUser ?? {}} onSubmit={handleSubmitUser} buttonText="Siguiente" title="Añadir Usuario" closeForm={()=>navigate("/mobile")}/>
}


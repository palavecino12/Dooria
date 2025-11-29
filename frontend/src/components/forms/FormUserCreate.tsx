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

    //Funcion para tomar los valores del usuario y mandarlos al siguiente componente
    const handleSubmitUser =(data: FormValues):void => {
        setDataUser(data)
        setShowCameraRegister(true)
    };
    
    //Si el usuario es local, lo redirigimos a CameraRegister ya que tendria acceso siempre
    if (showCameraRegister && dataUser?.rol==="local") return <CameraRegister data={dataUser} backToForm={()=>setShowCameraRegister(false)} />
    //Si el usuario es visitante lo redirigimos FormUserAccess
    if (showCameraRegister && dataUser?.rol==="visitante") return <FormUserAccess data={dataUser} backToForm={()=>setShowCameraRegister(false)}/> 
    //Lo primero que renderizamos es el formulario de registro
    return <FormUser initialValues={dataUser ?? {}} onSubmit={handleSubmitUser} buttonText="Siguiente" title="Añadir Usuario" closeForm={()=>navigate("/mobile")}/>
}


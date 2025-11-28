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

    return(
        <>
        {showCameraRegister && dataUser?.rol==="local"//Si el usuario es local, lo redirigimos a la camara ya que tendria acceso siempre
            ? <CameraRegister data={dataUser} backToForm={toggleCameraRegister} />
                : showCameraRegister && dataUser?.rol==="visitante"//Si el usuario es visitante lo redirigimos al formulario de acceso
                ? <FormUserAccess backToForm={toggleCameraRegister}/> 
                    :<FormUser initialValues={dataUser ?? {}} onSubmit={handleSubmitUser} buttonText="Siguiente" title="Añadir Usuario" closeForm={()=>navigate("/mobile")}/>
        }
        </>
    )
}


//Componente especifico para crear un usuario usando el formulario reutilizable
import { useState } from "react"
import { FormUser } from "../components/FormUser/FormUser"
import { CameraRegister } from "./CameraRegister"
import { type FormValues } from "../schemas/schemaForm"
import { useNavigate } from "react-router-dom"

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
        {showCameraRegister && dataUser
            ? <CameraRegister data={dataUser} backToForm={toggleCameraRegister} />
            : <FormUser initialValues={dataUser ?? {}} onSubmit={handleSubmitUser} buttonText="Siguiente" title="Añadir Usuario" closeForm={()=>navigate("/mobile")}/>
        }
        </>
    )
}


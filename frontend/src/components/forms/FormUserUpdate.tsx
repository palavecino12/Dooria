//En este archivo tengo que hacer todo el proceso de:
//1ro abrir el formulario con los campos completos para editarlos
//2do pasar al componente index de FormUserAcces para poder modificar el acceso del visitante
import { useNavigate } from "react-router-dom";
import { FormUser } from "./FormUser"
import { useState } from "react";
import { FormUserAccess } from "./FormUserAccess";
import type { UserWithoutDescriptor } from "../../types/userType";

interface Props {
    user: UserWithoutDescriptor
}

//Componente especifico para editar un usaurio utilizando el formulario reutilizable
export const FormUserUpdate = ({user}:Props) => {

    const navigate = useNavigate()
    const [showAccessForm, setShowAccessForm] = useState(false)

    const handleSubmitUser = () =>{
        setShowAccessForm(true)
    }

    if (showAccessForm) return <FormUserAccess backToForm={()=>setShowAccessForm(false)} data={user} initialValue={user}/>
    return <FormUser buttonText="Siguiente" closeForm={()=>navigate("/mobile/users")} onSubmit={handleSubmitUser} title="Editar Ususario" initialValues={user}/>
}

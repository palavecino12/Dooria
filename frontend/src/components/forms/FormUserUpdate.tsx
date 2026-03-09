//En este archivo tengo que hacer todo el proceso de:
//1ro abrir el formulario con los campos completos para editarlos
//2do pasar al componente index de FormUserAcces para poder modificar el acceso del visitante
import { useNavigate } from "react-router-dom";
import type { FormValues } from "../../schemas/schemaForm";
import { FormUser } from "./FormUser"

interface Props {
    onSubmit:()=>void
    initialValues: FormValues
}

//Componente especifico para editar un usaurio utilizando el formulario reutilizable
export const FormUserUpdate = ({onSubmit,initialValues}:Props) => {

    const navigate = useNavigate()
    return <FormUser buttonText="Siguiente" closeForm={()=>navigate("/mobile/users")} onSubmit={onSubmit} title="Editar Ususario" initialValues={initialValues}/>
}

//En este archivo tengo que hacer todo el proceso de:
//1ro abrir el formulario con los campos completos para editarlos
//2do pasar al componente index de FormUserAcces para poder modificar el acceso del visitante (en caso de que el rol del usuario sea visitante)
import { useNavigate } from "react-router-dom";
import { FormUser } from "./FormUser"
import { useState } from "react";
import { FormUserAccess } from "./FormUserAccess";
import type { UserWithoutDescriptor } from "../../types/userType";
import type { FormValues } from "../../schemas/schemaForm";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { Loading } from "../feedback/Loading";
import { Error } from "../feedback/Error";
import { Success } from "../feedback/Success";

interface Props {
    user: UserWithoutDescriptor
}

//Componente especifico para editar un usaurio utilizando el formulario reutilizable
export const FormUserUpdate = ({ user }: Props) => {

    const { error, loading, message, userUpdate } = useUpdateUser()

    const navigate = useNavigate()
    const [showAccessForm, setShowAccessForm] = useState(false)
    const [dataUser, setDataUser] = useState<FormValues | null>(null)

    const handleSubmitUser = async (data: FormValues) => {
    //En caso de que el usuario tenga el rol "local" editamos solo sus datos y no pasamos al siguiente formulario
        if (data.rol === "local") {
            await userUpdate(user._id, data)
        } else {
            setDataUser(data)
            setShowAccessForm(true)
            console.log(showAccessForm)
        }
    }
    //Mostramos pantallas de feedback
    if (loading) {
        return <Loading />
    }
    if (error) {
        return <Error message={error.message} />
    }
    if (message) {
        return <Success message={message} />
    }
    //En caso de que el rol del usuario sea "local" no debo pasar al siguiente formulario
    if (showAccessForm && dataUser) return <FormUserAccess backToForm={() => setShowAccessForm(false)} data={dataUser} initialValue={user} />
    return <FormUser closeForm={() => navigate("/mobile/users")} onSubmit={handleSubmitUser} title="Editar Ususario" initialValues={user} />
}

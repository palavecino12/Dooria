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
import { useToast } from "../../hooks/useToast";
import { useUsers } from "../../hooks/useUsers";

interface Props {
    user: UserWithoutDescriptor
}

//Componente especifico para editar un usaurio utilizando el formulario reutilizable.
export const FormUserUpdate = ({ user }: Props) => {

    const navigate = useNavigate()
    const { refresh } = useUsers()//Refresh de la lista global de usuarios.

    const { loading, userUpdate } = useUpdateUser()
    const { showToast } = useToast();//Toas que nos da feedback
    const [showAccessForm, setShowAccessForm] = useState(false)
    const [dataUser, setDataUser] = useState<FormValues | null>(null)

    const handleSubmitUser = async (data: FormValues) => {

        if (data.rol === "Local") {
            try {
                //Borramos los datos que tenia almacenado en el acceso para que si vuelve a ser visitante aparezca vacio.
                const userToUpdate: FormValues = { ...data, allowedDays: [], allowedDates: [], };

                const message = await userUpdate(user._id, userToUpdate);
                await refresh()
                showToast({ variant: "success", message, });
                navigate("/mobile/users");

            } catch (error) {
                showToast({
                    variant: "error",
                    message:
                        error instanceof Error
                            ? error.message
                            : "Error desconocido",
                });
            }
        } else {
            setDataUser(data);
            setShowAccessForm(true);
        }
    }

    return (
        <>
            {/* Pantalla loading, esta dentro para que se vea sobre la interfaz */}
            {loading && <Loading />}

            {/* Formularios */}
            {showAccessForm && dataUser ? (
                <FormUserAccess backToForm={() => setShowAccessForm(false)} data={dataUser} initialValue={user} />
            ) : (
                <FormUser closeForm={() => navigate("/mobile/users")} onSubmit={handleSubmitUser} title="Editar Usuario" initialValues={user} currentUserId={user._id} />
            )}
        </>
    );
}

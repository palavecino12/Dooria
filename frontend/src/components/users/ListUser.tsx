import { useDeleteUser } from "../../hooks/useDeleteUser"
import { useGetUsers } from "../../hooks/useGetUsers"
import { Loading } from "../feedback/Loading"
import { Toast } from "../feedback/Toast"
import { CardUser } from "./CardUser"
import { useEffect, useState } from "react"


interface props {
    fullName: string
    filter: string
}

export const ListUsers = ({ fullName, filter }: props) => {

    const { users, refresh } = useGetUsers({ fullName, filter })

    const { userDelete, loading, error, message } = useDeleteUser()

    //Estado para abrir notificacion de feedback al eliminar un usuario
    const [toast, setToast] = useState({
        open: false,
        variant: "success" as "success" | "error",
        message: "",
    });

    //Mostramos un toast cuando cambia el estado del hook
    useEffect(() => {
        if (message) {
            setToast({
                open: true,
                variant: "success",
                message,
            });
            return;
        }

        if (error) {
            setToast({
                open: true,
                variant: "error",
                message: error.message,
            });
        }
    }, [message, error]);


    return (
        <>
            {/* Componente loading */}
            {loading && <Loading />}

            {/* Lista de usuarios */}
            <div className="border-t border-b border-gray-400 pb-3 pt-3 bg-white
                        shadow-[0_4px_10px_rgba(0,0,0,0.15),0_-4px_10px_rgba(0,0,0,0.15)] w-full">
                <div className="divide-y overflow-auto h-100">
                    {users.length > 0 ? (
                        users.map(user =>
                            <CardUser key={user._id} user={user} refresh={refresh} userDelete={userDelete} />
                        )
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-500 text-lg font-medium">
                            No hay usuarios almacenados
                        </div>
                    )}
                </div>
            </div>

            {/* Toast de feedback */}
            <Toast
                open={toast.open}
                variant={toast.variant}
                message={toast.message}
                onClose={() =>
                    setToast((prev) => ({
                        ...prev,
                        open: false,
                    }))
                }
            />
        </>

    )
}
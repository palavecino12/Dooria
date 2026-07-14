import { useDeleteUser } from "../../hooks/useDeleteUser"
import { useGetUsers } from "../../hooks/useGetUsers"
import { useToast } from "../../hooks/useToast"
import { Loading } from "../feedback/Loading"
import { CardUser } from "./CardUser"

interface props {
    fullName: string
    filter: string
}

export const ListUsers = ({ fullName, filter }: props) => {

    const { users, refresh } = useGetUsers({ fullName, filter })

    const { userDelete, loading } = useDeleteUser()

    const { showToast } = useToast();//Toas que nos da feedback

    const handleDelete = async (id: string) => {
        try {

            const message = await userDelete(id);
            refresh();
            showToast({
                variant: "success",
                message,
            });
        } catch (error) {
            showToast({
                variant: "error",
                message:
                    error instanceof Error
                        ? error.message
                        : "Error desconocido",
            });
        }
    };

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
                            <CardUser key={user._id} user={user} userDelete={handleDelete} />
                        )
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-500 text-lg font-medium">
                            No hay usuarios almacenados
                        </div>
                    )}
                </div>
            </div>
        </>

    )
}
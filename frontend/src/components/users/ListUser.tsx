import { useDeleteUser } from "../../hooks/useDeleteUser"
import { useUsers } from "../../hooks/useUsers"
import { useToast } from "../../hooks/useToast"
import { Loading } from "../feedback/Loading"
import { Spinner } from "../feedback/Spinner"
import { CardUser } from "./CardUser"
import { ErrorState } from "../feedback/ErrorState"
import type { UserWithoutDescriptor } from "../../types/userType"

interface ListUsersProps {
    userSearch: string,
    selected: string
}

export const ListUsers = ({ userSearch, selected }: ListUsersProps) => {

    const { users, refresh, loading: loadingUsers, error } = useUsers()//Hook para traer todos los usuarios y actualizar.

    const { userDelete, loading: deletingUser } = useDeleteUser()//El message lo retorna la funcion en caso de exito.

    const { showToast } = useToast();//Toas que nos da feedback.

    const handleDelete = async (id: string) => {
        try {

            const message = await userDelete(id);
            await refresh();
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

    //Funcion para filtrar los usuarios segun el texto del buscador
    const matchesSearch = (user: UserWithoutDescriptor, search: string): boolean => {

        const terms = search.trim().toLowerCase().split(/\s+/);

        //Si el buscador está vacío, mostramos todos.
        if (terms.length === 1 && terms[0] === "") {
            return true;
        }

        const name = user.name.toLowerCase();
        const lastName = user.lastName.toLowerCase();

        return terms.every(term => name.includes(term) || lastName.includes(term));
    };

    //Filtramos los usuarios segun el buscador y el filtro.
    const filteredUsers = users.filter(user => {

        const matchesFilter = selected === "Todos"
            ? true
            : user.rol === selected;

        return matchesSearch(user, userSearch) && matchesFilter;
    });

    return (
        <>
            {/* Componente loading */}
            {deletingUser && <Loading />}

            {/* Lista de usuarios */}
            <div className="border-t border-b border-gray-400 pb-3 pt-3 bg-white
                        shadow-[0_4px_10px_rgba(0,0,0,0.15),0_-4px_10px_rgba(0,0,0,0.15)] w-full">
                <div className="divide-y overflow-auto h-100">

                    {/* Validamos en caso de loading, error y si hay o no usuarios */}
                    {loadingUsers ? (
                        <div className="h-full flex items-center justify-center">
                            <Spinner message="Cargando usuarios..." />
                        </div>
                    ) : error ? (
                        <div className="h-full flex items-center justify-center">
                            <ErrorState message="Error al traer los usuarios" />
                        </div>
                    ) : filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <CardUser key={user._id} user={user} userDelete={handleDelete} />
                        ))
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
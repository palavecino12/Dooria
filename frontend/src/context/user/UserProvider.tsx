import { useEffect, useState, type ReactNode } from "react"
import { getUsers } from "../../services/userServices"
import type { UserWithoutDescriptor } from "../../types/userType"
import { UsersContext } from "./UserContext"

interface UserProviderProps {
    children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {

    const [users, setUsers] = useState<UserWithoutDescriptor[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    //Funcion que vamos a ejecutar cuando creemos, editemos o borremos usuarios.
    const refresh = async () => {
        try {
            setLoading(true);
            
            const data = await getUsers();
            
            setUsers(data);
            setError(null);
        } catch (error) {
            const err = error instanceof Error
                ? error
                : new Error("Error desconocido");

            setError(err);

            throw err;
        } finally {
            setLoading(false);
        }
    };

    //Traemos todos los usuarios apenas se renderice el componente.
    useEffect(() => {
        refresh();
    }, []);

    return (
        <UsersContext.Provider value={{ users, loading, error, refresh }}>
            {children}
        </UsersContext.Provider>
    );
}
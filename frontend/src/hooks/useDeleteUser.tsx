//Nuevo enfoque de hook, donde:
//Ejecutamos, retornamos el loading y devolvemos el resultado o error
import { useState } from "react";
import { deleteUser } from "../services/userServices";

export const useDeleteUser = () => {

    const [loading, setLoading] = useState(false);

    const userDelete = async (id: string): Promise<string> => {

        try {
            
            setLoading(true);
            const data = await deleteUser(id);
            return data.message;

        } catch (error) {

            if (error instanceof Error) {
                throw error;
            }
            throw new Error("Error desconocido");

        } finally {
            setLoading(false);
        }
    };

    return { userDelete, loading };
};
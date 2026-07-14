//Nuevo enfoque de hook, donde:
//Ejecutamos, retornamos el loading y devolvemos el resultado o error
import { useState } from "react"
import { updateUser } from "../services/userServices"
import type { FormValues } from "../schemas/schemaForm"

export const useUpdateUser = () => {
    const [loading, setloading] = useState(false)

    const userUpdate = async (id: string, user: FormValues): Promise<string> => {
        try {

            setloading(true)
            const data = await updateUser(id, user)
            return data.message

        } catch (error) {

            if (error instanceof Error) {
                throw error;
            }
            throw new Error("Error desconocido");

        } finally {
            setloading(false)
        }
    }

    return { loading, userUpdate }
}
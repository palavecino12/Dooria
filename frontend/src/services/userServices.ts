import type { FormValues } from "../schemas/schemaForm"
import { type UserWithoutDescriptor, type CreateUser, type User } from "../types/userType"

const apiUrl = import.meta.env.VITE_API_URL;
if (!apiUrl) {
    throw new Error("La variable de entorno VITE_API_URL no está definida");
}

//Servicio para consumir el endpoint: Get/usuarios/
export const getUsers = async (): Promise<UserWithoutDescriptor[]> => {
    const url = `${apiUrl}/usuarios`

    try {
        const response = await fetch(url)

        const data = await response.json()

        if (!response.ok) {
            //Mandamos al hook el mensaje de error del back
            throw new Error(data.error || "Error desconocido en el servidor")
        }

        return data as UserWithoutDescriptor[]
    } catch (error) {
        console.error("Error en getUsers:", error)
        throw error//relanzamos el error para que lo capture el hook
    }
}

//Servicio para consumir el endpoint: Post/usuarios/registrar-usuario
type RegisterUserResponse = {
    usuario: UserWithoutDescriptor;
    message: string;
};
export const registerUser = async (user: CreateUser): Promise<RegisterUserResponse> => {
    const url = `${apiUrl}/usuarios/registrar-usuario`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(user),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Error desconocido en el servidor");
        }

        return data;
    } catch (error) {
        console.error("Error en registerUser:", error);
        throw error;
    }
};

//Servicio para consumir el endpoint: Delete/usuarios/eliminar-usuario/:id
export const deleteUser = async (id: string): Promise<{ message: string }> => {
    const url = `${apiUrl}/usuarios/eliminar-usuario/${id}`

    try {
        const response = await fetch(url, {
            method: "DELETE"
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || "Error desconocido en el servidor")
        }

        return data //Esto retorna un objeto con un atributo message dentro, verificar si se usa bien y cambiar nombre
    } catch (error) {
        console.error("Error en deleteUser:", error)
        throw error
    }
}

//Servicio para consumir el endpoint: Update/usuarios/editar-usuario/:id
export const updateUser = async (id: string, user: FormValues): Promise<{ message: string }> => {
    const url = `${apiUrl}/usuarios/editar-usuario/${id}`

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || "Error desconocido en el servidor")
        }

        return data
    } catch (error) {
        console.error("Error en updateUser:", error)
        throw error
    }
}

//Servicio para consumir el endpoint: Post/usuarios/buscar-rostro
export type FindUserByDescriptorResponse =
    | { match: true; access: boolean; user: User }
    | { match: false; access: false };
    
export const findUserByDescriptor = async (descriptor: number[]): Promise<FindUserByDescriptorResponse> => {
    const url = `${apiUrl}/usuarios/buscar-rostro`

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ descriptor })
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || "Error desconocido en el servidor")
        }

        return data
    } catch (error) {
        console.error("Error en findUserByDescriptor:", error)
        throw error
    }
}
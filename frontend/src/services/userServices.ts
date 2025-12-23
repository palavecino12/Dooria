import { type UserListItem } from "../types/userType"

//Servicio para consumir el endpoint: GET/usuarios/
export const getUsers = async (fullName:string,filter:string):Promise<UserListItem[]> =>{
    const url=`http://localhost:3000/usuarios?fullName=${encodeURIComponent(fullName)}&filter=${encodeURIComponent(filter)}`

    try {
        const response= await fetch(url)

        const data = await response.json()

        if (!response.ok){
            throw new Error(data.error || "Error desconocido en el servidor")
        }
        
        return data as UserListItem[]
    } catch (error) {
        console.error("Error en getUsers:", error)
        throw error//relanzamos el error para que lo capture el hook
    }
}

//Servicio para consumir el endpoint: Delete/usuarios/eliminar-usuario/:id
export const deleteUser = async(id:number) =>{
    const url= `http://localhost:3000/usuarios/eliminar-usuario/${id}`

    try {
        const response = await fetch(url,{
            method:"DELETE"
        })
        
        const data = await response.json()        

        if (!response.ok){
            throw new Error(data.error || "Error desconocido en el servidor")
        }

        return data
    } catch (error) {
        console.error("Error en deleteUser:", error)
        throw error
    }
}
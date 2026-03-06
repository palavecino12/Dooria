import { type UserWithoutDescriptor } from "../types/userType"

//Servicio para consumir el endpoint: Get/usuarios/
export const getUsers = async (fullName:string,filter:string):Promise<UserWithoutDescriptor[]> =>{
    const url=`http://localhost:3000/usuarios?fullName=${encodeURIComponent(fullName)}&filter=${encodeURIComponent(filter)}`

    try {
        const response= await fetch(url)

        const data = await response.json()

        if (!response.ok){
            //Mandamos al hook el mensaje de error del back
            throw new Error(data.error || "Error desconocido en el servidor")
        }
        
        return data as UserWithoutDescriptor[]
    } catch (error) {
        console.error("Error en getUsers:", error)
        throw error//relanzamos el error para que lo capture el hook
    }
}

//Servicio para consumir el endpoint: Delete/usuarios/eliminar-usuario/:id
export const deleteUser = async(id:string) =>{
    const url= `http://localhost:3000/usuarios/eliminar-usuario/${id}`

    try {
        const response = await fetch(url,{
            method:"DELETE"
        })
        
        const data = await response.json()        

        if (!response.ok){
            throw new Error(data.error || "Error desconocido en el servidor")
        }

        return data //Esto retorna un objeto con un atributo message dentro, verificar si se usa bien y cambiar nombre
    } catch (error) {
        console.error("Error en deleteUser:", error)
        throw error
    }
}

//Servicio para consumir el endpoint: Update/usuarios/editar-usuario/:id
export const updateUser = async (id:string,user:UserWithoutDescriptor) => {
    const url = `http://localhost:3000/usuarios/editar-usuario/${id}`

    try {
        const response = await fetch(url,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(user)
        })

        const data = await response.json()

        if (!response.ok){
            throw new Error(data.error || "Error desconocido en el servidor")
        }

        return data
    } catch (error) {
        console.error("Error en updateUser:", error)
        throw error
    }
}
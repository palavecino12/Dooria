//Este type es solo lo que va a devolver el endpoint GET/usuarios, ya que no necesitamos el descriptor
type User={
        id: string,
        name: string,
        lastName: string,
        dni: string,
        number: string,
        address: string,
        rol: string
}

//Servicio para consumir el endpoint: GET/usuarios/
export const getUsers = async (fullName:string):Promise<User[]> =>{
    const url=`http://localhost:3000/usuarios?fullName=${encodeURIComponent(fullName)}`

    try {
        const response= await fetch(url)

        if (!response.ok){
            const errorData = await response.json()
            throw new Error(errorData.error || "Error desconocido en el servidor")
        }
        
        const users:User[] = await response.json()
        return users        
    } catch (error) {
        console.error("Error en getUsers:", error)
        throw error//relanzamos el error para que lo capture el hook
    }
}
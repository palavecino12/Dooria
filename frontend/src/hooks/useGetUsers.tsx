import { useEffect, useState } from "react"
import { type UserListItem } from "../types/userType"
import { getUsers } from "../services/userServices"

export const useGetUsers =  (fullName:string,filter:string) =>{
    const [users,setUsers] = useState<UserListItem[]>([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState<Error|null>(null)
    const [refreshUsers, setRefreshUsers] = useState(false)

    //Funcion que fuerza a un re-render y re-fetch (para cuando eliminamos o editamos un usuario)
    const refresh = () =>{
        setRefreshUsers(!refreshUsers)
    }

    useEffect(()=>{
        const fetchUsers = async () =>{
            try {
                setLoading(true)
                setError(null)
                const data = await getUsers(fullName,filter)
                setUsers(data)
            } catch (error) {
                if (error instanceof Error) setError(error)
                else setError(new Error("Error desconocido"))
            } finally {
                setLoading(false)
            }
        }
        fetchUsers()
    },[fullName,filter,refreshUsers])

    return {users,loading,error,refresh}
}
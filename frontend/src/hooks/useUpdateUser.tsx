import { useState } from "react"
import { updateUser } from "../services/userServices"
import type { FormValues } from "../schemas/schemaForm"

export const useUpdateUser = () => {
    const [message, setMessage] = useState("")
    const [loading, setloading] = useState(false)
    const [error,setError] = useState<Error|null>(null)

    const userUpdate = async (id:string,user:FormValues) =>{
        try {
            
            setloading(true)
            setError(null)
            setMessage("")
            const data = await updateUser(id,user)
            setMessage(data.message)
        } catch (error) {
            if (error instanceof Error) setError(error)
            else setError(new Error("Error desconocido"))
        }finally{
            setloading(false)
        }
    }

    return {message,loading,error,userUpdate}
}
import { useState } from "react"
import { deleteUser } from "../services/userServices"

export const useDeleteUser = () =>{
    const [message,setMessage] = useState("")
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState<Error|null>(null)

    const userDelete = async(id:number) => {
        try {
            setLoading(true)
            setError(null)
            setMessage("")
            const data = await deleteUser(id)
            //Si data no tiene errores devuelve un objto con message
            setMessage(data.message)
        } catch (error) {
            if (error instanceof Error) setError(error) //Capturamos el mensaje de error del back
            else setError(new Error("Error desconocido"))
        }finally{
            setLoading(false)
        }
    }

    return {userDelete,message,loading,error}
}
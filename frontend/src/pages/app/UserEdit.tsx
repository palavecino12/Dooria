import { useLocation } from "react-router-dom"
import { FormUserUpdate } from "../../components/forms/FormUserUpdate"
import type { UserWithoutDescriptor } from "../../types/userType"

export const EditUser = () =>{

    const location = useLocation()
    const user = location.state?.user as UserWithoutDescriptor | undefined 

    if (!user) return <div>Usuario no encontrado</div>//Probar como se ve este div
    return <FormUserUpdate user={user}/>
}
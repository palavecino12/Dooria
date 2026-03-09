import { useLocation, useNavigate } from "react-router-dom"
import { FormUserUpdate } from "../../components/forms/FormUserUpdate"
import type { UserWithoutDescriptor } from "../../types/userType"

export const EditUser = () =>{

    const navigate = useNavigate()
    const location = useLocation()
    const user = location.state?.user as UserWithoutDescriptor | undefined 


    const handleSubmitUser = () =>{
        //Aca tiene que ir el servicio
        navigate("/mobile/users")
    }

    if (!user) return <div>Usuario no encontrado</div>//Probar como se ve este div
    return <FormUserUpdate initialValues={user} onSubmit={handleSubmitUser}/>
}
import { useGetUsers } from "../../hooks/useGetUsers"
import { CardUser } from "./CardUser"

interface props{
    fullName:string
}

export const ListUsers = ({fullName}:props) =>{

    const {users} = useGetUsers(fullName)

    return(
        <div>
            {users.map(user=><CardUser key={user._id} user={user}/>)}
        </div>
    )
}
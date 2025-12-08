import { type UserListItem } from "../../types/userType"

interface props{
    user:UserListItem
}
export const CardUser = ({user}:props) =>{
    
    return(
        <div>
            <p>{user.name} {user.lastName} - {user.dni} <span>{user.rol}</span></p>
        </div>
    )
}
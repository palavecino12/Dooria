import { ChevronRight, Trash2 } from "lucide-react"
import { type UserListItem } from "../../types/userType"

interface props{
    user:UserListItem
}
export const CardUser = ({user}:props) =>{
    
    return(
        <div className="border-b first:border-t border-black/20 p-3 text-black 
                grid grid-cols-[5px_1fr_100px_auto] items-center gap-4">
            <button><ChevronRight size={16}/></button>
            <p>{user.name} {user.lastName}</p>
            <p className={user.rol=="local"
                ?"text-center bg-blue-200 rounded-sm"
                :"text-center bg-amber-200 rounded-sm"}>
            {user.rol}</p>
            <button className="bg-black p-2 text-white rounded-lg shadow-lg transition-all duration-200
                        active:bg-gray-200 active:shadow-inner"><Trash2 /></button>
        </div>
    )
}
import { useGetUsers } from "../../hooks/useGetUsers"
import { CardUser } from "./CardUser"

interface props {
    fullName: string
    filter: string
}

export const ListUsers = ({ fullName, filter }: props) => {

    const { users, refresh } = useGetUsers({ fullName, filter })

    return (
        <div className="border-t border-b border-gray-400 pb-3 pt-3 bg-white
                        shadow-[0_4px_10px_rgba(0,0,0,0.15),0_-4px_10px_rgba(0,0,0,0.15)] w-full">
            <div className="divide-y overflow-auto h-100">
                {users.length > 0 ? (
                    users.map(user =>
                        <CardUser key={user._id} user={user} refresh={refresh} />
                    )
                ) : (
                    <div className="h-full flex items-center justify-center text-gray-500 text-lg font-medium">
                        No hay usuarios almacenados
                    </div>
                )}
            </div>
        </div>
    )
}
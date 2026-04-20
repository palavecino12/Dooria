import { ChevronRight, Pencil, Trash2 } from "lucide-react"
import { type UserWithoutDescriptor } from "../../types/userType"
import { useDeleteUser } from "../../hooks/useDeleteUser"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface props{
    user:UserWithoutDescriptor
    refresh:()=>void
}
export const CardUser = ({user,refresh}:props) =>{

    const navigate = useNavigate()

    const { userDelete, loading} = useDeleteUser() //Falta traer error y message que los tendria que colocar en un modal (tambien preguntar si verdaderamente desea eliminar)
    
    //Funcion del boton de eliminar usuario
    const handleDelete = async() => { 
        await userDelete(user._id)
        refresh()
        //No manejo el error porque ya queda guardado en el estado del hook
    }

    //Filtramos las fechas a tipo YYYY-MM-DD para que sea mas legible para el usuario
    const userDates = user?.allowedDates?.map(date => date.slice(0, 10))?? [];
    //Convertimos de numero a dias de la semana
    const daysMap = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    const userDays = user?.allowedDays
        ? user.allowedDays.map(d => daysMap[d])
        : [];

    const [showFullCard,setShowFullCard]=useState(false);


    
    return(
        <div className="border-b first:border-t border-black/20 p-3 text-black 
                grid grid-cols-[5px_1fr_80px_auto] items-center gap-4">
            
            {/* Boton para desplegar tarjeta completa */}
            <button
                onClick={()=>setShowFullCard(!showFullCard)}>
                <ChevronRight size={18} className={showFullCard?"rotate-90":""}/>
            </button>

            {/* Informacion general */}
            <p className="whitespace-nowrap">{user.name} {user.lastName}</p>

            {/* Informacion de rol */}
            <p className={user.rol=="local"
                ?"text-center bg-blue-200 rounded-sm"
                :"text-center bg-amber-200 rounded-sm"}>
            {user.rol}</p>
            
            <div className="flex gap-1">
                {/* Boton para editar */}
                <button
                    onClick={()=>navigate(`/mobile/users/${user._id}/edit`,{
                        state: {user}
                    })}
                    className="bg-black p-2 text-white rounded-lg shadow-lg transition-all duration-200
                            active:bg-gray-200 active:shadow-inner"><Pencil/></button>
            
                {/* Boton para eliminar */}
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="bg-black p-2 text-white rounded-lg shadow-lg transition-all duration-200
                            active:bg-gray-200 active:shadow-inner"><Trash2 /></button>
            </div>
            

            {/* Informacion de usuario visitante al desplegar tarjeta */}
            {showFullCard && user.rol === "visitante" && (
                <div className="col-span-full mt-2 pl-6 wrap-break-words whitespace-normal">
                    <p>- DNI: {user.dni}</p>
                    <p>- Numero: {user.number}</p>
                    <p>- Direccion: {user.address}</p>
                    {(userDays?.length > 0 || userDates?.length > 0) && (
                        <div className="text-black">
                            {userDays?.length > 0 && (
                                <p>-Días que tenés permitidos: {userDays.join(", ")}</p>
                            )}
                            {userDates?.length > 0 && (
                                <p>-Fechas que tenés permitidas: {userDates.join(", ")}</p>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Informacion de usuario local al desplegar tarjeta */}
            {showFullCard && user.rol==="local" && (
                <div className="col-span-full mt-2 pl-6 wrap-break-words whitespace-normal">
                    <p>- DNI: {user.dni}</p>
                    <p>- Numero: {user.number}</p>
                    <p>- Direccion: {user.address}</p>
                </div>
            )}
        </div>
    )
}
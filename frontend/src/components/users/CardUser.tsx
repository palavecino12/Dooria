import { ChevronRight, Trash2 } from "lucide-react"
import { type UserListItem } from "../../types/userType"
import { useState } from "react"

interface props{
    user:UserListItem
}
export const CardUser = ({user}:props) =>{

    //Filtramos las fechas a tipo YYYY-MM-DD para que sea mas legible para el usuario
    const userDates = user?.allowedDates?.map(date => date.slice(0, 10));
    //Convertimos de numero a dias de la semana
    const daysMap = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    const userDays = user?.allowedDays
        ? user.allowedDays.map(d => daysMap[d])
        : [];

    const [showFullCard,setShowFullCard]=useState(false);
    
    return(
        <div className="border-b first:border-t border-black/20 p-3 text-black 
                grid grid-cols-[5px_1fr_100px_auto] items-center gap-4">
            
            {/* Boton para desplegar tarjeta completa */}
            <button onClick={()=>setShowFullCard(!showFullCard)}>
                <ChevronRight size={18} className={showFullCard?"rotate-90":""}/>
            </button>

            {/* Informacion general */}
            <p>{user.name} {user.lastName}</p>

            {/* Informacion de rol */}
            <p className={user.rol=="local"
                ?"text-center bg-blue-200 rounded-sm"
                :"text-center bg-amber-200 rounded-sm"}>
            {user.rol}</p>
            
            {/* Boton para eliminar */}
            <button className="bg-black p-2 text-white rounded-lg shadow-lg transition-all duration-200
                        active:bg-gray-200 active:shadow-inner"><Trash2 /></button>

            {/* Informacion de usuario visitante al desplegar tarjeta */}
            {showFullCard && user.rol === "visitante" && (
                <div className="col-span-full mt-2 pl-6 wrap-break-words whitespace-normal">
                    <p>- DNI: {user.dni}</p>
                    <p>- Numero: {user.number}</p>
                    <p>- Direccion: {user.address}</p>
                    <p>- Tipo de acceso: {user.accessType}</p>
                    {user.accessType === "semanal" 
                        ? <p>- Días permitidos: {userDays.join(", ")}</p>
                        : <p>- Fechas permitidas: {userDates?.join(", ")}</p>
                    }
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
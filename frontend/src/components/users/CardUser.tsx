import { ChevronRight, Pencil, Trash2 } from "lucide-react"
import { type UserWithoutDescriptor } from "../../types/userType"
import { useDeleteUser } from "../../hooks/useDeleteUser"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { InfoItem } from "./InfoItem"

interface props {
    user: UserWithoutDescriptor
    refresh: () => void
}
export const CardUser = ({ user, refresh }: props) => {

    const navigate = useNavigate()
    const { userDelete, loading } = useDeleteUser() //Falta traer error y message que los tendria que colocar en un modal (tambien preguntar si verdaderamente desea eliminar)

    //Funcion del boton de eliminar usuario
    const handleDelete = async () => {
        await userDelete(user._id)
        refresh()
        //No manejo el error porque ya queda guardado en el estado del hook
    }

    //Filtramos las fechas a tipo YYYY-MM-DD para que sea mas legible para el usuario
    const userDates = user?.allowedDates?.map(date => date.slice(0, 10)) ?? [];
    //Convertimos de numero a dias de la semana
    const daysMap = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    const userDays = user?.allowedDays
        ? user.allowedDays.map(d => daysMap[d])
        : [];

    const [showFullCard, setShowFullCard] = useState(false);

    return (
        <div className="border-b first:border-t border-black/20 p-3 text-black 
                grid grid-cols-[5px_1fr_80px_auto] items-center gap-4">

            {/* Boton para desplegar tarjeta completa */}
            <button
                onClick={() => setShowFullCard(!showFullCard)}>
                <ChevronRight size={22} className={`transition-transform duration-150 ${showFullCard ? "rotate-90" : ""}`} />
            </button>

            {/* Informacion general */}
            <p className="whitespace-nowrap m-1">{user.name} {user.lastName}</p>

            {/* Informacion de rol */}
            <p className={user.rol == "local"
                ? "text-center bg-blue-200 rounded-sm p-0.5"
                : "text-center bg-amber-200 rounded-sm p-0.5"}>
                {user.rol}</p>

            <div className="flex gap-1">
                {/* Boton para editar */}
                <button
                    onClick={() => navigate(`/mobile/users/${user._id}/edit`, {
                        state: { user }
                    })}
                    className="bg-black p-2 text-white rounded-lg shadow-lg transition-all duration-200
                            active:bg-gray-200 active:shadow-inner"><Pencil /></button>

                {/* Boton para eliminar */}
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="bg-black p-2 text-white rounded-lg shadow-lg transition-all duration-200
                            active:bg-gray-200 active:shadow-inner"><Trash2 /></button>
            </div>

            {/* Informacion de los usuarios */}
            <div className={`col-span-full overflow-hidden transition-all duration-250 ease-in-out
                    ${showFullCard ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"}`}>

                <div className="pl-4 wrap-break-words whitespace-normal">
                    {/* Campos comunes */}
                    <InfoItem label="DNI" value={user.dni} />
                    <InfoItem label="Número" value={user.number} />
                    <InfoItem label="Dirección" value={user.address} />

                    {/* Campos específicos de visitante */}
                    {user.rol === "visitante" && (
                        <>
                            <InfoItem label="Días permitidos" value={userDays} />
                            <InfoItem label="Fechas permitidas" value={userDates} />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
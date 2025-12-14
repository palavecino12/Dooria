//Index que contiene el renderizado del componente ListUsers, SearchUsers y la comunicacion entre si
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListUsers } from "./ListUser";
import { SearchUsers } from "./SearchUser";
import { UserFilterButtons } from "./UserFilterButtons";

export const UsersPage = () =>{
    const navigate = useNavigate()
    //Almacenamos lo que ingresa el usuario
    const [userSearch, setUserSearch] = useState("")
    //Almacenamos el filtro que aplica el usuario
    const [selected, setSelected] = useState("Todos");

    return(
        <div className="h-screen flex flex-col items-center justify-center gap-10">
            {/* Buscador de usuarios */}
            <SearchUsers setUserSearch={setUserSearch}/>

            {/* Botones de filtro */}
            <UserFilterButtons selected={selected} setSelected={setSelected}/>

            {/* Lista de usuarios */}
            <ListUsers fullName={userSearch} filter={selected}/>

            <button className="bg-white border border-black/20 w-28 h-11 text-black rounded-lg shadow-lg transition-all duration-200
                                active:bg-gray-200 active:shadow-inner"
                    onClick={()=>navigate("/mobile")}>Volver</button>
        </div>
    )
}
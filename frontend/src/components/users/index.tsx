//Index que contiene el renderizado del componente ListUsers, SearchUsers, UserFilterButton y la comunicacion entre si
import { useState } from "react";
import { ListUsers } from "./ListUser";
import { SearchUsers } from "./SearchUser";
import { UserFilterButtons } from "./UserFilterButtons";

export const UsersPage = () =>{
    //Almacenamos lo que ingresa el usuario
    const [userSearch, setUserSearch] = useState("")
    //Almacenamos el filtro que aplica el usuario
    const [selected, setSelected] = useState("Todos");

    return(
        <div className="h-dvh flex flex-col items-center justify-center gap-5 bg-gray-200">
            {/* Buscador de usuarios */}
            <SearchUsers setUserSearch={setUserSearch}/>

            {/* Botones de filtro */}
            <UserFilterButtons selected={selected} setSelected={setSelected}/>

            {/* Lista de usuarios */}
            <ListUsers selected={selected} userSearch={userSearch}/>
        </div>
    )
}
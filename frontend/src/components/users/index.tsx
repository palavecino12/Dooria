import { useState } from "react";
import { ListUsers } from "./ListUser";
import { SearchUsers } from "./SearchUser";
import { UserFilterButtons } from "./UserFilterButtons";

export const UsersPage = () => {
    const [userSearch, setUserSearch] = useState("")
    const [selected, setSelected] = useState("Todos");

    return (
        <div className="px-3 pt-3 w-full h-full flex flex-col items-center gap-5">
            {/* Buscador de usuarios */}
            <SearchUsers setUserSearch={setUserSearch} />

            {/* Botones de filtro */}
            <UserFilterButtons selected={selected} setSelected={setSelected} />

            {/* Lista de usuarios: ocupa todo el espacio restante */}
            <div className="w-full flex-1 min-h-0">
                <ListUsers selected={selected} userSearch={userSearch} />
            </div>
        </div>
    )
}
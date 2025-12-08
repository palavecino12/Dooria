//Index que contiene el renderizado del componente ListUsers, SearchUsers y la comunicacion entre si
import { useState } from "react";
import { ListUsers } from "./ListUser";
import { SearchUsers } from "./SearchUser";

export const UsersPage = () =>{

    const [userSearch, setUserSearch] = useState("")

    return(
        <div>
            <SearchUsers setUserSearch={setUserSearch}/>
            <ListUsers fullName={userSearch}/>
        </div>
    )
}
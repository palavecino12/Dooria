//Este seria el hook para traer todos los usuarios y poder refrescar la lista desde cualquier lado
//No se llama useGetUsers porque aca no consumimos el servicio para ello
import { useContext } from "react";
import { UsersContext } from "../context/user/UserContext";

export const useUsers = () => {
    const context = useContext(UsersContext);

    if (!context) {
        throw new Error("useUsers debe utilizarse dentro de UsersProvider.");
    }

    return context;
};
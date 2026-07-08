import { Search } from "lucide-react";

interface props{
    setUserSearch:React.Dispatch<React.SetStateAction<string>>
}

export const SearchUsers = ({setUserSearch}:props) =>{
    return(
        <div className="relative w-88">

            {/* La razon por la que esta primero el input es para poder usar peer para cuando se hace foco en el input */}
            <input
                type="text"
                placeholder="Buscar usuario..."
                className="peer w-full h-12 pl-10 p-2 border border-gray-300 rounded-lg shadow-lg
                    focus:ring-2 focus:border-transparent focus:outline-none focus:shadow-inner
                    transition-all duration-200 bg-white active:scale-95"
                onChange={(e) => {
                    const value = e.target.value.trim();
                    if (value.length > 2) {
                        setUserSearch(value);
                    } else {
                        setUserSearch("");
                    }
                }}
            />

            {/* Icono del buscador */}
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 
                peer-focus:text-black peer-active:translate-x-2 transition-all duration-200" />

        </div>
    )
}
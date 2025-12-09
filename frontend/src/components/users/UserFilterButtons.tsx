//Aca voy a tener 5 botones para filtrar a los usuarios por: todos | locales | visitantes 
import { useState } from "react";

export const UserFilterButtons = () => {
    const [selected, setSelected] = useState("Todos");

    const filters = ["Todos", "Locales", "Visitantes"];


    return (
        <div className="flex gap-2">
            {filters.map((id)=>(
                <button
                    key={id}
                    onClick={() => setSelected(id)}
                    className={`transition-all duration-200
                        ${selected === id
                            ? "bg-black w-28 h-11 text-white rounded-lg"
                            : "bg-white border border-black/20 w-28 h-11 text-black rounded-lg shadow-lg"}`}>
                    {id === "Todos" && "Todos"}
                    {id === "Locales" && "Locales"}
                    {id === "Visitantes" && "Visitantes"}
                </button>
            ))}
        </div>
    );
};

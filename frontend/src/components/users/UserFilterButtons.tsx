//Aca voy a tener 3 botones para filtrar a los usuarios por: todos | locales | visitantes 
interface props {
    setSelected: React.Dispatch<React.SetStateAction<string>>
    selected: string
}

export const UserFilterButtons = ({ setSelected, selected }: props) => {

    const filters = [
        { label: "Todos", value: "Todos" },
        { label: "Locales", value: "Local" },
        { label: "Visitantes", value: "Visitante" },
    ];

    return (
        <div className="flex">
            {filters.map((filter) => {
                //Codigo para redondear solo las esquinas exteriores de los botones exteriores
                const rounded =
                    filter.value === "Todos"
                        ? "rounded-tl-lg rounded-bl-lg"
                        : filter.value === "Local"
                            ? "rounded-none"
                            : "rounded-tr-lg rounded-br-lg";
                return (
                    <button
                        key={filter.value}
                        onClick={() => setSelected(filter.value)}
                        className={`transition-all duration-200 w-29 h-11 text-lg font-medium ${rounded}
                            ${selected === filter.value
                                ? "bg-black text-white"
                                : "bg-white border border-black/20 text-black shadow-lg"
                            }
                        active:scale-95 active:shadow-inner`}>
                        {filter.label}
                    </button>
                );
            })}
        </div>
    );
};
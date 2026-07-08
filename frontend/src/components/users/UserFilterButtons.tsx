//Aca voy a tener 3 botones para filtrar a los usuarios por: todos | locales | visitantes 
interface props {
    setSelected: React.Dispatch<React.SetStateAction<string>>
    selected: string
}

export const UserFilterButtons = ({ setSelected, selected }: props) => {

    const filters = ["Todos", "Locales", "Visitantes"];

    return (
        <div className="flex">
            {filters.map((filter) => {
                //Codigo para redondear solo las esquinas exteriores de los botones exteriores
                const rounded =
                    filter === "Todos"
                        ? "rounded-tl-lg rounded-bl-lg"
                        : filter === "Locales"
                            ? "rounded-none"
                            : "rounded-tr-lg rounded-br-lg";
                return (
                    <button
                        key={filter}
                        onClick={() => setSelected(filter)}
                        className={`transition-all duration-200 w-29 h-11 text-lg font-medium ${rounded}
                            ${selected === filter
                                ? "bg-black text-white"
                                : "bg-white border border-black/20 text-black shadow-lg"
                            }
                        active:scale-95 active:shadow-inner`}>
                            {filter}
                    </button>
                );
            })}
        </div>
    );
};
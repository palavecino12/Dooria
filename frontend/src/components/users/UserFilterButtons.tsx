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
        <div className="flex gap-1">
            {filters.map((filter) => {
                return (
                    <button
                        key={filter.value}
                        onClick={() => setSelected(filter.value)}
                        className={`transition-all duration-200 w-29 h-11 text-lg font-medium rounded-2xl
                            ${selected === filter.value
                                ? "bg-[#2c2c28] text-white"
                                : "bg-white text-black shadow-lg"
                            }
                        active:scale-95 active:shadow-inner`}>
                        {filter.label}
                    </button>
                );
            })}
        </div>
    );
};
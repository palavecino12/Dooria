//Aca voy a tener 3 botones para filtrar a los usuarios por: todos | locales | visitantes 
interface props {
    setSelected: React.Dispatch<React.SetStateAction<string>>
    selected: string
}

export const UserFilterButtons = ({ setSelected, selected }: props) => {

    const filters = ["Todos", "Locales", "Visitantes"];

    return (
        <div className="flex">
            {filters.map((id) => {

                const rounded =
                    id === "Todos"
                        ? "rounded-tl-lg rounded-bl-lg"
                        : id === "Locales"
                            ? "rounded-none"
                            : "rounded-tr-lg rounded-br-lg";
                return (
                    <button
                        key={id}
                        onClick={() => setSelected(id)}
                        className={`transition-all duration-200 w-29 h-11 ${rounded}
                            ${selected === id
                                ? "bg-black text-white"
                                : "bg-white border border-black/20 text-black shadow-lg"
                            }
                        active:scale-95 active:shadow-inner`}>{id}
                    </button>
                );
            })}
        </div>
    );
};
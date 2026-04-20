//Lo que tengo que hacer aca es recibir la data del usuario que obtenemos en el formUserCreate y sumarle la data de acceso que obtenemos aca
//Luego mandamos esa data a CamaraRegister para que junto al descriptor cree el usuario
interface props {
    toggleDay: (value: number) => void;
    selectedDays: number[]
}

export const WeeklySelector = ({toggleDay,selectedDays }: props) => {

    const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]

    return (
            <div className="flex flex-col items-center gap-4">
                {days.map((day, index) => {
                    const value = index + 1;

                    return (
                        <label key={value}>
                            <input
                                checked={selectedDays.includes(value)}
                                onChange={() => toggleDay(value)}
                                type="checkbox"
                                value={value}
                                className="hidden peer"
                            />
                            <div
                                className="bg-white border border-black/30 w-50 h-11 text-black rounded-lg shadow-lg font-semibold 
                                    transition-all duration-200 flex justify-center items-center peer-checked:bg-black 
                                    peer-checked:shadow-inner peer-checked:text-white">
                                {day}
                            </div>
                        </label>
                    )
                })}
            </div>
    )
}
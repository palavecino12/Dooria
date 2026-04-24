import { WeeklySelector } from "./WeeklySelector"
import { MonthlySelector } from "./MonthlySelector"
import { useState } from "react"
import type { FormValues } from "../../../schemas/schemaForm"
import type { UserWithoutDescriptor } from "../../../types/userType"
import { useUpdateUser } from "../../../hooks/useUpdateUser"
import { CameraRegister } from "../../cameras/CameraRegister"

interface props {
    backToForm: () => void
    data: FormValues
    initialValue?: UserWithoutDescriptor
}

export const FormUserAccess = ({ initialValue, backToForm, data }: props) => {

    const [option, setOption] = useState<"semanal" | "calendario" | null>("semanal")
    const { userUpdate } = useUpdateUser()//Luego tenemos que traer los otros estados
    const [showCameraRegister, setShowCameraRegister] = useState(false);
    const [selectedMonths, setSelectedMonths] = useState<Date[]>(initialValue?.allowedDates?.map(d => new Date(d)) ?? []);
    const [selectedDays, setSelectedDays] = useState<number[]>(initialValue?.allowedDays ?? []);

    //Al momento que seleccionamos un dia, lo quitamos si ya estaba selecciondo y lo agregamos si no lo estaba 
    const toggleDay = (value: number) => {
        setSelectedDays(prev =>
            prev.includes(value)
                ? prev.filter(d => d !== value)
                : [...prev, value]
        );
    };

    //Al confirmar añadimos a date los campos seleccionados de la semana y del calendario
    const handleConfirm = () => {
        if (initialValue) {
            userUpdate(initialValue._id, { ...data, allowedDates: selectedMonths.map(d => d.toISOString()), allowedDays: selectedDays })
            //Luego tengo que navegar al inicio y creo que colocar la pantalla de success antes
        } else {
            setShowCameraRegister(true)
        }
    }

    //Agregamos a date los dias y/o fechas que selecciono el usuario (convertimos selectDays en un array de string)
    if (showCameraRegister) return <CameraRegister data={{ ...data, allowedDates: selectedMonths.map(d => d.toISOString()), allowedDays: selectedDays }} backToForm={() => setShowCameraRegister(false)} />
    return (
        <div className="flex flex-col items-center justify-around bg-gray-200 h-screen">

            {/* Titulo */}
            <div>
                <h1 className="text-xl font-medium">Acceso del visitante</h1>
            </div>

            {/* Botones de mensual y semanal */}
            <div>
                <button
                    onClick={() => setOption("semanal")}
                    className={`w-34 h-11 rounded-tl-lg rounded-bl-lg shadow-lg transition-all duration-100
                        ${option === "semanal"
                            ? "bg-black text-white"
                            : "bg-white text-black border border-black/20"
                        } active:scale-95 active:shadow-inner`}>Semanal
                </button>
                <button
                    onClick={() => setOption("calendario")}
                    className={`w-34 h-11 rounded-tr-lg rounded-br-lg shadow-lg transition-all duration-100
                        ${option === "calendario"
                            ? "bg-black text-white"
                            : "bg-white text-black border border-black/20"
                        } active:scale-95 active:shadow-inner`}>Calendario
                </button>
            </div>

            {/* Componente mensual y semanal */}
            <div className="flex flex-row justify-center items-center gap-0 bg-white
                    shadow-[0_4px_10px_rgba(0,0,0,0.15),0_-4px_10px_rgba(0,0,0,0.15)] w-full h-[55%] p-8">

                {option === "semanal" && (<WeeklySelector selectedDays={selectedDays} toggleDay={toggleDay} />)}

                {option === "calendario" && (<MonthlySelector selectedMonths={selectedMonths} setSelectedMonths={setSelectedMonths} />)}

            </div>

            {/* Boton aceptr y volver */}
            <div className="flex flex-row-reverse gap-20">
                <button
                    onClick={handleConfirm}
                    className="bg-black w-34 h-11 text-white rounded-lg shadow-lg transition-all duration-200
                            active:bg-gray-200 active:shadow-inner">{initialValue ? "Confirmar" : "Siguiente"}
                </button>
                <button
                    onClick={backToForm}
                    className="bg-white border border-black/20 w-28 h-11 text-black rounded-lg shadow-lg transition-all duration-200
                            active:bg-gray-200 active:shadow-inner">Volver
                </button>
            </div>
        </div>
    )
}
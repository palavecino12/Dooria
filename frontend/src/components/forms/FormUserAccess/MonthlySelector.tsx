import "react-day-picker/style.css";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { es } from "react-day-picker/locale";
import { CameraRegister } from "../../cameras/CameraRegister";
import type { FormValues } from "../../../schemas/schemaForm";
import type { UserWithoutDescriptor } from "../../../types/userType";
import { useUpdateUser } from "../../../hooks/useUpdateUser";


interface props {
    backToOptions: () => void
    data: FormValues
    initialValues?: UserWithoutDescriptor
    mode: "create" | "edit"
}


export const MonthlySelector = ({ initialValues, backToOptions, data, mode }: props) => {


    const [selectedDays, setSelectedDays] = useState<Date[]>(initialValues?.allowedDates?.map(d => new Date(d)) ?? []);
    const [showCameraRegister, setShowCameraRegister] = useState(false);
    const { userUpdate } = useUpdateUser()//Luego tenemos que traer los otros estados


    //Agregamos a date los dias que selecciono el usuario (convertimos selectDays en un array de string)
    if (showCameraRegister) return <CameraRegister data={{ ...data, allowedDates: selectedDays.map(d => d.toISOString()) }} backToForm={() => setShowCameraRegister(false)} />


    const handleConfirm = () => {
        if (mode === "edit") {
            if (!initialValues) return
            userUpdate(initialValues._id, data)
        } else {
            setShowCameraRegister(true)
        }
    }


    return (
        <div className="flex flex-col items-center justify-around gap-10 bg-white h-screen">

            {/* Titulo */}
            <h1 className="text-3xl font-medium">Calendario</h1>

            {/* Calendario */}
            <div className="flex flex-col items-center gap-6 border-t border-b border-gray-400 
                    shadow-[0_4px_10px_rgba(0,0,0,0.15),0_-4px_10px_rgba(0,0,0,0.15)] w-full p-10">

            <DayPicker navLayout="around" mode="multiple" selected={selectedDays}
                onSelect={(days) => setSelectedDays(days ?? [])} locale={es}
                classNames={{
                    day: "text-xl",
                    today: "text-black border border-black/20",
                    selected: "bg-black text-white rounded-md",
                    month_grid: "mt-8",
                    weekday: "text-xl",
                }}/>
            </div>

            {/* Botones */}
            <div className="flex flex-row-reverse gap-20">
                <button
                    onClick={handleConfirm}//Abrimos el componente CameraRegister
                    className="bg-black w-34 h-11 text-white rounded-lg shadow-lg transition-all duration-200
                            active:bg-gray-200 active:shadow-inner">Siguiente</button>
                <button
                    onClick={backToOptions}
                    className="bg-white border border-black/20 w-28 h-11 text-black rounded-lg shadow-lg transition-all duration-200
                                active:bg-gray-200 active:shadow-inner">Volver</button>
            </div>
        </div>




    )
}

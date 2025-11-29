import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { es } from "react-day-picker/locale";
import { CameraRegister } from "../../cameras/CameraRegister";
import type { FormValues } from "../../../schemas/schemaForm";

interface props{
    backToOptions:()=>void
    data:FormValues
}

export const MonthlySelector=({backToOptions,data}:props)=>{

    const [selectedDays, setSelectedDays] = useState<Date[]>([]);
    const [showCameraRegister,setShowCameraRegister]=useState(false);

    //Agregamos a date los dias que selecciono el usuario (convertimos selectDays en un array de string) 
    if(showCameraRegister)return <CameraRegister data={{...data,allowedDates:selectedDays.map(d => d.toISOString())}} backToForm={()=>setShowCameraRegister(false)}/>

    return(
        <div className="h-screen flex flex-col justify-center items-center gap-30">
            {/* Titulo */}
            <div>
                <h1 className="text-3xl font-medium">Mensual</h1>
            </div>

            {/* Calendario */}
            <div>
                <DayPicker mode="multiple" selected={selectedDays} onSelect={(days) => setSelectedDays(days ?? [])} required locale={es}
                    classNames={{
                        root: "h-120 rounded-2xl p-5 bg-white shadow-xl border border-gray-200",
                        month: "relative space-y-15",
                        caption: "grid grid-cols-3 items-center px-5",
                        caption_label: "text-xl font-bold m-22",
                        nav: "flex items-center justify-between col-span-3",
                        nav_button_previous: "pointer-events-auto justify-self-start text-gray-600",
                        nav_button_next: "pointer-events-auto justify-self-end text-gray-600",
                        weekdays: "grid grid-cols-7 text-xl font-medium text-gray-500",
                        week: "grid grid-cols-7",
                        day: "text-xl w-11 h-11 flex items-center justify-center rounded-xl m-0.5",
                        selected: "bg-gray-600 text-white",
                        day_today: "border border-gray-200",
                        day_outside: "text-gray-300"}}/>
            </div>

            {/* Botones */}
            <div className="flex flex-row-reverse gap-20">
                <button
                    onClick={()=>setShowCameraRegister(true)}//Abrimos el componente CameraRegister
                    className="bg-gray-900/20 p-3 text-black/70 rounded-xl shadow-lg transition-all duration-200
                            active:bg-gray-200 active:shadow-inner">Siguiente</button>
                <button
                onClick={backToOptions} 
                className="bg-white border border-black/20 w-28 h-11 text-black rounded-xl shadow-lg transition-all duration-200 
                            active:bg-gray-200 active:shadow-inner">Volver</button>
            </div>

        </div>

    )
}
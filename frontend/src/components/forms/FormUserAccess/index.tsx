import { WeeklySelector } from "./WeeklySelector"
import { MonthlySelector } from "./MonthlySelector"
import { useState } from "react"

interface props{
    backToForm:()=>void
}

export const FormUserAccess=({backToForm}:props)=>{

    const [option,setOption]=useState<"Semanal"|"Mensual"|null>(null)

    if (option === "Semanal") return <WeeklySelector backToOptions={()=>setOption(null)}/>
    if (option === "Mensual") return <MonthlySelector backToOptions={()=>setOption(null)}/>;

    return(
        <div className="h-screen flex flex-col justify-center items-center gap-30">
            <div className="flex flex-col justify-center items-center gap-20">
                <button
                onClick={()=>setOption("Semanal")} 
                className="bg-white border border-black/20 w-38 h-15 text-black rounded-xl shadow-lg transition-all duration-200 cursor-pointer
                            hover:shadow-2xl hover:-translate-y-1 active:bg-gray-200 active:shadow-inner">Semanal</button>
                <button 
                onClick={()=>setOption("Mensual")}
                className="bg-white border border-black/20 w-38 h-15 text-black rounded-xl shadow-lg transition-all duration-200 cursor-pointer
                            hover:shadow-2xl hover:-translate-y-1 active:bg-gray-200 active:shadow-inner">Mensual</button>
            </div>

            {/* Boton volver */}
            <div className="flex flex-row-reverse gap-20">
                <button
                    onClick={backToForm}
                    className="bg-white border border-black/20 w-28 h-11 text-black rounded-xl shadow-lg transition-all duration-200 cursor-pointer
                        hover:shadow-2xl hover:-translate-y-1 active:bg-gray-200 active:shadow-inner">Volver</button>
            </div>
        </div>
    )
}
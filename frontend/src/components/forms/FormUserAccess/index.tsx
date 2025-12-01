import { WeeklySelector } from "./WeeklySelector"
import { MonthlySelector } from "./MonthlySelector"
import { useState } from "react"
import type { FormValues } from "../../../schemas/schemaForm"

interface props{
    backToForm:()=>void
    data:FormValues
}

export const FormUserAccess=({backToForm,data}:props)=>{

    const [option,setOption]=useState<"semanal"|"mensual"|null>(null)

    //En caso de elegir semanal, añadimos el valor del atributo en data
    if (option === "semanal") return <WeeklySelector data={{...data,accessType:"semanal"}} backToOptions={()=>setOption(null)}/>
    //En caso de elegir mensual, añadimos el valor del atributo en data
    if (option === "mensual") return <MonthlySelector data={{...data,accessType:"mensual"}} backToOptions={()=>setOption(null)}/>;

    return(
        <div className="h-screen flex flex-col justify-center items-center gap-30">
            
            {/* Titulo */}
            <div>
                <h1 className="text-3xl font-medium">Acceso del visitante</h1>
            </div>

            {/* Botones de mensual y semanal */}
            <div className="flex flex-col justify-center items-center gap-20">
                <button
                onClick={()=>setOption("semanal")} 
                className="bg-white border border-black/20 w-38 h-15 text-black rounded-xl shadow-lg transition-all duration-200
                            active:bg-gray-200 active:shadow-inner">Semanal</button>
                <button 
                onClick={()=>setOption("mensual")}
                className="bg-white border border-black/20 w-38 h-15 text-black rounded-xl shadow-lg transition-all duration-200
                            active:bg-gray-200 active:shadow-inner">Mensual</button>
            </div>

            {/* Boton volver */}
            <div className="flex flex-row-reverse gap-20">
                <button
                    onClick={backToForm}
                    className="bg-white border border-black/20 w-28 h-11 text-black rounded-xl shadow-lg transition-all duration-200
                        active:bg-gray-200 active:shadow-inner">Volver</button>
            </div>
        </div>
    )
}
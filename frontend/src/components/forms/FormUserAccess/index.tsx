import { WeeklySelector } from "./WeeklySelector"
import { MonthlySelector } from "./MonthlySelector"
import { useState } from "react"
import type { FormValues } from "../../../schemas/schemaForm"

interface props{
    backToForm:()=>void
    data:FormValues
}

export const FormUserAccess=({backToForm,data}:props)=>{

    const [option,setOption]=useState<"semanal"|"calendario"|null>(null)

    //En caso de elegir semanal, añadimos el valor del atributo en data
    if (option === "semanal") return <WeeklySelector data={{...data,accessType:"semanal"}} backToOptions={()=>setOption(null)}/>
    //En caso de elegir mensual, añadimos el valor del atributo en data
    if (option === "calendario") return <MonthlySelector data={{...data,accessType:"calendario"}} backToOptions={()=>setOption(null)}/>;

    return(
            <div className="flex flex-col items-center justify-around gap-10 bg-white h-screen">
            
                {/* Titulo */}
                <div>
                    <h1 className="text-3xl font-medium">Acceso del visitante</h1>
                </div>

                {/* Botones de mensual y semanal */}
                <div className="flex flex-col justify-center items-center gap-15 
                    shadow-[0_4px_10px_rgba(0,0,0,0.15),0_-4px_10px_rgba(0,0,0,0.15)] w-full p-10">
                    <button
                    onClick={()=>setOption("semanal")} 
                    className="bg-black w-34 h-11 text-white rounded-lg shadow-lg transition-all duration-200
                        active:bg-gray-200 active:shadow-inner">Semanal</button>
                    <button 
                    onClick={()=>setOption("calendario")}
                    className="bg-black w-34 h-11 text-white rounded-lg shadow-lg transition-all duration-200
                        active:bg-gray-200 active:shadow-inner">Calendario</button>
                </div>

                {/* Boton volver */}
                <div className="flex flex-row-reverse gap-20">
                    <button
                        onClick={backToForm}
                        className="bg-white border border-black/20 w-28 h-11 text-black rounded-lg shadow-lg transition-all duration-200
                            active:bg-gray-200 active:shadow-inner">Volver</button>
                </div>
            </div>    
    )
}
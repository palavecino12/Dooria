//Lo que tengo que hacer aca es recibir la data del usuario que obtenemos en el formUserCreate y sumarle la data de acceso que obtenemos aca
//Luego mandamos esa data a CamaraRegister para que junto al descriptor cree el usuario
import { useRef, useState } from "react";
import type { FormValues } from "../../../schemas/schemaForm";
import { CameraRegister } from "../../cameras/CameraRegister";

interface props{
    backToOptions:()=>void
    data:FormValues
}

export const WeeklySelector=({backToOptions,data}:props)=>{

    const containerRef=useRef<HTMLDivElement>(null);
    const [selectedDays, setSelectedDays] = useState<number[]>([]);
    const [showCameraRegister,setShowCameraRegister]=useState(false);


    const handleSubmitUser=()=>{
        if(!containerRef.current)return;
        //Obtenemos los dias seleccionados
        const checkedInputs = containerRef.current.querySelectorAll(
            'input[type="checkbox"]:checked'
        );
        //Los almacenamos en un array de tipo number
        const days = Array.from(checkedInputs).map(
            (input) => Number((input as HTMLInputElement).value)
        );
        setSelectedDays(days)
        //Renderizamos el componente CameraRegister
        setShowCameraRegister(true);
    }

    //Agregamos a date los dias que selecciono el usuario
    if(showCameraRegister)return<CameraRegister data={{...data,allowedDays:selectedDays}} backToForm={()=>setShowCameraRegister(false)}/>

    return(
        <div className="h-screen flex flex-col justify-center items-center gap-30">
            <h1 className="text-3xl font-medium">Semanal</h1>

            {/* Dias */}
            <div ref={containerRef} className="flex flex-col gap-6">

                <label>
                    <input type="checkbox" value="1" className="hidden peer" />
                    <div className="bg-white border border-black/20 w-50 h-11 text-black rounded-xl shadow-lg 
                        transition-all duration-200 flex justify-center items-center peer-checked:bg-gray-600 
                        peer-checked:shadow-inner peer-checked:text-white">
                        Lunes
                    </div>
                </label>

                <label>
                    <input type="checkbox" value="2" className="hidden peer" />
                    <div className="bg-white border border-black/20 w-50 h-11 text-black rounded-xl shadow-lg 
                        transition-all duration-200 flex justify-center items-center peer-checked:bg-gray-600 
                        peer-checked:shadow-inner peer-checked:text-white">
                        Martes
                    </div>
                </label>

                <label>
                    <input type="checkbox" value="3" className="hidden peer" />
                    <div className="bg-white border border-black/20 w-50 h-11 text-black rounded-xl shadow-lg 
                        transition-all duration-200 flex justify-center items-center peer-checked:bg-gray-600 
                        peer-checked:shadow-inner peer-checked:text-white">
                        Miercoles
                    </div>
                </label>

                <label>
                    <input type="checkbox" value="4" className="hidden peer" />
                    <div className="bg-white border border-black/20 w-50 h-11 text-black rounded-xl shadow-lg 
                        transition-all duration-200 flex justify-center items-center peer-checked:bg-gray-600 
                        peer-checked:shadow-inner peer-checked:text-white">
                        Jueves
                    </div>
                </label>

                <label>
                    <input type="checkbox" value="5" className="hidden peer" />
                    <div className="bg-white border border-black/20 w-50 h-11 text-black rounded-xl shadow-lg 
                        transition-all duration-200 flex justify-center items-center peer-checked:bg-gray-600 
                        peer-checked:shadow-inner peer-checked:text-white">
                        Viernes
                    </div>
                </label>

                <label>
                    <input type="checkbox" value="6" className="hidden peer" />
                    <div className="bg-white border border-black/20 w-50 h-11 text-black rounded-xl shadow-lg 
                        transition-all duration-200 flex justify-center items-center peer-checked:bg-gray-600 
                        peer-checked:shadow-inner peer-checked:text-white">
                        Sabado
                    </div>
                </label>

                <label>
                    <input type="checkbox" value="7" className="hidden peer" />
                    <div className="bg-white border border-black/20 w-50 h-11 text-black rounded-xl shadow-lg 
                        transition-all duration-200 flex justify-center items-center peer-checked:bg-gray-600 
                        peer-checked:shadow-inner peer-checked:text-white">
                        Domingo
                    </div>
                </label>


                
            </div>

            {/* Botones */}
            <div className="flex flex-row-reverse gap-20">
                <button
                    onClick={handleSubmitUser}
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
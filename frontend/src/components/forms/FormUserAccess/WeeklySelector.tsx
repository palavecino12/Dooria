//Lo que tengo que hacer aca es recibir la data del usuario que obtenemos en el formUserCreate y sumarle la data de acceso que obtenemos aca
//Luego mandamos esa data a CamaraRegister para que junto al descriptor cree el usuario
import { useRef, useState } from "react";
import type { FormValues } from "../../../schemas/schemaForm";
import { CameraRegister } from "../../cameras/CameraRegister";
import type { UserWithoutDescriptor } from "../../../types/userType";
import { useUpdateUser } from "../../../hooks/useUpdateUser";

interface props{
    backToOptions:()=>void
    data:FormValues
    initialValues?: UserWithoutDescriptor
    mode: "create" | "edit"
}

export const WeeklySelector=({initialValues,backToOptions,data,mode}:props)=>{

    const containerRef=useRef<HTMLDivElement>(null);
    const [selectedDays, setSelectedDays] = useState<number[]>([]);
    const [showCameraRegister,setShowCameraRegister]=useState(false);

    const {userUpdate} = useUpdateUser() //Luego tengo que usar el resto de estados

    const handleConfirm=()=>{
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
        if (mode==="edit"){
            if(!initialValues)return
            console.log("hola") //hasta aca si llega
            userUpdate(initialValues._id,initialValues)
            //Luego tengo que navegar al inicio y creo que colocar la pantalla de success antes
        } else{
            setShowCameraRegister(true);//Renderizamos el componente CameraRegister
        }
    }

    //Agregamos a date los dias que selecciono el usuario
    if(showCameraRegister)return<CameraRegister data={{...data,allowedDays:selectedDays}} backToForm={()=>setShowCameraRegister(false)}/>

    return(
        
            <div className="flex flex-col items-center justify-around gap-10 bg-white h-screen">

                {/* Titulo */}
                <h1 className="text-3xl font-medium">Semanal</h1>

                {/* Dias */}
                <div ref={containerRef} className="flex flex-col items-center gap-6 border-t border-b border-gray-400 
                                        shadow-[0_4px_10px_rgba(0,0,0,0.15),0_-4px_10px_rgba(0,0,0,0.15)] w-full p-10">

                    <label>
                        <input defaultChecked={initialValues?.allowedDays?.includes(1)} type="checkbox" value="1" className="hidden peer" />
                        <div className="bg-white border border-black/20 w-50 h-11 text-black rounded-lg shadow-lg 
                            transition-all duration-200 flex justify-center items-center peer-checked:bg-black 
                            peer-checked:shadow-inner peer-checked:text-white">
                            Lunes
                        </div>
                    </label>

                    <label>
                        <input defaultChecked={initialValues?.allowedDays?.includes(2)} type="checkbox" value="2" className="hidden peer" />
                        <div className="bg-white border border-black/20 w-50 h-11 text-black rounded-lg shadow-lg 
                            transition-all duration-200 flex justify-center items-center peer-checked:bg-black 
                            peer-checked:shadow-inner peer-checked:text-white">
                            Martes
                        </div>
                    </label>

                    <label>
                        <input defaultChecked={initialValues?.allowedDays?.includes(3)} type="checkbox" value="3" className="hidden peer" />
                        <div className="bg-white border border-black/20 w-50 h-11 text-black rounded-lg shadow-lg 
                            transition-all duration-200 flex justify-center items-center peer-checked:bg-black 
                            peer-checked:shadow-inner peer-checked:text-white">
                            Miercoles
                        </div>
                    </label>

                    <label>
                        <input defaultChecked={initialValues?.allowedDays?.includes(4)} type="checkbox" value="4" className="hidden peer" />
                        <div className="bg-white border border-black/20 w-50 h-11 text-black rounded-lg shadow-lg 
                            transition-all duration-200 flex justify-center items-center peer-checked:bg-black 
                            peer-checked:shadow-inner peer-checked:text-white">
                            Jueves
                        </div>
                    </label>

                    <label>
                        <input defaultChecked={initialValues?.allowedDays?.includes(5)} type="checkbox" value="5" className="hidden peer" />
                        <div className="bg-white border border-black/20 w-50 h-11 text-black rounded-lg shadow-lg 
                            transition-all duration-200 flex justify-center items-center peer-checked:bg-black 
                            peer-checked:shadow-inner peer-checked:text-white">
                            Viernes
                        </div>
                    </label>

                    <label>
                        <input defaultChecked={initialValues?.allowedDays?.includes(6)} type="checkbox" value="6" className="hidden peer" />
                        <div className="bg-white border border-black/20 w-50 h-11 text-black rounded-lg shadow-lg 
                            transition-all duration-200 flex justify-center items-center peer-checked:bg-black
                            peer-checked:shadow-inner peer-checked:text-white">
                            Sabado
                        </div>
                    </label>

                    <label>
                        <input defaultChecked={initialValues?.allowedDays?.includes(0)} type="checkbox" value="0" className="hidden peer" />
                        <div className="bg-white border border-black/20 w-50 h-11 text-black rounded-lg shadow-lg 
                            transition-all duration-200 flex justify-center items-center peer-checked:bg-black 
                            peer-checked:shadow-inner peer-checked:text-white">
                            Domingo
                        </div>
                    </label>

                </div>

                {/* Botones */}
                <div className="flex flex-row-reverse gap-10">
                    <button
                        onClick={handleConfirm}
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
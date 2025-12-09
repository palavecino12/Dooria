//Formulario reutilizable para que se pueda usar al editar un usuario y al crearlo
//Aqui solo vamos a renderizar los componentes y validar los datos, la logica de ejecucion(crear o editar usuario) se lo dejamos a "onSubmit"
import { useForm, type SubmitHandler } from "react-hook-form"
import { type FormValues,schema } from "../../../schemas/schemaForm"
import { zodResolver } from "@hookform/resolvers/zod"
import InputForm from "./InputFormUser"

interface props{
    title:string
    initialValues?:Partial<FormValues>//Si esta variable llega vacia, se crea un usuario con los datos que ingrese. Si llega con datos, es para editar 
    onSubmit:(data:FormValues)=>void//onSubumit va a ser la funcion de crear el usuario o editarlo
    buttonText:string
    closeForm:()=>void
}

export const FormUser=({title,initialValues,buttonText,onSubmit,closeForm}:props)=>{

    //Validamos los datos del usuario
    const {control,handleSubmit,formState:{errors},setError}=useForm<FormValues>({
        resolver:zodResolver(schema),
        defaultValues:{
            rol: initialValues?.rol ?? "local",
            ...initialValues
        }//Los inputs apareceran rellenados con estos datos, asi el usuario los puede editar, si llega vacia los inputs estaran vacios para que los rellene el usuario
    })

    //Creamos el metodo que se va a ejecutar si todos los campos son validos
    const handleFormSubmit:SubmitHandler<FormValues>= async (data)=>{

        try {
            await onSubmit(data)//Ejecutamos la funcion que recibimos por parametro (en este caso manda data a otro componente)
        } catch (error) {
            //Error general al crear un usuario
            setError("root",{type:"network",message:"Error al crear el usuario"})
            console.log(error)
        }
    }

        return (
            <div className="flex flex-col items-center justify-center gap-10 bg-white h-screen">

                {/* Titulo */}
                <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">{title}</h1>

                {/* Formulario */}
                <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full bg-white flex flex-col items-center gap-10">
                    <div className={`flex flex-col items-center ${Object.keys(errors).length > 0 ? 'gap-1' : 'gap-6'}
                        shadow-[0_4px_10px_rgba(0,0,0,0.15),0_-4px_10px_rgba(0,0,0,0.15)] w-full p-10`}>
                        <InputForm name='name' label='Nombre' control={control} type='text' error={errors.name} />
                        <InputForm name='lastName' label='Apellido' control={control} type='text' error={errors.lastName} />
                        <InputForm name='dni' label='DNI' control={control} type='string' error={errors.dni} />
                        <InputForm name='number' label='Numero de telefono' control={control} type='text' error={errors.number} />
                        <InputForm name='address' label='Direccion' control={control} type='text' error={errors.address} />
                        <InputForm name='rol' label='Rol' control={control} type='select' options={["local","visitante"]} error={errors.address} />
                    </div>
                    <div className="flex flex-row-reverse gap-10">
                        <button className="bg-black w-28 h-11 text-white rounded-lg shadow-lg transition-all duration-200
                                active:bg-gray-200 active:shadow-inner" 
                            type="submit">{buttonText}</button>
                        <button className="bg-white border border-black/20 w-28 h-11 text-black rounded-lg shadow-lg transition-all duration-200
                                    active:bg-gray-200 active:shadow-inner" 
                            type="button" onClick={closeForm}>Cancelar</button>
                        </div>
                
                    {errors.root && <p className='message-error'>{errors.root.message}</p> }
                </form>
            </div>
    )

}
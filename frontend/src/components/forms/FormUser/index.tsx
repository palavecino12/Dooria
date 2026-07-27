//Formulario reutilizable para que se pueda usar al editar un usuario y al crearlo
//Aca solo vamos a renderizar los componentes y validar los datos, la logica de ejecucion(crear o editar usuario) se lo dejamos a "onSubmit"
import { useForm, type SubmitHandler } from "react-hook-form"
import { type FormValues, schema } from "../../../schemas/schemaForm"
import { zodResolver } from "@hookform/resolvers/zod"
import InputForm from "./InputFormUser"
import { Header } from "../../common/Header"
import { Button } from "../../common/Button"
import { useUsers } from "../../../hooks/useUsers"

interface props {
    title: string
    initialValues?: Partial<FormValues>//Si esta variable llega vacia, se crea un usuario con los datos que ingrese. Si llega con datos, es para editar 
    onSubmit: (data: FormValues) => void//onSubumit va a ser la funcion de crear el usuario o editarlo
    closeForm: () => void
    currentUserId?: string
}

export const FormUser = ({ title, initialValues, onSubmit, closeForm, currentUserId }: props) => {

    const { users } = useUsers()

    //Validamos los datos del usuario
    const { control, handleSubmit, formState: { errors }, setError, watch } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            lastName: "",
            dni: "",
            number: "",
            address: "",
            rol: "Local",
            allowedDays: [],
            allowedDates: [],
            ...initialValues,
        }//Los inputs apareceran rellenados con estos datos, asi el usuario los puede editar, si llega vacia los inputs estaran vacios para que los rellene el usuario
    })

    //Esto es solamente para cambiar el texto del boton, ya que debe decir distintas cosas dependiendo del rol del usuario
    const rol = watch("rol")

    //Creamos el metodo que se va a ejecutar si todos los campos son validos
    const handleFormSubmit: SubmitHandler<FormValues> = async (data) => {
        //Validamos que el DNI no pertenezca a otro usuario (excluyendo al que estamos editando)
        const dniDuplicado = users.some(
            (u) => u.dni === data.dni && u._id !== currentUserId
        )

        if (dniDuplicado) {
            setError("dni", { type: "manual", message: "Ya existe un usuario con este DNI" })
            return //Cortamos acá, no dejamos continuar.
        }
        
        try {
            await onSubmit(data)//Ejecutamos la funcion que recibimos por parametro (en este caso manda data a otro componente)
        } catch (error) {
            //Error general al crear o editar un usuario.
            const message = error instanceof Error ? error.message : "Error al crear el usuario";
            setError("root", { type: "server", message });
        }
    }

    return (
        <div className="flex h-dvh flex-col items-center gap-6 bg-gray-200">

            <Header title={title} />

            {/* Formulario */}
            <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full bg-gray-200 flex flex-col items-center gap-5">
                <div className={`flex flex-col items-center bg-white ${Object.keys(errors).length > 0 ? 'gap-1' : 'gap-3'}
                        shadow-[0_4px_10px_rgba(0,0,0,0.15),0_-4px_10px_rgba(0,0,0,0.15)] w-full px-10 py-5`}>
                    <InputForm name='name' label='Nombre' control={control} type='text' error={errors.name} />
                    <InputForm name='lastName' label='Apellido' control={control} type='text' error={errors.lastName} />
                    <InputForm name='dni' label='DNI' control={control} type='string' error={errors.dni} />
                    <InputForm name='number' label='Numero de telefono' control={control} type='text' error={errors.number} />
                    <InputForm name='address' label='Direccion' control={control} type='text' error={errors.address} />
                    <InputForm name='rol' label='Rol' control={control} type='select' options={["Local", "Visitante"]} error={errors.rol} />
                </div>

                {/* Botones */}
                <div className="flex flex-row gap-10 bg-gray-200">
                    <Button variant="secundario" onClick={closeForm}>Cancelar</Button>
                    <Button type="submit">{rol === "Local" ? "Confirmar" : "Siguiente"}</Button>
                </div>

                {errors.root && <p className='message-error'>{errors.root.message}</p>}
            </form>
        </div>
    )

}
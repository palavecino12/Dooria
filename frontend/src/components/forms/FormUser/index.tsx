import { useForm, type SubmitHandler } from "react-hook-form"
import { type FormValues, schema } from "../../../schemas/schemaForm"
import { zodResolver } from "@hookform/resolvers/zod"
import InputForm from "./InputFormUser"
import { Header } from "../../common/Header"
import { Button } from "../../common/Button"
import { useUsers } from "../../../hooks/useUsers"

interface props {
    title: string
    initialValues?: Partial<FormValues>
    onSubmit: (data: FormValues) => void
    closeForm: () => void
    currentUserId?: string
}

export const FormUser = ({ title, initialValues, onSubmit, closeForm, currentUserId }: props) => {

    const { users } = useUsers()

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
        }
    })

    const rol = watch("rol")

    const handleFormSubmit: SubmitHandler<FormValues> = async (data) => {
        const dniDuplicado = users.some(
            (u) => u.dni === data.dni && u._id !== currentUserId
        )

        if (dniDuplicado) {
            setError("dni", { type: "manual", message: "Ya existe un usuario con este DNI" })
            return
        }
        
        try {
            await onSubmit(data)
        } catch (error) {
            const message = error instanceof Error ? error.message : "Error al crear el usuario";
            setError("root", { type: "server", message });
        }
    }

    return (
        <div className="w-full h-full flex flex-col">

            <Header title={title} />

            {/* Contenedor principal con scroll suave */}
            <main className="flex-1 flex flex-col items-center p-4 overflow-y-auto w-full max-w-md mx-auto">
                
                <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full flex flex-col gap-6">
                    
                    {/* Tarjeta contenedora de inputs */}
                    <div className="bg-white rounded-3xl p-7 shadow-md flex flex-col gap-3.5 border border-gray-100">
                        <InputForm name='name' label='Nombre' control={control} type='text' error={errors.name} />
                        <InputForm name='lastName' label='Apellido' control={control} type='text' error={errors.lastName} />
                        <InputForm name='dni' label='DNI' control={control} type='string' error={errors.dni} />
                        <InputForm name='number' label='Número de teléfono' control={control} type='text' error={errors.number} />
                        <InputForm name='address' label='Dirección' control={control} type='text' error={errors.address} />
                        <InputForm name='rol' label='Rol' control={control} type='select' options={["Local", "Visitante"]} error={errors.rol} />
                    </div>

                    {errors.root && (
                        <p className="text-sm font-medium text-red-600 text-center bg-red-50 p-2.5 rounded-xl border border-red-200">
                            {errors.root.message}
                        </p>
                    )}

                    {/* Botones de acción */}
                    <div className="flex items-center justify-center gap-3 w-full">
                        <Button variant="secundario" onClick={closeForm} className="flex-1 py-3">
                            Cancelar
                        </Button>
                        <Button type="submit" className="flex-1 py-3">
                            {rol === "Local" ? "Confirmar" : "Siguiente"}
                        </Button>
                    </div>

                </form>

            </main>
        </div>
    )
}
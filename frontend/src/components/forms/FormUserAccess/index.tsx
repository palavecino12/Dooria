import { WeeklySelector } from "./WeeklySelector"
import { MonthlySelector } from "./MonthlySelector"
import { useState } from "react"
import type { FormValues } from "../../../schemas/schemaForm"
import type { UserWithoutDescriptor } from "../../../types/userType"
import { useUpdateUser } from "../../../hooks/useUpdateUser"
import { CameraRegister } from "../../cameras/CameraRegister"
import { Header } from "../../common/Header"
import { Button } from "../../common/Button"
import { Loading } from "../../feedback/Loading"
import { useToast } from "../../../hooks/useToast"
import { useNavigate } from "react-router-dom"
import { useUsers } from "../../../hooks/useUsers"

interface props {
    backToForm: () => void
    data: FormValues
    initialValue?: UserWithoutDescriptor
}

export const FormUserAccess = ({ initialValue, backToForm, data }: props) => {

    const navigate = useNavigate()
    const { refresh } = useUsers()

    const { userUpdate, loading } = useUpdateUser()
    const { showToast } = useToast()//Toas que nos da feedback

    const [option, setOption] = useState<"semanal" | "calendario" | null>("semanal")
    const [showCameraRegister, setShowCameraRegister] = useState(false);
    const [selectedMonths, setSelectedMonths] = useState<Date[]>(initialValue?.allowedDates?.map(d => new Date(d)) ?? []);
    const [selectedDays, setSelectedDays] = useState<number[]>(initialValue?.allowedDays ?? []);

    //Al momento que seleccionamos un dia, lo quitamos si ya estaba selecciondo y lo agregamos si no lo estaba 
    const toggleDay = (value: number) => {
        setSelectedDays(prev =>
            prev.includes(value)
                ? prev.filter(d => d !== value)
                : [...prev, value]
        );
    };

    //Al confirmar añadimos a date los campos seleccionados de la semana y del calendario
    const handleConfirm = async () => {
        if (initialValue) {
            try {

                const message = await userUpdate(initialValue._id, { ...data, allowedDates: selectedMonths.map(d => d.toISOString()), allowedDays: selectedDays })
                await refresh()
                showToast({ message: message, variant: "success" })
                navigate("/mobile/users");

            } catch (error) {
                showToast({
                    variant: "error",
                    message:
                        error instanceof Error
                            ? error.message
                            : "Error desconocido",
                });
            }
        } else {
            setShowCameraRegister(true)
        }
    }

    //Agregamos a date los dias y/o fechas que selecciono el usuario (convertimos selectDays en un array de string)
    if (showCameraRegister) return <CameraRegister data={{ ...data, allowedDates: selectedMonths.map(d => d.toISOString()), allowedDays: selectedDays }} backToForm={() => setShowCameraRegister(false)} />
    return (
        <>
            {/* Pantalla loading, esta dentro para que se vea sobre la interfaz */}
            {loading && <Loading />}

            <div className="flex h-dvh flex-col bg-gray-200">

                <Header title="Acceso del Visitante" />

                <main className="flex flex-col flex-1">
                    {/* Botones de mensual y semanal */}
                    <div className="flex justify-center py-6">
                        <button
                            onClick={() => setOption("semanal")}
                            className={`w-34 h-11 rounded-tl-lg rounded-bl-lg shadow-lg transition-all duration-100
                        ${option === "semanal"
                                    ? "bg-black text-white"
                                    : "bg-white text-black border border-black/20"
                                } active:scale-95 active:shadow-inner`}>Semanal
                        </button>
                        <button
                            onClick={() => setOption("calendario")}
                            className={`w-34 h-11 rounded-tr-lg rounded-br-lg shadow-lg transition-all duration-100
                        ${option === "calendario"
                                    ? "bg-black text-white"
                                    : "bg-white text-black border border-black/20"
                                } active:scale-95 active:shadow-inner`}>Calendario
                        </button>
                    </div>

                    {/* Componente mensual y semanal */}
                    <div className="flex-1 flex items-center justify-center">
                        <div className="bg-white flex justify-center w-full p-4
                    shadow-[0_4px_10px_rgba(0,0,0,0.15),0_-4px_10px_rgba(0,0,0,0.15)]">

                            {option === "semanal" && (<WeeklySelector selectedDays={selectedDays} toggleDay={toggleDay} />)}
                            {option === "calendario" && (<MonthlySelector selectedMonths={selectedMonths} setSelectedMonths={setSelectedMonths} />)}

                        </div>
                    </div>

                    {/* Boton aceptr y volver */}
                    <div className="flex justify-center gap-10 py-6">
                        <Button variant="secundario" onClick={backToForm}>
                            Volver
                        </Button>
                        <Button onClick={handleConfirm}>
                            {initialValue ? "Confirmar" : "Siguiente"}
                        </Button>
                    </div>
                </main>
            </div>
        </>

    )
}
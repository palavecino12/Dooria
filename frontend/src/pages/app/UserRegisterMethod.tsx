import { useNavigate } from "react-router-dom"
import { Button } from "../../components/common/Button"

export const UserRegisterMethod = () => {
    const navigate = useNavigate()

    return (
        <div className="h-dvh flex flex-col justify-center items-center px-6">

            <div className="w-full max-w-md flex flex-col gap-8">

                <div className="text-center mb-2">
                    <h1 className="text-2xl font-semibold">
                        Agregar persona
                    </h1>

                    <p className="text-gray-600 mt-2">
                        Elegí cómo querés realizar el registro.
                    </p>
                </div>

                {/* Registro presencial */}
                <div className="flex items-center flex-col gap-3">
                    <Button onClick={() => navigate("/app/register/direct")}>
                        Registro presencial
                    </Button>

                    <p className="text-sm text-gray-600 text-center px-4">
                        Completá todo el registro desde este dispositivo:
                        datos personales, días de acceso y escaneo del rostro.
                    </p>
                </div>

                {/* Registro remoto */}
                <div className="flex items-center flex-col gap-3">
                    <Button onClick={() => navigate("/app/register/remote")}>
                        Registro remoto
                    </Button>

                    <p className="text-sm text-gray-600 text-center px-4">
                        Enviá una invitación para que la persona complete
                        sus datos y escanee su rostro desde su propio dispositivo.
                        Luego podrás verificar su identidad y configurar sus días de acceso.
                    </p>
                </div>

            </div>
        </div>
    )
}
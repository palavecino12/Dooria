import { useNavigate } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { Header } from "../../components/common/Header";

export const UserRegisterMethod = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-full flex flex-col">

            {/* Header */}
            <Header title="Agregar Persona" />

            <p className="text-gray-600 mt-7 text-center">
                Elegí cómo querés realizar el registro.
            </p>

            {/* Contenido */}
            <main className="flex-1 flex flex-col items-center justify-center px-6">

                <div className="w-full flex flex-col gap-12">

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

            </main>
        </div>
    );
};
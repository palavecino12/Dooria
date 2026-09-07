import { useNavigate } from "react-router-dom";
import { Header } from "../../components/common/Header";
import { UserCheck, Send, ChevronRight } from "lucide-react";

export const UserRegisterMethod = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-full flex flex-col">

            {/* Header */}
            <Header title="Agregar Persona" />

            {/* Contenido */}
            <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-6">

                <p className="text-gray-700 font-medium text-center mb-6">
                    Elegí cómo querés realizar el registro.
                </p>

                <div className="w-full max-w-md flex flex-col gap-4">

                    {/* Registro presencial */}
                    <button 
                        onClick={() => navigate("/app/register/direct")}
                        className="w-full bg-white p-4 rounded-2xl shadow-md text-left transition-all duration-200 
                                active:scale-[0.98] hover:shadow-lg border border-transparent hover:border-gray-200
                                flex items-center gap-4 group"
                    >
                        <div className="bg-gray-100 p-3 rounded-xl text-[#2c2c28] group-hover:bg-[#2c2c28] group-hover:text-white transition-colors shrink-0">
                            <UserCheck size={26} />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-[#2c2c28] text-base sm:text-lg mb-1">
                                Registro presencial
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 leading-snug">
                                Completá todo el registro desde este dispositivo: datos personales, días de acceso y escaneo del rostro.
                            </p>
                        </div>

                        <ChevronRight className="text-gray-400 group-hover:translate-x-1 transition-transform shrink-0" size={20} />
                    </button>

                    {/* Registro remoto */}
                    <button 
                        onClick={() => navigate("/app/register/remote")}
                        className="w-full bg-white p-4 rounded-2xl shadow-md text-left transition-all duration-200 
                                active:scale-[0.98] hover:shadow-lg border border-transparent hover:border-gray-200
                                flex items-center gap-4 group"
                    >
                        <div className="bg-gray-100 p-3 rounded-xl text-[#2c2c28] group-hover:bg-[#2c2c28] group-hover:text-white transition-colors shrink-0">
                            <Send size={26} />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-[#2c2c28] text-base sm:text-lg mb-1">
                                Registro remoto
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 leading-snug">
                                Enviá una invitación para que la persona complete sus datos y escanee su rostro desde su propio dispositivo. Luego podrás verificar su identidad y configurar sus días de acceso.
                            </p>
                        </div>

                        <ChevronRight className="text-gray-400 group-hover:translate-x-1 transition-transform shrink-0" size={20} />
                    </button>

                </div>

            </main>
        </div>
    );
};
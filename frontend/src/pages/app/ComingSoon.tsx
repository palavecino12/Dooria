import { useNavigate } from "react-router-dom"
import { Button } from "../../components/common/Button"

export const ComingSoon = () => {
    const navigate = useNavigate()
    return (
        <div className="h-dvh bg-[#e9ecf2] flex items-center justify-center px-6">
            <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center">

                <div className="text-5xl mb-5">
                    🚧
                </div>

                <h1 className="text-xl font-semibold mb-3">
                    Estamos trabajando en esta función
                </h1>

                <p className="text-gray-600 text-sm leading-relaxed mb-7">
                    El registro remoto estará disponible próximamente.
                </p>

                <Button onClick={() => navigate(-1)}>
                    Volver
                </Button>

            </div>
        </div>
    )
}
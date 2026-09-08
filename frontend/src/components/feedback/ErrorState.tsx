//Este componente muestra un mensaje de error dentro de la lista de usuarios.
import { CircleX } from "lucide-react"

interface ErrorStateProps {
    message?: string
}

export const ErrorState = ({ message = "Lo sentimos, hubo un error" }: ErrorStateProps) => {
    return (

        <div className="flex flex-col items-center justify-center gap-3">
            <CircleX color="white" size={98} strokeWidth={5.5} absoluteStrokeWidth />
            <p className="text-lg font-medium text-white">
                {message}
            </p>
        </div>
    );
};
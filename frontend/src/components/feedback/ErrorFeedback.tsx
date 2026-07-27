import { CircleX } from "lucide-react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

interface ErrorProps {
    message?: string
}

export const ErrorFeedback = ({ message = "Ups..." }: ErrorProps) => {

    const navigate = useNavigate()

    return (
        <motion.div
            className="h-dvh flex flex-col justify-center items-center gap-3"
            initial={{ backgroundColor: "#ffffff" }}
            animate={{ backgroundColor: "#b91c1c" }}
            transition={{ duration: 0.6, delay: 0.8 }}
        >
            <motion.div
                initial={{ y: 300, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "circInOut" }}
            >
                <motion.div
                    initial={{ color: "#b91c1c" }}
                    animate={{ color: "#ffffff" }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    <CircleX size={126} strokeWidth={7.5}absoluteStrokeWidth/>
                    
                </motion.div>
            </motion.div>

            <h1 className="text-white w-full text-center text-2xl font-bold mt-6">{message}</h1>
            <p className="text-white">Lo sentimos, algo salio mal</p>
            {/* Boton con animacion para que aparezca todo a la vez */}
            <motion.button
                onClick={() => navigate("/app")}
                className="mt-16 flex h-11 w-40 items-center justify-center rounded-lg text-lg
                text-[#b91c1c] font-medium shadow-lg bg-white transition-all duration-150
                active:scale-95 select-none"
                initial={{ opacity: 0, visibility: "hidden" }}
                animate={{ opacity: 1, visibility: "visible" }}
                transition={{ delay: 0.9, duration: 0.3 }}
            >
                Inicio
            </motion.button>
        </motion.div>
    )
}

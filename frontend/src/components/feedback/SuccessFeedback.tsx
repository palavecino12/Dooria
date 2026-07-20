import { CircleCheck } from "lucide-react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

interface SuccessProps {
    message?: string
}

export const SuccessFeedback = ({ message = "Operacion exitosa!" }: SuccessProps) => {

    const navigate = useNavigate()

    return (
        <motion.div
            className="h-dvh flex flex-col justify-center items-center gap-6"
            initial={{ backgroundColor: "#ffffff" }}
            animate={{ backgroundColor: "#15803d" }}
            transition={{ duration: 0.6, delay: 0.8 }}
        >
            <motion.div
                initial={{ y: 300, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "circInOut" }}
            >
                <motion.div
                    initial={{ color: "#15803d" }}
                    animate={{ color: "#ffffff" }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    <CircleCheck size={126} strokeWidth={7.5} absoluteStrokeWidth/>
                    
                </motion.div>
            </motion.div>
            <p className="text-white w-full text-center text-2xl font-bold">{message}</p>
            {/* Boton con animacion para que aparezca todo a la vez */}
            <motion.button
                onClick={() => navigate("/mobile")}
                className="mt-16 flex h-11 w-40 items-center justify-center rounded-lg text-lg
                text-[#15803d] font-medium shadow-lg bg-white transition-all duration-150
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

import { CircleX } from "lucide-react"
import { motion } from "framer-motion"

export const Error = () => {
    return (
        <motion.div
            className="h-screen flex flex-col justify-center items-center gap-6"
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
                    <CircleX
                        size={196}
                        strokeWidth={7.5}
                        absoluteStrokeWidth
                    />
                </motion.div>
            </motion.div>
            <p className="text-white w-full text-center text-2xl font-bold">Error al crear usuario</p>
        </motion.div>
    )
}

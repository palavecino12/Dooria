import { Loader } from "lucide-react"
import { motion } from "framer-motion"
import { createPortal } from "react-dom";

interface LoadingProps {
    message?: string
}

export const Loading = ({message = "Procesando..."}: LoadingProps) => {

    const modalRoot = document.getElementById("modal");

    if (!modalRoot) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="flex h-60 w-60 flex-col items-center justify-center gap-6 rounded-2xl bg-white shadow-2xl">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    <Loader
                        size={80}
                        strokeWidth={2}
                        className="text-black"
                    />
                </motion.div>

                <p className="text-lg font-medium">
                    {message}
                </p>
            </div>
        </div>
    ,modalRoot)
}
import { LoaderCircle } from "lucide-react"
import { motion } from "framer-motion"

interface LoadingProps {
    message?: string
}

export const Loading = ({message = "Procesando..."}: LoadingProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="flex h-60 w-60 flex-col items-center justify-center gap-6 rounded-2xl bg-white shadow-2xl">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    <LoaderCircle
                        size={80}
                        strokeWidth={3}
                        className="text-black"
                    />
                </motion.div>

                <p className="text-lg font-medium text-gray-700">
                    {message}
                </p>
            </div>
        </div>
    )
}
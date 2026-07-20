import { Loader } from "lucide-react";
import { motion } from "framer-motion";

interface SpinnerProps {
    message?: string
}

export const Spinner = ({ message = "Procesando..." }: SpinnerProps) => {
    return (

        <div className="flex flex-col items-center justify-center gap-6">
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
    );
};
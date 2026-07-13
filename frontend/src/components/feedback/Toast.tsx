//Este va a ser un componente de notificacion (toast) en caso de exito o error al momento de eliminar un usuario
//Se usa una notificacion para no molestar al usuario en toda la pantalla por si quiere hacer otro operacion
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CircleCheck, CircleX } from "lucide-react";

interface ToastProps {
    open: boolean;
    variant: "success" | "error";
    message: string;
    onClose: () => void;
}

export const Toast = ({ open, variant, message, onClose, }: ToastProps) => {

    const modalRoot = document.getElementById("modal");

    useEffect(() => {
        if (!open) return;

        const timer = setTimeout(() => {
            onClose();
        }, 2000)

        return () => clearTimeout(timer);
    }, [open, onClose]);

    if (!modalRoot) return null;

    return createPortal(
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 20, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-xs fixed left-1/2 top-0 z-50 -translate-x-1/2"
                >
                    <div
                        className={`flex items-center justify-center gap-3 rounded-xl px-5 py-3 shadow-xl text-white 
                        ${variant === "success"
                                ? "bg-[#15803d]"
                                : "bg-[#b91c1c]"
                            }`}
                    >
                        {variant === "success" ? (
                            <CircleCheck size={30} />
                        ) : (
                            <CircleX size={30} />
                        )}

                        <p className="font-medium">
                            {message}
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        modalRoot
    );
};
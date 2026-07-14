import { useState } from "react";
import { Toast } from "../../components/feedback/Toast";
import { ToastContext, type ToastData } from "./ToastContext";

interface Props {
    children: React.ReactNode;
}

interface ToastState extends ToastData {
    open: boolean;
}

export const ToastProvider = ({ children }: Props) => {

    const [toast, setToast] = useState<ToastState>({
        open: false,
        variant: "success",
        message: "",
    });

    const showToast = ({ variant, message }: ToastData) => {
        setToast({
            open: true,
            variant,
            message,
        });
    };

    return (
        <ToastContext.Provider value={{ showToast }}>

            {children}

            <Toast
                open={toast.open}
                variant={toast.variant}
                message={toast.message}
                onClose={() =>
                    setToast(prev => ({
                        ...prev,
                        open: false,
                    }))
                }
            />

        </ToastContext.Provider>
    );
};
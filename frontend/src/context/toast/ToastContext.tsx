import { createContext } from "react";

export type ToastVariant = "success" | "error";

export interface ToastData {
    variant: ToastVariant;
    message: string;
}

export interface ToastContextType {
    showToast: (toast: ToastData) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);
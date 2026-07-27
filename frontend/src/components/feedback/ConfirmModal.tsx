import React from 'react';
import { Button } from '../common/Button';
import { createPortal } from 'react-dom';
import { TriangleAlert } from 'lucide-react';

interface ConfirmModalProps {
    open: boolean;
    children: React.ReactNode;
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmModal = ({ open, children, onConfirm, onCancel, }: ConfirmModalProps) => {

    const modalRoot = document.getElementById("modal");

    if (!open || !modalRoot) return null;

    return createPortal(
        <div className="h-dvh fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            {/* Contenedor del modal */}
            <div className="rounded-lg bg-white p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200 
            flex flex-col justify-center items-center">

                {/* Icono de advertencia */}
                <TriangleAlert size={66} color='#b9911c' />

                {/* Contenido dinámico (children) */}
                <div className="mb-10 mt-5 text-center text-lg">
                    {children}
                </div>

                {/* Botones de acción */}
                <div className="flex justify-center gap-7">
                    <Button variant='secundario' onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button onClick={onConfirm}>
                        Confirmar
                    </Button>
                </div>

            </div>
        </div>
        , modalRoot);
};
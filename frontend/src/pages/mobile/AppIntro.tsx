import { motion } from "framer-motion";
import { useEffect } from "react";

interface AppIntroProps {
    onFinish: () => void;
}

export const AppIntro = ({ onFinish }: AppIntroProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish();
        }, 2600);

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{
                delay: 1.8,
                duration: 0.8,
                ease: [0.8, 0, 0.2, 1],
            }}
            className="fixed inset-0 z-50 flex h-dvh w-full items-center justify-center bg-black"
        >
            <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 1.2,
                    ease: "easeOut",
                }}
                className="select-none text-5xl font-bold tracking-[0.18em] text-white"
            >
                Dooria
            </motion.h1>
        </motion.div>
    );
};
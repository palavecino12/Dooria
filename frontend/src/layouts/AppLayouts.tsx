import { Outlet, useLocation } from "react-router-dom";
import { NavBar } from "../components/common/NavBat";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";

const routes = [
    "/app/users",
    "/app/register",
    "/app/intercom",
];

export const AppLayout = () => {
    const location = useLocation();
    const previousIndex = useRef(0);

    const currentIndex = routes.indexOf(location.pathname);

    const direction = currentIndex > previousIndex.current ? 1 : -1;

    previousIndex.current = currentIndex;

    return (
        <div className="h-dvh flex flex-col overflow-hidden">

            <main className="flex-1 min-h-0 relative overflow-hidden">

                <AnimatePresence
                    mode="sync"
                    custom={direction}
                >
                    <motion.div
                        key={location.pathname}
                        custom={direction}
                        className="absolute inset-0"
                        variants={{
                            initial: (direction: number) => ({
                                x: direction * 100 + "%",
                                opacity: 0,
                            }),

                            animate: {
                                x: "0%",
                                opacity: 1,
                            },

                            exit: (direction: number) => ({
                                x: direction * -100 + "%",
                                opacity: 0,
                            }),
                        }}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{
                            duration: 0.1,
                            ease: "easeOut",
                        }}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>

            </main>

            <NavBar />

        </div>
    );
};
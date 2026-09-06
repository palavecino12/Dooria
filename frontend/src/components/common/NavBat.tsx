import { NavLink } from "react-router-dom";
import { UsersRound, UserRoundPlus, Video } from "lucide-react";
import { motion } from "framer-motion";

export const NavBar = () => {
    return (
        <nav className="w-full flex justify-center pb-4">
            <div className="flex items-center gap-2 p-1.5 px-3 rounded-2xl bg-black/95 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm">

                {/* Usuarios */}
                <NavLink
                    to="/app/users"
                    className="relative p-2.5 px-5 rounded-xl transition-colors duration-200 hover:bg-white/10"
                >
                    {({ isActive }) => (
                        <>
                            {isActive && (
                                <motion.div
                                    layoutId="active-navbar"
                                    className="absolute inset-0 rounded-xl bg-white shadow-[0_0_20px_rgba(255,255,255,0.12)]"
                                    transition={{
                                        type: "spring",
                                        stiffness: 600,
                                        damping: 30,
                                    }}
                                />
                            )}

                            <motion.div
                                animate={{
                                    scale: isActive ? 1.05 : 1,
                                }}
                                transition={{
                                    duration: 0.2,
                                }}
                                className="relative z-10"
                            >
                                <UsersRound
                                    size={26}
                                    color={isActive ? "black" : "white"}
                                />
                            </motion.div>
                        </>
                    )}
                </NavLink>

                {/* Agregar usuario */}
                <NavLink
                    to="/app/register"
                    className="relative p-2.5 px-5 rounded-xl transition-colors duration-200 hover:bg-white/10"
                >
                    {({ isActive }) => (
                        <>
                            {isActive && (
                                <motion.div
                                    layoutId="active-navbar"
                                    className="absolute inset-0 rounded-xl bg-white shadow-[0_0_20px_rgba(255,255,255,0.12)]"
                                    transition={{
                                        type: "spring",
                                        stiffness: 600,
                                        damping: 30,
                                    }}
                                />
                            )}

                            <motion.div
                                animate={{
                                    scale: isActive ? 1.05 : 1,
                                }}
                                transition={{
                                    duration: 0.2,
                                }}
                                className="relative z-10"
                            >
                                <UserRoundPlus
                                    size={26}
                                    color={isActive ? "black" : "white"}
                                />
                            </motion.div>
                        </>
                    )}
                </NavLink>

                {/* Portero */}
                <NavLink
                    to="/app/intercom"
                    className="relative p-2.5 px-5 rounded-xl transition-colors duration-200 hover:bg-white/10"
                >
                    {({ isActive }) => (
                        <>
                            {isActive && (
                                <motion.div
                                    layoutId="active-navbar"
                                    className="absolute inset-0 rounded-xl bg-white shadow-[0_0_20px_rgba(255,255,255,0.12)]"
                                    transition={{
                                        type: "spring",
                                        stiffness: 600,
                                        damping: 30,
                                    }}
                                />
                            )}

                            <motion.div
                                animate={{
                                    scale: isActive ? 1.05 : 1,
                                }}
                                transition={{
                                    duration: 0.2,
                                }}
                                className="relative z-10"
                            >
                                <Video
                                    size={26}
                                    color={isActive ? "black" : "white"}
                                />
                            </motion.div>
                        </>
                    )}
                </NavLink>

            </div>
        </nav>
    );
};
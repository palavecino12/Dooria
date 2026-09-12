import { NavLink } from "react-router-dom";
import { Users, UserPlus, Video } from "lucide-react";
import { motion } from "framer-motion";

export const NavBar = () => {
    return (
        <nav className="w-full flex justify-center pb-4 pt-2">
            <div className="flex items-center gap-2 p-1 px-3 rounded-3xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.35)]">

                {/* Usuarios */}
                <NavLink
                    to="/app/users"
                    className="relative p-2.5 px-5 transition-colors duration-200"
                >
                    {({ isActive }) => (
                        <>
                            {isActive && (
                                <motion.div
                                    layoutId="active-navbar"
                                    className="absolute inset-0 rounded-2xl bg-[#2c2c28] shadow-[0_0_20px_rgba(255,255,255,0.12)]"
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
                                className="relative z-10 flex flex-col items-center gap-1"
                            >
                                <Users size={22} color={isActive ? "white" : "black"}/>
                                <p className={`text-xs text-${isActive?"white":"black"}`}>Usuarios</p>
                            </motion.div>
                        </>
                    )}
                </NavLink>

                {/* Agregar usuario */}
                <NavLink
                    to="/app/register"
                    className="relative p-2.5 px-5 transition-colors duration-200"
                >
                    {({ isActive }) => (
                        <>
                            {isActive && (
                                <motion.div
                                    layoutId="active-navbar"
                                    className="absolute inset-0 rounded-2xl bg-[#2c2c28] shadow-[0_0_20px_rgba(255,255,255,0.12)]"
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
                                className="relative z-10 flex flex-col items-center gap-1"
                            >
                                <UserPlus size={22} color={isActive ? "white" : "black"}/>
                                <p className={`text-xs text-${isActive?"white":"black"}`}>Añadir</p>
                            </motion.div>
                        </>
                    )}
                </NavLink>

                {/* Portero */}
                <NavLink
                    to="/app/intercom"
                    className="relative p-2.5 px-5 transition-colors duration-200"
                >
                    {({ isActive }) => (
                        <>
                            {isActive && (
                                <motion.div
                                    layoutId="active-navbar"
                                    className="absolute inset-0 rounded-2xl bg-[#2c2c28] shadow-[0_0_20px_rgba(255,255,255,0.12)]"
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
                                className="relative z-10 flex flex-col items-center gap-1"
                            >
                                <Video size={22} color={isActive ? "white" : "black"}/>
                                <p className={`text-xs text-${isActive?"white":"black"}`}>Portero</p>
                            </motion.div>
                        </>
                    )}
                </NavLink>

            </div>
        </nav>
    );
};
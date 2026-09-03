import { NavLink } from "react-router-dom"
import { UsersRound, UserRoundPlus, Video } from 'lucide-react';

export const NavBar = () => {
    return (
        <div className="fixed bottom-1 left-1/2 -translate-x-1/2 z-50">
            <div className="flex flex-row items-center gap-5 mb-10 border px-5 py-1 rounded-3xl bg-black">
                <NavLink
                    className={({ isActive }) =>
                        `py-2 px-5 ${isActive ? "bg-white rounded-2xl" : ""}`
                    }
                    to={"/app/users"}>
                    {({ isActive }) => (
                        <UsersRound color={isActive ? "black" : "white"} />
                    )}
                </NavLink>

                <NavLink
                    className={({ isActive }) =>
                        `py-2 px-5 ${isActive ? "bg-white rounded-2xl" : ""}`
                    }
                    to={"app/register"}>
                    {({ isActive }) => (
                        <UserRoundPlus color={isActive ? "black" : "white"} />
                    )}
                </NavLink>

                <NavLink
                    className={({ isActive }) =>
                        `py-2 px-5 ${isActive ? "bg-white rounded-2xl" : ""}`
                    }
                    to={"/app/intercom"}>
                    {({ isActive }) => (
                        <Video color={isActive ? "black" : "white"} />
                    )}
                </NavLink>
            </div>
        </div>

    )
}
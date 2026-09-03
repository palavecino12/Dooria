import { Outlet } from "react-router-dom"
import { NavBar } from "../components/common/NavBat"

export const AppLayout = () => {
    return (
        <>
            <main>
                <Outlet />
            </main>
            <NavBar />
        </>
    )
}
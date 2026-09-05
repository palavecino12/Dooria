import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom"
import { UsersList } from "./pages/app/UserList"
import { UserRegister } from "./pages/app/UserRegister"
import { Intercom } from "./pages/Intercom"
import { EditUser } from "./pages/app/UserEdit"
import { AppIntercom } from "./pages/app/AppIntercom"
import { NavBar } from "./components/common/NavBat"
import { AppLayout } from "./layouts/AppLayouts"
import { UserRegisterMethod } from "./pages/app/UserRegisterMethod"
import { ComingSoon } from "./pages/app/ComingSoon"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<AppLayout/>}>
          <Route path="/app/register" element={<UserRegisterMethod />} />
          <Route path="/app/users" element={<UsersList />} />
          <Route path="/app/intercom" element={<AppIntercom />} />
        </Route>

        <Route path="/app/register/direct" element={<UserRegister />} />
        <Route path="/app/register/remote" element={<ComingSoon />} />
        <Route path="/app" element={<Navigate to="/app/users" replace />}/>
        <Route path="/app/users/:id/edit" element={<EditUser />} />
        <Route path="/intercom" element={<Intercom />} />

        <Route path="/test" element={<NavBar />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

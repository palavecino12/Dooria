import { BrowserRouter,Routes,Route } from "react-router-dom"
import { Mobile } from "./pages/mobile"
import { Users } from "./pages/mobile/Users"
import { Register } from "./pages/mobile/Register"
import{ Intercom } from "./pages/Intercom"
import { EditUser } from "./pages/mobile/EditUser"
import { FormUserCreate } from "./components/forms/FormUserCreate"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/mobile" element={<Mobile/>}/>
        <Route path="/mobile/register" element={<Register/>}/>
        <Route path="/mobile/users" element={<Users/>}/>
        <Route path="/mobile/users/:id/edit" element={<EditUser/>}/>
        <Route path="/intercom" element={<Intercom/>}/>

        <Route path="/test" element={<FormUserCreate/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

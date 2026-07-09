import { BrowserRouter,Routes,Route } from "react-router-dom"
import { Home } from "./pages/mobile/Home"
import { UsersList } from "./pages/mobile/UserList"
import { UserRegister } from "./pages/mobile/UserRegister"
import{ Intercom } from "./pages/Intercom"
import { EditUser } from "./pages/mobile/UserEdit"
import { MobileIntercom } from "./pages/mobile/MobileIntercom"
import { FormUserAccess } from "./components/forms/FormUserAccess"
import type { FormValues } from "./schemas/schemaForm"

const testUser: FormValues = {
  name: "Juan",
  lastName: "Pérez",
  dni: "40123456",
  number: "2615551234",
  address: "Av. San Martín 1234",
  rol: "visitante",
  accessType: "semanal",
  allowedDays: [1, 3, 5],
  allowedDates: [
    "2026-07-10T00:00:00.000Z",
    "2026-07-15T00:00:00.000Z",
  ],
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/mobile" element={<Home/>}/>
        <Route path="/mobile/register" element={<UserRegister/>}/>
        <Route path="/mobile/users" element={<UsersList/>}/>
        <Route path="/mobile/users/:id/edit" element={<EditUser/>}/>
        <Route path="/mobile/intercom" element={<MobileIntercom/>}/>
        <Route path="/intercom" element={<Intercom/>}/>

        <Route path="/test" element={<FormUserAccess data={testUser} backToForm={()=>console.log("hola")}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

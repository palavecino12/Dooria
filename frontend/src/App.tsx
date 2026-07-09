import { BrowserRouter,Routes,Route } from "react-router-dom"
import { Home } from "./pages/mobile/Home"
import { UsersList } from "./pages/mobile/UserList"
import { UserRegister } from "./pages/mobile/UserRegister"
import{ Intercom } from "./pages/Intercom"
import { EditUser } from "./pages/mobile/UserEdit"
import { MobileIntercom } from "./pages/mobile/MobileIntercom"
import { Success } from "./components/feedback/Success"

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

        <Route path="/test" element={<Success />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

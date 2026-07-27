import { BrowserRouter,Routes,Route } from "react-router-dom"
import { Home } from "./pages/app/Home"
import { UsersList } from "./pages/app/UserList"
import { UserRegister } from "./pages/app/UserRegister"
import{ Intercom } from "./pages/Intercom"
import { EditUser } from "./pages/app/UserEdit"
import { AppIntercom } from "./pages/app/AppIntercom"
import { AppIntro } from "./pages/app/AppIntro"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<Home/>}/>
        <Route path="/app/register" element={<UserRegister/>}/>
        <Route path="/app/users" element={<UsersList/>}/>
        <Route path="/app/users/:id/edit" element={<EditUser/>}/>
        <Route path="/app/intercom" element={<AppIntercom/>}/>
        <Route path="/intercom" element={<Intercom/>}/>

        <Route path="/test" element={<AppIntro />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter,Routes,Route } from "react-router-dom"
import { Mobile } from "./pages/mobile"
import { Users } from "./pages/mobile/Users"
import Register from "./pages/mobile/Register"
import Intercom from "./pages/Intercom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/mobile" element={<Mobile/>}/>
        <Route path="/mobile/register" element={<Register/>}/>
        <Route path="/mobile/users" element={<Users/>}/>
        <Route path="/intercom" element={<Intercom/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

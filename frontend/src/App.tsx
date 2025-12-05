import { BrowserRouter,Routes,Route } from "react-router-dom"
import { Mobile } from "./pages/mobile"
import { List } from "./pages/mobile/List"
import Register from "./pages/mobile/Register"
import Intercom from "./pages/Intercom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/mobile" element={<Mobile/>}/>
        <Route path="/mobile/register" element={<Register/>}/>
        <Route path="/list" element={<List/>}/>
        <Route path="/intercom" element={<Intercom/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

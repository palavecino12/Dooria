import { BrowserRouter,Routes,Route } from "react-router-dom"
import Mobile from "./pages/Mobile"
import FaceDetection from "./pages/FaceDetection"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/mobile" element={<Mobile/>}/>
        <Route path="/face-detection" element={<FaceDetection/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

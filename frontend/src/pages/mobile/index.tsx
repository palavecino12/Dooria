import { useNavigate } from "react-router-dom";

export default function Mobile() {
  const navigate=useNavigate()
  
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-20">

      {/* Titulo */}
      <div >
        <h1 className="text-3xl font-medium">Administracion de usuarios</h1>
      </div>

      {/* Botones */}
      <div>
        <button className="bg-white border border-black/20 w-28 h-11 text-black rounded-xl shadow-lg transition-all duration-200
                    active:bg-gray-200 active:shadow-inner" 
                onClick={()=>navigate("/mobile/register")}>Registrar</button>
      </div>
    </div>
  );
}

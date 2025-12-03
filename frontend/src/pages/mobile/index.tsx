import { useNavigate } from "react-router-dom";

export const Mobile = () => {
  const navigate=useNavigate()
  
  return (
    <div className="h-screen flex items-center justify-center bg-gray-300 p-6">
      <div className="flex flex-col items-center gap-30 bg-white shadow-2xl rounded-2xl p-8 w-full">
        {/* Titulo */}        
          <h1 className="text-2xl font-medium">Panel Administracion</h1>
    
        {/* Botones */}
        <div className="m-10">
          <button className="bg-black w-34 h-11 text-white rounded-lg shadow-lg transition-all duration-200
                                  active:bg-gray-200 active:shadow-inner" 
                  onClick={()=>navigate("/mobile/register")}>Añadir Usuario</button>
        </div>
      </div>
    </div>
  );
}

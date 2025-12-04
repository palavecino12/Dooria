import { useNavigate } from "react-router-dom";

export const Mobile = () => {
  const navigate=useNavigate()
  
  return (
      <div className="flex flex-col items-center justify-center gap-10 bg-white h-screen">
        {/* Titulo */}        
          <h1 className="text-2xl font-medium">Panel Administracion</h1>
    
        {/* Botones */}
        <div className="flex flex-col items-center p-10 gap-8
            shadow-[0_4px_10px_rgba(0,0,0,0.15),0_-4px_10px_rgba(0,0,0,0.15)] w-full">
          <button className="bg-black w-34 h-11 text-white rounded-lg shadow-lg transition-all duration-200
                                  active:bg-gray-200 active:shadow-inner"> Usuarios</button>

          <button className="bg-black w-34 h-11 text-white rounded-lg shadow-lg transition-all duration-200
                                  active:bg-gray-200 active:shadow-inner" 
                  onClick={()=>navigate("/mobile/register")}>Añadir Usuario</button>
        </div>
      </div>
  );
}

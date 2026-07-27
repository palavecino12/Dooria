import { useNavigate } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { Header } from "../../components/common/Header";

export const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="flex h-dvh flex-col bg-gray-200 overflow-hidden">
      <Header title="Panel Administrador" />

      <main className="flex flex-1 items-center justify-center">
        {/* Botones */}
        <div className="flex flex-col items-center p-10 gap-8 bg-gray-100
            shadow-[0_4px_10px_rgba(0,0,0,0.15),0_-4px_10px_rgba(0,0,0,0.15)] w-full">

          <Button onClick={() => navigate("/app/users")}> Ver Usuarios</Button>
          
          <Button onClick={() => navigate("/app/register")}>Añadir Usuario</Button>

          <Button onClick={() => navigate("/app/intercom")}>Ver Portero</Button>
        </div>
      </main>

    </div>
  );
}

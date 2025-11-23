import { useState } from "react";
import { FormUserCreate } from "../components/FormUserCreate";

export default function Mobile() {

  const [showCreateForm,setShowCreateForm]=useState(false);
  const toggleCreateForm=()=>{
    setShowCreateForm(!showCreateForm)
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {showCreateForm ? 
        <FormUserCreate closeForm={toggleCreateForm}/> : 
        <button className="bg-white border border-black/20 w-28 h-11 text-black rounded-xl shadow-lg transition-all duration-200 cursor-pointer
                    hover:shadow-2xl hover:-translate-y-1 active:bg-gray-200 active:shadow-inner" 
                onClick={toggleCreateForm}>Registrar</button>
      }
      
    </div>
  );
}

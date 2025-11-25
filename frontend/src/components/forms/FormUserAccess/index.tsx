export const FormUserAccess=()=>{
    
    return(
        <div className="h-screen flex flex-col justify-center items-center gap-20">
            <button className="bg-white border border-black/20 w-38 h-15 text-black rounded-xl shadow-lg transition-all duration-200 cursor-pointer
                        hover:shadow-2xl hover:-translate-y-1 active:bg-gray-200 active:shadow-inner">Semanal</button>
            <button className="bg-white border border-black/20 w-38 h-15 text-black rounded-xl shadow-lg transition-all duration-200 cursor-pointer
                        hover:shadow-2xl hover:-translate-y-1 active:bg-gray-200 active:shadow-inner">Mensual</button>
        </div>
    )
}
//Lo que tengo que hacer aca es recibir la data del usuario que obtenemos en el formUserCreate y sumarle la data de acceso
//Luego mandamos esa data a CamaraRegister para que junto al descriptor cree el usuario
export const WeeklySelector=()=>{
    return(
        <div>
            <div className="flex flex-col">
                <label><input type="checkbox" value="1"/> Lunes</label>
                <label><input type="checkbox" value="2"/> Martes</label>
                <label><input type="checkbox" value="3"/> Miércoles</label>
                <label><input type="checkbox" value="4"/> Jueves</label>
                <label><input type="checkbox" value="5"/> Viernes</label>
                <label><input type="checkbox" value="6"/> Sábado</label>
                <label><input type="checkbox" value="7"/> Domingo</label>
            </div>
            {/* Botones */}
            <div className="flex flex-row-reverse gap-20">
                <button className="bg-gray-900/20 p-3 text-black/70 rounded-xl shadow-lg transition-all duration-200 cursor-pointer
                            hover:shadow-2xl hover:-translate-y-1 active:bg-gray-200 active:shadow-inner">Siguiente</button>
                <button className="bg-white border border-black/20 w-28 h-11 text-black rounded-xl shadow-lg transition-all duration-200 cursor-pointer
                        hover:shadow-2xl hover:-translate-y-1 active:bg-gray-200 active:shadow-inner">Volver</button>
            </div>
        </div>
    )
}
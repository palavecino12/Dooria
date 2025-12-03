export const ComponentePrueba = ()=>{
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
<div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
<h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">User Information</h2>


<form className="space-y-5">
<div>
<label className="block text-sm text-gray-600 mb-1">Nombre</label>
<input
type="text"
className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
placeholder="Ingresa tu nombre"
/>
</div>


<div>
<label className="block text-sm text-gray-600 mb-1">Apellido</label>
<input
type="text"
className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
placeholder="Ingresa tu apellido"
/>
</div>


<div>
<label className="block text-sm text-gray-600 mb-1">Email</label>
<input
type="email"
className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
placeholder="correo@example.com"
/>
</div>


<div>
<label className="block text-sm text-gray-600 mb-1">Teléfono</label>
<input
type="text"
className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
placeholder="Número de teléfono"
/>
</div>


<div className="flex justify-between pt-4">
<button
type="button"
className="px-5 py-2 rounded-xl text-gray-700 bg-gray-200 hover:bg-gray-300 transition shadow-sm"
>
Cancelar
</button>


<button
type="button"
className="px-5 py-2 rounded-xl text-white bg-black "
>
Enviar
</button>
</div>
</form>
</div>
</div>
)
}
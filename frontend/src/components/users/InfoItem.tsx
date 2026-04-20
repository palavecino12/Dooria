interface Props {
    label: string;
    // Puede ser un string O un arreglo de strings
    value: string | string[] | number | undefined; 
    // Es un booleano para la condición
    isLocal?: boolean; 
}

export const InfoItem = ({ label, value, isLocal }: Props) => {
    // Validamos que el valor exista y no sea un string vacío
    if (!value || (Array.isArray(value) && value.length === 0)) return null;

    return (
        <div className={`${isLocal ? "bg-gray-300" : "bg-gray-200"} rounded-md p-2 m-1 flex flex-wrap gap-1 text-sm`}>
            <span className="font-semibold text-slate-800">{label}:</span>
            <span className="text-slate-700">
                {Array.isArray(value) ? value.join(", ") : value}
            </span>
        </div>
    );
};
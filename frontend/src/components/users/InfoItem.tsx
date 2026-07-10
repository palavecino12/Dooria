interface Props {
    label: string;
    value: string | string[] | number | undefined;
}

export const InfoItem = ({ label, value }: Props) => {
    // Validamos que el valor exista y que un array no esté vacío
    if (!value || (Array.isArray(value) && value.length === 0)) return null;

    const formatArray = (values: string[]) => {
        const cleanValues = values.filter(Boolean);
        //Cuando hay un solo elemento lo devolvemos solo
        if (cleanValues.length === 1) return cleanValues[0];
        //Cuando hay dos elementos lo devolvemos con una "y"
        if (cleanValues.length === 2) {
            return `${cleanValues[0]} y ${cleanValues[1]}`;
        }
        //Cuando hay 3 o mas armamos los primeros con "," y el ultimo con la "y"
        return `${cleanValues.slice(0, -1).join(", ")} y ${cleanValues[cleanValues.length - 1]}`;
    };

    return (
        <div className="bg-gray-200 rounded-md p-2 m-1 flex flex-wrap gap-1 text-sm">
            <span className="font-semibold text-slate-800">{label}:</span>
            <span className="text-slate-700">
                {Array.isArray(value) ? formatArray(value) : value}
            </span>
        </div>
    );
};
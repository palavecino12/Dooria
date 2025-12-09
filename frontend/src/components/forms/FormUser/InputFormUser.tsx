import { Controller, type Control, type FieldError } from 'react-hook-form';
import { type FormValues } from '../../../schemas/schemaForm';

type AllowedFields = "name"|"lastName"|"dni"|"number"|"address"|"rol";

interface props {
    name: AllowedFields;
    label: string;
    control: Control<FormValues>;
    type?: string;
    error?: FieldError;
    options?: string[];
}

const InputFormUser = ({ name, label, control, type, error, options }: props) => {
    return (
        <div className="w-full">
            <label className="block text-sm text-gray-600 mb-1" htmlFor={name}>{label}</label>

            <Controller name={name} control={control} render={({ field }) =>
                type === 'select' ? (
                    <select id={name} {...field} value={field.value ?? ""} className={`w-full p-2 border border-gray-300 rounded-lg focus:ring-2 
                                                                                focus:border-transparent focus:-translate-y-1  
                                                                                focus:outline-none transition-all duration-200 bg-gray-50
                                                                                ${error ? 'border-red-700' : 'border-black/20'}`}>
                        {(options ?? []).map((opt) => (
                            <option key={opt} value={opt}>
                            {opt}
                            </option>))}
                    </select>
                ) : (
                    <input id={name} type={type} {...field} value={field.value ?? ""} className={`w-full p-2 border border-gray-300 rounded-lg focus:ring-2 
                                                                                        focus:border-transparent focus:-translate-y-1 bg-gray-50
                                                                                        focus:outline-none transition-all duration-200
                                                                                        ${error ? 'border-red-700' : 'border-black/20'}`}/>
                )}
            />

            {error && <p className="text-red-700">{error.message}</p>}
        </div>
    );
};

export default InputFormUser;

import { Controller, type Control, type FieldError } from 'react-hook-form';
import { type FormValues } from '../../../schemas/schemaForm';

interface props {
    name: keyof FormValues;
    label: string;
    control: Control<FormValues>;
    type?: string;
    error?: FieldError;
    options?: string[];
}

const InputFormUser = ({ name, label, control, type, error, options }: props) => {
    return (
        <div className="w-full">
            <label htmlFor={name}>{label}</label>

            <Controller name={name} control={control} render={({ field }) =>
                type === 'select' ? (
                    <select id={name} {...field} value={field.value ?? ""} className={`w-full p-3 rounded-xl border bg-white text-gray-700 
                                                                            shadow-lg focus:-translate-y-1 focus:shadow:2xl focus:outline-none 
                                                                            transition-all duration-200
                                                                            ${error ? 'border-red-700' : 'border-black/20'}`}>
                        {(options ?? []).map((opt) => (
                            <option key={opt} value={opt}>
                            {opt}
                            </option>))}
                    </select>
                ) : (
                    <input id={name} type={type} {...field} value={field.value ?? ""} className={`w-full p-3 rounded-xl border bg-white text-gray-700 
                                                                                        shadow-lg focus:-translate-y-1 focus:shadow:2xl focus:outline-none 
                                                                                        transition-all duration-200
                                                                                        ${error ? 'border-red-700' : 'border-black/20'}`}/>
                )}
            />

            {error && <p className="text-red-700">{error.message}</p>}
        </div>
    );
};

export default InputFormUser;

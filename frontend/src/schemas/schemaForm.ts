import {z} from 'zod';

//Definimos el esquema de validación para el formulario de usuario y creamos el type
//Recalcamos que en el front, la variable "age" se toma como string, debido a problemas con zod, antes de enviar al back se transforma en numero
export const schema = z.object({
    name: z.string().min(1, "Este campo es obligatorio").min(2, "El nombre debe tener al menos 2 caracteres"),
    lastName: z.string().min(1, "Este campo es obligatorio").min(2, "El apellido debe tener al menos 2 caracteres"),
    dni: z.string().min(6, "El DNI debe tener al menos 6 caracteres").regex(/^\d+$/, "El DNI solo puede contener números"),
    number: z.string().min(1, "Este campo es obligatorio").min(7, "El número de teléfono debe tener al menos 7 caracteres"),
    address: z.string().min(1, "Este campo es obligatorio").min(10, "La dirección debe tener al menos 10 caracteres"),
    rol:z.enum(["local","visita"])
});

export type FormValues = z.infer<typeof schema>;
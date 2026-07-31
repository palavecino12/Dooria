import { z } from "zod";

export const registerUserSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    lastName: z.string().min(1, "El apellido es obligatorio"),
    dni: z.string().min(1, "El DNI es obligatorio"),
    number: z.string().min(1, "El número es obligatorio"),
    address: z.string().min(1, "La dirección es obligatoria"),
    rol: z.enum(["Local", "Visitante"], {
        message: "El rol debe ser 'Local' o 'Visitante'"
    }),
    allowedDays: z.array(z.number()).optional(),
    allowedDates: z.array(z.string()).optional(),
    descriptor: z.array(z.number()).nonempty(),
});

export type registerUserInput = z.infer<typeof registerUserSchema>;
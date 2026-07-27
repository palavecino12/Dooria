import { z } from "zod";

export const schema = z.object({
    name: z.string({ error: "Campo obligatorio" }).trim().min(1, "Campo obligatorio").min(2, "El nombre debe tener al menos 2 caracteres"),

    lastName: z.string({ error: "Campo obligatorio" }).trim().min(1, "Campo obligatorio").min(2, "El apellido debe tener al menos 2 caracteres"),

    dni: z.string({ error: "Campo obligatorio" }).trim().min(1, "Campo obligatorio").min(6, "El DNI debe tener al menos 6 caracteres")
    .max(9, "El DNI no puede tener más de 9 caracteres").regex(/^\d+$/, "El DNI solo puede contener números"),

    number: z.string({ error: "Campo obligatorio" }).trim().min(1, "Campo obligatorio").min(7, "El número de teléfono debe tener al menos 7 caracteres")
    .max(15, "El número de teléfono no puede tener más de 15 caracteres").regex(/^\d+$/, "El número de teléfono solo puede contener números"),

    address: z.string({ error: "Campo obligatorio" }).trim().min(1, "Campo obligatorio").min(5, "La dirección debe tener al menos 5 caracteres"),

    rol: z.enum(["Local", "Visitante"], {
        error: "Debe seleccionar un rol válido",
    }),
    
    allowedDays: z.array(z.number().min(0).max(6)).optional(),
    allowedDates: z.array(z.string()).optional(),
});

export type FormValues = z.infer<typeof schema>;
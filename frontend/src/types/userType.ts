//Type base del usuario
export type User = {
        _id: string
        name: string
        lastName: string
        dni: string
        number: string
        address: string
        rol: "local" | "visitante"
        accessType?: "semanal" | "calendario"
        allowedDates?: string[]
        allowedDays?: number[]
        descriptor: number[]
}

//Este type es solo lo que va a devolver el endpoint GET/usuarios y lo que vamos a usar en el 
//endpoint UPDATE/usuarios/editar-usuario/:id, ya que no necesitamos el descriptor
export type UserWithoutDescriptor = Omit<User, "descriptor">
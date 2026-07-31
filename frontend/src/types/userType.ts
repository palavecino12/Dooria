//Type del usuario que vamos a usar en el front
export type User = {
        _id: string
        name: string
        lastName: string
        dni: string
        number: string
        address: string
        rol: "Local" | "Visitante"
        allowedDates?: string[]
        allowedDays?: number[]
        descriptor: number[]
}

//Type de los datos que introduce un cliente al crear un usuario (solo se usa en el service)
export type CreateUser = Omit<User, "_id">;

//Este type es solo lo que va a devolver el endpoint GET/usuarios y lo que vamos a usar en el 
//endpoint UPDATE/usuarios/editar-usuario/:id, ya que no necesitamos el descriptor
export type UserWithoutDescriptor = Omit<User, "descriptor">
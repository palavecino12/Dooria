//Este type es solo lo que va a devolver el endpoint GET/usuarios, ya que no necesitamos el descriptor
export type UserListItem={
        _id: string,
        name: string,
        lastName: string,
        dni: string,
        number: string,
        address: string,
        rol: string
        accessType?:string,
        allowedDates?: string[],
        allowedDays?: number[]
}
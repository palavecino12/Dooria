import { User, IUser } from "../models/User"
import { UserResponseDTO } from "../dtos/userDto"

//Trae todos los usuarios.
export const findAllUsers = (): Promise<UserResponseDTO[]> => {
    return User.find({},
        { name: 1, lastName: 1, dni: 1, number: 1, address: 1, rol: 1, allowedDates: 1, allowedDays: 1 }
    )
}

//Crea un usuario.
export const createUser = (data: IUser) => {
    const newUser = new User(data)
    return newUser.save()
}

//Elimina un usuario por su id.
export const deleteUserById = (id: string) => {
    return User.deleteOne({ _id: id })
}

//Edita un usuario.
export const UpdateUserById = (id: string, data: UserResponseDTO) => {
    return User.updateOne({ _id: id }, { $set: data })
}

//Trae todos los usuarios que tengan un descriptor.
export const findUsersWithDescriptor = (): Promise<IUser[]> => {
    return User.find({ descriptor: { $exists: true } }).lean<IUser[]>()
}

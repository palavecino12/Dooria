import { UserResponseDTO } from "../dtos/userDto"
import { IUser } from "../models/User"
import * as userRepository from "../Repositories/UserRepository"

//Trae todos los usuarios.
export const getUsers = () => {
    return userRepository.findAllUsers()
}

//Registra un usuario.
export const registerUser = (data: IUser) => {
    return userRepository.createUser(data)
}

//Elimina un usuario por su id.
export const deleteUser = async (id: string) => {
    if (!id) throw new Error("ID requerido")

    const result = await userRepository.deleteUserById(id)

    if (result.deletedCount === 0) throw new Error("Usuario no encontrado")

    return result
}

//Edita un usuario.
export const updateUser = async (id: string, data: UserResponseDTO) => {
    if (!id) throw new Error("ID requerido")

    const result = await userRepository.UpdateUserById(id, data)

    if (result.matchedCount === 0) throw new Error("Usuario no encontrado")

    return result
}

//Distancia euclidiana entre dos arrays numéricos (calculo para encontrar similitudes en rostros).
const distanciaEuclidiana = (a: number[], b: number[]): number => {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
        const diff = a[i] - b[i];
        sum += diff * diff;
    }
    return Math.sqrt(sum);
}

//Busca un descriptor en la base de datos.
export const findUserByDescriptor = async (descriptor: number[]) => {
    if (!descriptor || !Array.isArray(descriptor)) {
        throw new Error("Descriptor invalido");
    }

    const usuarios = await userRepository.findUsersWithDescriptor();

    if (!usuarios.length) return { match: false, access: false };

    let mejorUsuario: IUser | null = null;
    let menorDistancia = Infinity;

    //Mide la distancia euclidiana entre el descriptor actual y el descriptor de los usuarios almacenados.
    //El usuario almacenado que tenga menor distancia euclidiana lo almacenamos como mejor usuario.
    for (const usuario of usuarios) {
        if (!usuario.descriptor) continue;
        const distancia = distanciaEuclidiana(descriptor, usuario.descriptor);
        if (distancia < menorDistancia) {
            menorDistancia = distancia;
            mejorUsuario = usuario as IUser;
        }
    }

    //Si la distancia del mejor usuario es menor a 0.5 quiere decir que es el mismo que el descriptor actual.
    const UMBRAL = 0.5;
    if (menorDistancia < UMBRAL && mejorUsuario) {

        const now = new Date();
        const currentDay = now.getDay();//Retorna el dia de la semana indicada del 0 al 6

        //Almacena la fecha actual tipo YYYY-MM-DD
        const currentDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;
        const userDates = mejorUsuario.allowedDates?.map(date => date.slice(0, 10));

        let tieneAcceso = false;

        //Si el rol es local, tiene acceso siempre.
        if (mejorUsuario.rol === "Local") {
            tieneAcceso = true;
        }

        //Si el rol es visitante, validamos validamos el acceso.
        if (mejorUsuario.rol === "Visitante") {
            //Validación de días (0-6)
            if (Array.isArray(mejorUsuario.allowedDays) && mejorUsuario.allowedDays.includes(currentDay)) {
                tieneAcceso = true;
            }
            //Validación de fechas YYYY-MM-DD
            if (Array.isArray(userDates) && userDates.includes(currentDate)) {
                tieneAcceso = true;
            }
        }

        //Retorna que se encontro el usuario y su estado.
        return { match: true, access: tieneAcceso, user: mejorUsuario };
    }

    //Si no se encontro el usuario.
    return { match: false, access: false };
}
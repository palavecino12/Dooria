import { UserResponseDTO } from "../dtos/userDto"
import { AppError } from "../errors/AppError"
import { IUserDocument } from "../models/User"
import * as userRepository from "../Repositories/UserRepository"
import { registerUserInput } from "../schemas/userSchema"

//Trae todos los usuarios.
export const getUsers = () => {
    return userRepository.findAllUsers()
}

//Registra un usuario.
export const registerUser = async (data: registerUserInput) => {
    const existing = await userRepository.findUserByDni(data.dni);

    if (existing) {
        throw new AppError("Este DNI ya esta registrado", 409);
    }

    return userRepository.createUser(data)
}

//Elimina un usuario por su id.
export const deleteUser = async (id: string) => {
    if (!id) throw new AppError("ID requerido", 400)

    const result = await userRepository.deleteUserById(id)

    if (result.deletedCount === 0) throw new AppError("Usuario no encontrado", 404)

    return result
}

//Edita un usuario.
export const updateUser = async (id: string, data: UserResponseDTO) => {
    if (!id) throw new AppError("ID requerido", 400)

    if (data.dni) {
        const existing = await userRepository.findUserByDni(data.dni);

        if (existing && existing._id.toString() !== id) {
            throw new AppError("Este DNI ya esta registrado", 409);
        }
    }

    const result = await userRepository.UpdateUserById(id, data)

    if (result.matchedCount === 0) throw new AppError("Usuario no encontrado", 404)

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
        throw new AppError("Descriptor invalido", 400);
    }

    const usuarios = await userRepository.findUsersWithDescriptor();

    if (!usuarios.length) return { match: false, access: false };

    let mejorUsuario: IUserDocument | null = null;
    let menorDistancia = Infinity;

    //Mide la distancia euclidiana entre el descriptor actual y el descriptor de los usuarios almacenados.
    //El usuario almacenado que tenga menor distancia euclidiana lo almacenamos como mejor usuario.
    for (const usuario of usuarios) {
        if (!usuario.descriptor) continue;
        const distancia = distanciaEuclidiana(descriptor, usuario.descriptor);
        if (distancia < menorDistancia) {
            menorDistancia = distancia;
            mejorUsuario = usuario;
        }
    }

    //Si la distancia del mejor usuario es menor a 0.5 quiere decir que es el mismo que el descriptor actual.
    const UMBRAL = 0.5;
    if (menorDistancia < UMBRAL && mejorUsuario) {

        const now = new Date();
        const TIMEZONE = "America/Argentina/Buenos_Aires";

        //Fecha actual en Argentina, formato YYYY-MM-DD (para resolver la zona horaria del servidor)
        const currentDate = new Intl.DateTimeFormat("en-CA", {
            timeZone: TIMEZONE,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).format(now);

        //Día de la semana en Argentina, convertido a 0-6 (0=Lunes hasta 6=Domingo)
        const weekdayName = new Intl.DateTimeFormat("en-US", {
            timeZone: TIMEZONE,
            weekday: "long",
        }).format(now);

        const diasSemana = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const currentDay = diasSemana.indexOf(weekdayName);

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
import { IUser } from "../models/User";

//Los datos que se pueden ver del usuario
export type UserResponseDTO  = Omit<IUser, "descriptor">

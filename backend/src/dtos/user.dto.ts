import { IUser } from "../models/User";

//Para editar usuario (no se puede editar descriptor)
export type UpdateUserDTO = Omit<IUser, "descriptor">

//Añadir el type del user que se muestra en la lista (user public) que tambien seria sin descriptor

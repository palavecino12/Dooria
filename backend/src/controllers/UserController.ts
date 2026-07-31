import { NextFunction, Request, Response } from "express"
import { UserResponseDTO } from "../dtos/userDto"
import * as userService from "../services/UserService"
import { registerUserInput } from "../schemas/userSchema"

//GET/usuarios
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getUsers();
    return res.json(users);
  } catch (error) {
    next(error)
  }
}

//POST/usuarios/registrar-usuario 
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body as registerUserInput;
    const saved = await userService.registerUser(data);
    const { descriptor, __v, ...userWithoutDescriptor } = saved.toObject();
    return res.json({ usuario: userWithoutDescriptor, message: "Usuario creado con exito!" });
  } catch (error) {
    next(error)
  }
}

//DELETE/usuarios/eliminar-usuario/:id
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    return res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    next(error)
  }
}

//UPDATE/usuarios/editar-usuario/:id
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = req.body as UserResponseDTO;
    await userService.updateUser(id, data);
    return res.status(200).json({ message: "Usuario editado correctamente" });
  } catch (error) {
    next(error)
  }
}

//POST/usuarios/buscar-rostro
export const findUserByDescriptor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { descriptor } = req.body as { descriptor: number[] };
    const resultado = await userService.findUserByDescriptor(descriptor);
    return res.json(resultado);
  } catch (error) {
    next(error)
  }
}
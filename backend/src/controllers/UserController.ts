import { Request, Response } from "express"
import { User, IUser } from "../models/User"
import { UserResponseDTO } from "../dtos/userDto"
import * as userService from "../services/UserService"

//GET/usuarios
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    return res.json(users);
  } catch (error) {
    console.error("Error en getUsers:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
}

//POST/usuarios/registrar-usuario 
//En caso de exito retorno un ok: true, actualizar que en caso de error devuelva tambien un ok:false
export const registerUser = async (req: Request, res: Response) => {
  try {
    const data = req.body as IUser;
    const saved = await userService.registerUser(data);
    return res.json({ ok: true, usuario: saved, message: "Usuario creado con exito!" });
  } catch (err: any) {
    console.error(err);
    if (err.message === "Descriptor inválido") {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: "Error al registrar rostro", detail: err.message });
  }
}

//DELETE/usuarios/eliminar-usuario/:id
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    return res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error: any) {
    console.error("Error en deleteUser:", error);
    if (error.message === "ID requerido") return res.status(400).json({ error: error.message });
    if (error.message === "Usuario no encontrado") return res.status(404).json({ error: error.message });
    return res.status(500).json({ error: "Error al eliminar usuario" });
  }
}

//UPDATE/usuarios/editar-usuario/:id
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body as UserResponseDTO;
    await userService.updateUser(id, data);
    return res.status(200).json({ message: "Usuario editado correctamente" });
  } catch (error: any) {
    console.error("Error en updateUser:", error);
    if (error.message === "ID requerido") return res.status(400).json({ error: error.message });
    if (error.message === "Usuario no encontrado") return res.status(404).json({ error: error.message });
    return res.status(500).json({ error: "Error al editar usuario" });
  }
}

export const findUserByDescriptor = async (req: Request, res: Response) => {
  try {
    const { descriptor } = req.body as { descriptor: number[] };
    const resultado = await userService.findUserByDescriptor(descriptor);
    return res.json(resultado);
  } catch (err: any) {
    console.error(err);
    if (err.message === "Descriptor invalido") {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: "Error al buscar rostro" });
  }
}
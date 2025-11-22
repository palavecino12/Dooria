import { Request, Response } from "express"
import { User, IUser } from "../models/User"

//Funciones que quizas usamos en un futuro
//POST/usuarios/
export async function crearUsuario(req: Request, res: Response) {
  try {
    const user = new User(req.body)
    const savedUser = await user.save()
    res.json(savedUser)
  } catch (error) {
    res.status(400).json({ error: "Error al crear usuario" })
  }
}
//GET/usuarios/
export async function obtenerUsuarios(req: Request, res: Response) {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" })
  }
}


//Distancia euclidiana entre dos arrays numéricos (calculo para encontrar similitudes en rostros)
function distanciaEuclidiana(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    const diff = a[i] - b[i];
    sum += diff * diff;
  }
  return Math.sqrt(sum);
}

//POST/usuarios/buscar-rostro
export async function buscarRostro(req: Request, res: Response) {
  try {
    const { descriptor } = req.body as { descriptor: number[] };
    if (!descriptor || !Array.isArray(descriptor)) {
      return res.status(400).json({ error: "Descriptor inválido" });
    }

    //Traemos a todos los usuarios de la coleccion que tengan descriptor para buscar similitudes
    const usuarios = await User.find({ descriptor: { $exists: true } }).lean<IUser[]>();

    if (!usuarios.length) return res.json({ match: false });

    let mejorUsuario: IUser | null = null;
    let menorDistancia = Infinity;

    //Con cada usuario almacenado, mide la distancia euclidiana entre el descriptor actual y el descriptor del usuario almacenado
    //El usuario almacenado que tenga menor distancia euclidiana lo almacenamos como mejor usuario
    //descriptor actual=usuario que esta colocando el rostro en este momento
    for (const usuario of usuarios) {
      if (!usuario.descriptor) continue;
      const distancia = distanciaEuclidiana(descriptor, usuario.descriptor);
      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        mejorUsuario = usuario as IUser;
      }
    }

    //Si la distancia del mejor usuario es menor a 0.5 quiere decir que es el mismo que el descriptor actual
    const UMBRAL = 0.5;
    if (menorDistancia < UMBRAL && mejorUsuario) {
      return res.json({ match: true, usuario: mejorUsuario, distancia: menorDistancia });
    }

    return res.json({ match: false });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error al buscar rostro" });
  }
}

//POST/usuarios/registrar-rostro
export async function registrarRostro(req: Request, res: Response) {
  try {
    const { nombre, email, edad, descriptor } = req.body as {
      nombre?: string;
      email?: string;
      edad?: number;
      descriptor: number[];
    };

    if (!descriptor || !Array.isArray(descriptor)) {
      return res.status(400).json({ error: "Descriptor inválido" });
    }

    const nuevo = new User({ nombre, email, edad, descriptor });
    const saved = await nuevo.save();
    return res.json({ ok: true, usuario: saved });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Error al registrar rostro", detail: err.message });
  }
}
import { Request, Response } from "express"
import { User, IUser } from "../models/User"

export async function crearUsuario(req: Request, res: Response) {
  try {
    const user = new User(req.body)
    const savedUser = await user.save()
    res.json(savedUser)
  } catch (error) {
    res.status(400).json({ error: "Error al crear usuario" })
  }
}

export async function obtenerUsuarios(req: Request, res: Response) {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" })
  }
}


// distancia euclidiana entre dos arrays numéricos (calculo para encontrar similitudes en rostros)
function distanciaEuclidiana(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    const diff = a[i] - b[i];
    sum += diff * diff;
  }
  return Math.sqrt(sum);
}

// POST /usuarios/buscar-rostro
export async function buscarRostro(req: Request, res: Response) {
  try {
    const { descriptor } = req.body as { descriptor: number[] };
    if (!descriptor || !Array.isArray(descriptor)) {
      return res.status(400).json({ error: "Descriptor inválido" });
    }

    const usuarios = await User.find({ descriptor: { $exists: true } }).lean<IUser[]>();

    if (!usuarios.length) return res.json({ match: false });

    let mejorUsuario: IUser | null = null;
    let menorDistancia = Infinity;

    for (const u of usuarios) {
      if (!u.descriptor) continue;
      const d = distanciaEuclidiana(descriptor, u.descriptor);
      if (d < menorDistancia) {
        menorDistancia = d;
        mejorUsuario = u as IUser;
      }
    }

    // umbral típico: 0.4 - 0.6. Ajustalo según pruebas.
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

// POST /usuarios/registrar-rostro
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

    // crear nuevo usuario (podés exigir nombre/email según tu UX)
    const nuevo = new User({ nombre, email, edad, descriptor });
    const saved = await nuevo.save();
    return res.json({ ok: true, usuario: saved });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Error al registrar rostro", detail: err.message });
  }
}
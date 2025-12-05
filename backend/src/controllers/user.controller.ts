import { Request, Response } from "express"
import { User, IUser } from "../models/User"

//GET/usuarios/
export async function obtenerUsuarios(req: Request, res: Response) {
  try {
    const { fullName = "" } = req.body
    
    //Dividimos las palabras ingresadas por el usuario
    const terms:string[] = fullName.trim().split(/\s+/).filter(Boolean)            

    //Buscamos cada palabra en ambos campos ignorando mayusculas (creamos un array)
    const conditions = terms.map(term => ({
      $or: [
        { name: { $regex: term, $options: "i" } },       
        { lastName: { $regex: term, $options: "i" } }   
      ]
    }))

    //Usamos un and para retornar a los usuarios que cumplan con todas las condiciones
    const users = await User.find(
      { $and: conditions },
      { name: 1, lastName: 1, dni: 1, number: 1, address: 1, rol: 1 }
    )

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
      return res.status(400).json({error: "Descriptor invalido"});
    }

    //Traemos a todos los usuarios de la coleccion que tengan descriptor para buscar similitudes
    const usuarios = await User.find({ descriptor: { $exists: true } }).lean<IUser[]>();

    if (!usuarios.length) return res.json({ match: false, access:false });

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

      const now = new Date();
      const currentDay = now.getDay(); //Retorna el dia de la semana indicada del 0 al 6

      //Almacenamos la fecha actual tipo YYYY-MM-DD
      const currentDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;
      const userDates = mejorUsuario.allowedDates?.map(date => date.slice(0, 10));//Filtramos las fechas a solo YYYY-MM-DD

      let tieneAcceso = false;

      //Si el rol es local, tiene acceso siempre
      if (mejorUsuario.rol === "local") {
        tieneAcceso = true;
      }

      //Si el rol es visitante, validamos validamos el tipo de acceso
      if (mejorUsuario.rol === "visitante") {
        const type = mejorUsuario.accessType;

        if (type === "semanal") {
          //Validación de días (0-6)
          if (Array.isArray(mejorUsuario.allowedDays) && mejorUsuario.allowedDays.includes(currentDay)) {
            tieneAcceso = true;
          }
        }

      if (type === "mensual") {
        //Validación de fechas YYYY-MM-DD
        if (Array.isArray(userDates) && userDates.includes(currentDate)) {
          tieneAcceso = true;
        }
      }
}
      //Respondemos según acceso
      if (!tieneAcceso) {
        return res.json({
          match: true,
          access: false,
          user: mejorUsuario
        });
      }

      return res.json({
        match: true,
        access: true,
        user: mejorUsuario
      });
    }

    return res.json({ 
      match: false,
      access:false
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error al buscar rostro" });
  }
}

//POST/usuarios/registrar-rostro
export async function registrarRostro(req: Request, res: Response) {
  try {
    const data = req.body as IUser 

    if (!data.descriptor || !Array.isArray(data.descriptor)) {
      return res.status(400).json({ error: "Descriptor inválido" });
    }

    const nuevo = new User(data);
    const saved = await nuevo.save();
    return res.json({ ok: true, usuario: saved });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Error al registrar rostro", detail: err.message });
  }
}
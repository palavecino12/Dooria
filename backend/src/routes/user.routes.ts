import { Router } from "express"
import { obtenerUsuarios, buscarRostro, registrarUsuario, eliminarUsuario } from "../controllers/user.controller"

const router = Router()

router.get("/", obtenerUsuarios);
router.delete("/eliminar-usuario/:id", eliminarUsuario)
router.post("/buscar-rostro", buscarRostro);
router.post("/registrar-ususario", registrarUsuario);

export default router

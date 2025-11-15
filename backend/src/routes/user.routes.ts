import { Router } from "express"
import { crearUsuario, obtenerUsuarios,buscarRostro, registrarRostro } from "../controllers/user.controller"

const router = Router()

router.post("/", crearUsuario);
router.get("/", obtenerUsuarios);
router.post("/buscar-rostro", buscarRostro);
router.post("/registrar-rostro", registrarRostro);

export default router

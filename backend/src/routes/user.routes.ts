import { Router } from "express"
import { obtenerUsuarios,buscarRostro, registrarRostro } from "../controllers/user.controller"

const router = Router()

router.get("/", obtenerUsuarios);
router.post("/buscar-rostro", buscarRostro);
router.post("/registrar-rostro", registrarRostro);

export default router

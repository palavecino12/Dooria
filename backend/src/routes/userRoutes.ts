import { Router } from "express"
import { obtenerUsuarios, buscarRostro, registrarUsuario, eliminarUsuario, editarUsuario } from "../controllers/UserController"

const router = Router()

router.get("/", obtenerUsuarios);
router.delete("/eliminar-usuario/:id", eliminarUsuario)
router.post("/buscar-rostro", buscarRostro);
router.post("/registrar-usuario", registrarUsuario);
router.put("/editar-usuario/:id", editarUsuario);

export default router

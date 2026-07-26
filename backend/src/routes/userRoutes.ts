import { Router } from "express"
import { getUsers, findUserByDescriptor, registerUser, deleteUser, updateUser } from "../controllers/UserController"

const router = Router()

router.get("/", getUsers);
router.delete("/eliminar-usuario/:id", deleteUser)
router.post("/buscar-rostro", findUserByDescriptor);
router.post("/registrar-usuario", registerUser);
router.put("/editar-usuario/:id", updateUser);

export default router

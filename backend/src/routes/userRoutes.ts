import { Router } from "express"
import { getUsers, findUserByDescriptor, registerUser, deleteUser, updateUser } from "../controllers/UserController"
import { validate } from "../middlewares/validateMiddleware";
import { registerUserSchema } from "../schemas/userSchema";

const router = Router()

router.get("/", getUsers);
router.post("/buscar-rostro", findUserByDescriptor);
router.post("/registrar-usuario", validate(registerUserSchema), registerUser);
router.delete("/eliminar-usuario/:id", deleteUser)
router.put("/editar-usuario/:id", updateUser);

export default router

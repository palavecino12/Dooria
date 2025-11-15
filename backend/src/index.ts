import express from "express"
import { connectDB } from "./config/db"
import userRoutes from "./routes/user.routes"
import cors from "cors"

const app = express()
app.use(cors());
app.use(express.json())

app.use("/usuarios", userRoutes)

connectDB()

app.listen(3000, () => console.log("Servidor en puerto 3000"))

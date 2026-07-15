import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import userRoutes from "./routes/user.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/usuarios", userRoutes);

//No iniciamos el servidor si no podemos conectarnos a la db
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Backend corriendo en el puerto ${PORT}`);
        });

    } catch (error) {
        console.error("Error iniciando servidor:", error);
        process.exit(1);
    }
};

startServer();
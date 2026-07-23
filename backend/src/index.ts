import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import userRoutes from "./routes/user.routes";
import { createServer } from "http";
import { Server } from "socket.io";
import { configureSockets } from "./socket/socket";

dotenv.config();
const PORT = process.env.PORT || 3000;

//Aplicación de Express que manejará las rutas HTTP de la API.
const app = express();
app.use(cors({origin: process.env.FRONTEND_URL || "http://localhost:5173",}));
app.use(express.json());

app.use("/usuarios", userRoutes);


//Creamos el servidor http de node asociado a express.
const httpServer = createServer(app);
//Creamos el servidor socket.io.
const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});
//Configuramos el servidor socket.io en otro archivo.
configureSockets(io);


//No iniciamos el servidor si no podemos conectarnos a la db
const startServer = async () => {
    try {
        await connectDB();

        httpServer.listen(PORT, () => {
            console.log(`Backend corriendo en el puerto ${PORT}`);
        });

    } catch (error) {
        console.error("Error iniciando servidor:", error);
        process.exit(1);
    }
};
startServer();
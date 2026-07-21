import { Server, Socket } from "socket.io";

export const configureSockets = (io: Server) => {

    //Obtenemos el objeto que reprensenta la conexion de un cliente cuando entra.
    io.on("connection", (socket: Socket) => {

        console.log(`Cliente conectado: ${socket.id}`);

        socket.on("disconnect", () => {
            console.log(`Cliente desconectado: ${socket.id}`);
        });

    });

};
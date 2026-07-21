import { Server, Socket } from "socket.io";

export const configureSockets = (io: Server) => {

    let intercom: Socket | null = null;

    //Obtenemos el objeto que reprensenta la conexion de un cliente cuando entra.
    io.on("connection", (socket: Socket) => {

        //Identificamos quein funciona como intercom
        socket.on("join-intercom", () => {

            intercom = socket;

            console.log("Intercom conectado");
        });

        //Identificamos quien quiere ver el intercom
        socket.on("watch-intercom", () => {

            console.log(`Mobile ${socket.id} quiere ver el intercom`);

            if (intercom) {
                intercom.emit("viewer-connected", {
                    viewerId: socket.id
                });
            }

        });

        //Si el que hacia de intercom se sale, dejamos el intercom libre
        socket.on("disconnect", () => {
            if (socket === intercom) {
                intercom = null;
            }
        });

    });



};
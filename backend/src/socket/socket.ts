import { Server, Socket } from "socket.io";

export const configureSockets = (io: Server) => {

    let intercom: Socket | null = null;
    const viewers = new Map<string, Socket>();

    //Obtenemos el objeto que reprensenta la conexion de un cliente cuando entra.
    io.on("connection", (socket: Socket) => {

        viewers.set(socket.id, socket);
        console.log("Viewer conectado:", socket.id, "Total viewers:", viewers.size);

        //Identificamos quein funciona como intercom.
        socket.on("join-intercom", () => {

            intercom = socket;
        });

        //Identificamos quien quiere ver el intercom.
        socket.on("watch-intercom", () => {

            viewers.set(socket.id, socket);

            if (intercom) {
                //Cuando entra un viewer le avisamos al intercom
                intercom.emit("viewer-connected", { viewerId: socket.id });
            }
        });

        //Recibimos la oferta del intercom y la reenviamos al mobile.
        socket.on("offer", ({ viewerId, offer }) => {

            io.to(viewerId).emit("offer", { offer });
        });

        //Recibimos la respuesta del mobile.
        socket.on("answer", ({ viewerId, answer }) => {

            if (intercom) {
                //La emitimos al intercom.
                intercom.emit("answer", { viewerId, answer, });
            }
        });

        //Si el que hacia de intercom se sale, dejamos el intercom libre
        socket.on("disconnect", () => {
            if (socket === intercom) {
                intercom = null;
                viewers.clear();
            }

            viewers.delete(socket.id);
        });

        //Recibimos el ice del intercom.
        socket.on("ice-candidate-intercom", ({ viewerId, candidate }) => {
            const viewer = viewers.get(viewerId);
            if (!viewer) return;
            viewer.emit("ice-candidate", { candidate, });
        });

        //Recibimos el ice del mobile.
        socket.on("ice-candidate-mobile", ({ viewerId, candidate }) => {

            if (!intercom) return;
            //LO reenviamos al intercom.
            intercom.emit("ice-candidate", { viewerId, candidate, });
        });

        //Recibimos y emitimos el estados del usuario.
        socket.on("face-state", ({ estadoRostro, estadoAcceso, user }) => {

            viewers.forEach((viewer) => {

                viewer.emit("face-state", {
                    estadoRostro,
                    estadoAcceso,
                    user,
                });

            });

        });
    });
};
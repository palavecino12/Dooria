import { Server, Socket } from "socket.io";

export const configureSockets = (io: Server) => {

    let intercom: Socket | null = null;
    let viewer: Socket | null = null;

    //Obtenemos el objeto que reprensenta la conexion de un cliente cuando entra.
    io.on("connection", (socket: Socket) => {

        //Identificamos quein funciona como intercom.
        socket.on("join-intercom", () => {

            intercom = socket;
        });

        //Identificamos quien quiere ver el intercom.
        socket.on("watch-intercom", () => {

            viewer = socket;

            if (intercom) {
                //Cuando entra un viewer le avisamos al intercom
                intercom.emit("viewer-connected", {viewerId: socket.id});
            }
        });

        //Recibimos la oferta del intercom y la reenviamos al mobile.
        socket.on("offer", ({ viewerId, offer }) => {

            io.to(viewerId).emit("offer", {offer});
        });

        //Recibimos la respuesta del mobile.
        socket.on("answer", ({ answer }) => {

            if (intercom) {
                intercom.emit("answer", {answer,});
            }
        });

        //Si el que hacia de intercom se sale, dejamos el intercom libre
        socket.on("disconnect", () => {
            if (socket === intercom) {
                intercom = null;
            }
        });

        //Recibimos el ice del intercom.
        socket.on("ice-candidate-intercom", ({ candidate }) => {

            if (!viewer) return;
            viewer.emit("ice-candidate", {candidate,});
        });

        //Recibimos el ice del mobile.
        socket.on("ice-candidate-mobile", ({ candidate }) => {

            if (!intercom) return;
            intercom.emit("ice-candidate", {candidate,});
        });

        //Recibimos y emitimos el estado del usuario.
        socket.on("face-state", ({ estadoRostro, estadoAcceso, user }) => {

            if (!viewer)return;
            viewer.emit("face-state", {estadoRostro,estadoAcceso,user,});
        })
    });
};
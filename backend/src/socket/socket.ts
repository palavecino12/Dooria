import { Server, Socket } from "socket.io";

export const configureSockets = (io: Server) => {

    let intercom: Socket | null = null;
    let viewer: Socket | null = null;

    //Obtenemos el objeto que reprensenta la conexion de un cliente cuando entra.
    io.on("connection", (socket: Socket) => {

        console.log("Nueva conexión:", socket.id);

        socket.on("disconnect", () => {
            console.log("Desconectado:", socket.id);
        });


        //Identificamos quein funciona como intercom.
        socket.on("join-intercom", () => {

            intercom = socket;

            console.log("Intercom conectado", socket.id);
        });

        //Identificamos quien quiere ver el intercom
        socket.on("watch-intercom", () => {

            console.log("watch-intercom recibido", socket.id);

            viewer = socket;
            console.log("VIEWER GUARDADO:", viewer.id);

            if (intercom) {
                console.log("emitiendo viewer-connected");
                intercom.emit("viewer-connected", {
                    viewerId: socket.id
                });
            }

        });

        //Recibimos la oferta del intercom y la reenviamos al mobile.
        socket.on("offer", ({ viewerId, offer }) => {
            io.to(viewerId).emit("offer", {
                offer
            });

        });

        //Recibimos la respuesta del mobile.
        socket.on("answer", ({ answer }) => {

            if (intercom) {
                intercom.emit("answer", {
                    answer,
                });
            }

        });

        //Si el que hacia de intercom se sale, dejamos el intercom libre
        socket.on("disconnect", () => {
            if (socket === intercom) {
                intercom = null;
                console.log("Intercom desconectado");
            }
        });

        //Recibimos el ice del intercom.
        socket.on("ice-candidate-intercom", ({ candidate }) => {

            if (!viewer) return;

            viewer.emit("ice-candidate", {
                candidate,
            });
        });

        //Recibimos el ice del mobile.
        socket.on("ice-candidate-mobile", ({ candidate }) => {

            if (!intercom) return;

            intercom.emit("ice-candidate", {
                candidate,
            });
        });

        //Recibimos el estado del usuario.
        socket.on("face-state", ({ estadoRostro, estadoAcceso, user }) => {

            if (!viewer){
                console.log("NO HAY VIEWER")
                return;
            
            } 
                

            console.log("VIEWER ACTUAL:", viewer.id);
            viewer.emit("face-state", {
                estadoRostro,
                estadoAcceso,
                user,
            });


        })

    });



};
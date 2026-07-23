import { io } from "socket.io-client";

const apiUrl = import.meta.env.VITE_API_URL;
if (!apiUrl) {
    throw new Error("La variable de entorno VITE_API_URL no está definida");
}

export const socket = io(apiUrl);
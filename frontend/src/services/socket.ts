import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:8000";

export const socket: Socket = io(SOCKET_URL, {
  autoConnect: false,
  path: "/socket.io",
  transports: ["websocket"],
  upgrade: false,
});
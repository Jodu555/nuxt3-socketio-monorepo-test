import type { Server } from 'socket.io';

let io: Server;

export function setIO(newIO: Server) {
    io = newIO;
}

export function getIO() {
    return io;
}
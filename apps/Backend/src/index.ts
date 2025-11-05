import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { Server } from 'socket.io';
import { setIO } from './utils.js';
import type { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from '@nuxt-socketio-mono-test/types/socket';
// import type { socket } from '@nuxt-socketio-mono-test/types';

const app = new Hono();

app.get('/', (c) => {
    return c.text('Hello Hono!');
});

const httpServer = serve({
    fetch: app.fetch,
    port: 3500
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});

const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(httpServer, {
    cors: {
        methods: ['GET', 'POST'],
    },
});
setIO(io);

io.use(async (socket, next) => {
    console.log('Trying to authorize ', socket.id, socket.handshake.auth);

    if (socket.handshake.auth.token === undefined) {
        return next(new Error('Unauthorized'));
    }
    socket.data = {
        age: 10,
        name: 'John Doe'
    };
    // Validate the token or something
    next();

});

io.on('connection', (socket) => {
    console.log(socket.handshake.auth);

    console.log(socket.id, socket.data, 'a user connected');

    socket.on('hello', () => {
        console.log(socket.id, 'hello');
    });

    socket.on('clicked', (data) => {
        console.log(socket.id, 'clicked', data);
        io.emit('addClick', data);
    });

    socket.on('disconnect', () => {
        console.log(socket.id, 'user disconnected');
    });
});
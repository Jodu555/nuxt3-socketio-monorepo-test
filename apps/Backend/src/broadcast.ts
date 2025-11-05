import { Hono } from "hono";
import { getIO } from "./utils.js";


const router = new Hono();

router.get('/', async (c) => {
    (await getIO().fetchSockets()).forEach(socket => {
        socket.emit('hello');
    });
    return c.text('Hello World!');
});

export default { broadcastRouter: router };
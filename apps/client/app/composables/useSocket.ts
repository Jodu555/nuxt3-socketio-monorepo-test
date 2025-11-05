import type { ClientToServerEvents, ServerToClientEvents } from '@nuxt-socketio-mono-test/types';
import { io, Socket } from "socket.io-client";
import { useTestStore } from '~/stores/test.store';

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;
export default function useSocket() {
    if (socket !== null) {
        return socket;
    }
    const testStore = useTestStore();
    watch(() => testStore.token, () => {
        if (socket === null) return;
        (socket as any).io.opts.auth.token = testStore.token;
        socket.disconnect();
        socket.connect();
    });

    socket = io('http://localhost:3500', {
        transports: ['websocket'],
        upgrade: true,
        reconnection: true,
        autoConnect: false,
        auth: {
            token: testStore.token
        }
    });
    return socket;

}
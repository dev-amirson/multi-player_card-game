import io from 'socket.io-client';

const ENDPOINT = "http://localhost:3001";
const socket = io(ENDPOINT, { transports: ["websocket"] });
socket.connect();
export default socket;

import { io } from 'socket.io-client';

const URL = 'https://us-central1-truckers-978b8.cloudfunctions.net/app';
//const URL = "http://localhost:8000"

export const socket = io(URL, {
    autoConnect : false
});
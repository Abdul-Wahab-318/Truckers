import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'https://us-central1-truckers-978b8.cloudfunctions.net/app';

export const socket = io(URL, {
    autoConnect : false
});
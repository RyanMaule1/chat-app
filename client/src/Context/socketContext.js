import { createContext, useRef } from "react";
import { io } from 'socket.io-client';

export const useSocketContext = () => {
    const URL = 'http://localhost:5000'
    const socket = io(URL)

    return {socket}
}
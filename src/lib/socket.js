import { io } from 'socket.io-client'

const url = import.meta.env.VITE_SERVER_URL || 'http://localhost:8080'

export const socket = io(url, {
  transports: ['websocket'],
  autoConnect: true
})

import { io } from "socket.io-client";

// Get JWT from localStorage
const token = localStorage.getItem("token");

export const socket = io("/", {
  auth: { token }, // Send JWT for server verification
  transports: ["websocket"], // optional
});

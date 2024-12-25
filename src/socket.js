import { io } from "socket.io-client";

export const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling"],
});

socket.on("connect_error", (error) => {
  console.error("Connection Error:", error);
});

socket.on("connect", () => {
  console.log("Connected to server!");
});

export const joinRoom = (chat_id) => {
  socket.emit("joinRoom", chat_id);
};

export const sendMessage = (chat_id, message) => {
  socket.emit("sendMessage", { chat_id, message });
};

export const receiveMessage = (callback) => {
  socket.on("receiveMessage", callback);
}
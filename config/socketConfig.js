import { io } from "../../index.js";

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Join a room based on user ID
    socket.on("joinRoom", (userId) => {
        socket.join(userId); // User joins their unique room
        console.log(`User ${userId} joined room ${userId}`);
    });

    // Send and receive messages
    socket.on("sendMessage", ({ sender, receiver, message }) => {
        io.to(receiver).emit("receiveMessage", { sender, message });
    });

    // Disconnect
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

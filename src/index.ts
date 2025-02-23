import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv"
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import cors from "cors"

dotenv.config();

const app = express();
app.use(express.json());

const server = http.createServer(app);

app.use(cors());

app.use("/api/user", userRouter);

app.use("/api/auth", authRouter);


const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "DELETE"],
        allowedHeaders: "*",
    },
});


io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join-room", (room: string)=>{
        console.log(`User ${socket.id} joined ${room}`);
        socket.join(room);
    })

    socket.on("message", (room: string, message: string, user: {}) => {
        console.log(`Message from ${socket.id} to ${room}: ${message}`);
        io.to(room).emit("message", {message, sender: user});
    });

    socket.on("typing", (user)=>{
        socket.broadcast.emit("typing", user);
    })

    socket.on("notTyping", (user)=>{
        socket.broadcast.emit("notTyping", user);
    })

    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});


const portEnv = process.env.PORT;
if (!portEnv) {
    console.error("Error: PORT is not defined in .env file");
    process.exit(1);
}

const PORT: number = parseInt(portEnv, 10);
if (isNaN(PORT)) {
    console.error("Error: PORT is not a number in .env file");
    process.exit(1);
}

server.listen(PORT, () => {
    console.log(`WebSocket server running on port: ${PORT}`);
});

import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv"
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.use("/api/user", userRouter);

app.use("/api/auth", authRouter);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "DELETE"],
    },
});

io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("message", (message: string) => {
        console.log(`Message from ${socket.id}: ${message}`);
        io.emit("message", message);
    });

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

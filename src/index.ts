import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv"
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import cors from "cors"
import { JWT_User, WS_User } from "./dtos/createUser.dto";
import messageRouter from "./routes/message.routes";
import { ChatMessage } from "@prisma/client";

dotenv.config();

const app = express();
app.use(express.json());

const server = http.createServer(app);

app.use(cors());

app.use("/api/user", userRouter);

app.use("/api/auth", authRouter);

app.use("/api/messages", messageRouter);


const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "DELETE"],
        allowedHeaders: "*",
    },
});


const userList: WS_User[] = [];

io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);


    socket.on("join-room", (room: string, user: JWT_User)=>{
        console.log(`User ${socket.id} joined ${room}`);
        socket.join(room);
        userList.push({socketId: socket.id, user});
        io.emit("joined-users", userList);
    })
    
    socket.on("message", (room: string, data: ChatMessage) => {
        console.log(`Message from ${socket.id} to ${room}: ${data.text}`);
        io.to(room).emit("message", data);
    });

    socket.on("typing", (user)=>{
        socket.broadcast.emit("typing", user);
    })

    socket.on("notTyping", (user)=>{
        socket.broadcast.emit("notTyping", user);
    })

    socket.on("edit-message", (room, message)=>{
        io.to(room).emit("edited-message", message);
    })

    socket.on("delete-Message", (room, id)=>{
        io.to(room).emit("deleted-Message", id);
    })

    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
        const userIndex = userList.findIndex((user)=> user.socketId === socket.id);
        if(userIndex >= 0) {
            userList.splice(userIndex, 1);
            io.emit("joined-users", userList);
        }
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

// server.listen(PORT, () => {
//     console.log(`WebSocket server running on port: ${PORT}`);
// });


export default app;
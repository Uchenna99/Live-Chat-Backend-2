import express from "express"
import { Server } from "socket.io"
import dotenv from "dotenv"
import http from "http"

dotenv.config();


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

const app = express();
const server = http.createServer(app);
const io = new Server(server);



server.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
})
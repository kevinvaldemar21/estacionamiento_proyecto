import express from "express";
import router from "./router";
import db from "./config/db";
import cors from "cors";

async function connectDB() {
    try {
        await db.authenticate();
        await db.sync(); // Sincroniza los modelos con la base de datos
        console.log("Connected to the database successfully!");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

connectDB();

const server = express();

// Configurar CORS
server.use(cors({
    origin: "http://localhost:5173", // Permitir solicitudes desde el frontend
}));
server.use(express.json());
server.use('/api/clients', router); // Cambiado a "clients" para reflejar los datos actuales

export default server;
import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import Client from "../models/Client.model"; // Importa el modelo

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Validar que la URL de la base de datos esté definida
if (!process.env.DB_URL) {
    throw new Error("La variable de entorno DB_URL no está definida.");
}

// Crear la instancia de Sequelize usando la URL de conexión
const db = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Permitir certificados no verificados
        },
    },
    logging: false, // Deshabilitar logs de Sequelize
});

// Registrar el modelo en la instancia de Sequelize
db.addModels([Client]);

export default db;
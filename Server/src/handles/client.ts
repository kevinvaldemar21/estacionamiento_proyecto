import { Request, Response } from 'express';
import Client from '../models/Client.model'; // Importa el modelo de clientes

export const getClients = async (req: Request, res: Response) => {
    try {
        const clients = await Client.findAll({
            order: [["id", "ASC"]],
            attributes: { exclude: ["createdAt", "updatedAt"] }, // Excluye columnas innecesarias
            limit: 5,
        });
        res.json({ data: clients });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los clientes" });
    }
};

export const getClientById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const client = await Client.findByPk(id);
        if (!client) {
            res.status(404).json({ error: "Cliente no encontrado" });
            return;
        }
        res.json({ data: client });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el cliente" });
    }
};

export const updateClient = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const client = await Client.findByPk(id);
        if (!client) {
            res.status(404).json({ error: "Cliente no encontrado" });
            return;
        }
        await client.update(req.body); // Actualiza los datos del cliente
        await client.save();
        res.json({ data: client });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el cliente" });
    }
};

export const deleteClient = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const client = await Client.findByPk(id);
        if (!client) {
            res.status(404).json({ error: "Cliente no encontrado" });
            return;
        }
        await client.destroy(); // Elimina el cliente
        res.json({ mensaje: "Cliente eliminado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el cliente" });
    }
};

export const createClient = async (req: Request, res: Response) => {
    try {
        const client = await Client.create(req.body); // Crea un nuevo cliente
        res.json({ data: client });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear el cliente" });
    }
};
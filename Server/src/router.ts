import { Router } from "express";
import Client from "./models/Client.model";
import { createClient, updateClient, deleteClient, getClients } from "./handles/client";
import { body, param } from "express-validator";
import { handleInputerrors } from "./middleware";

const router = Router();

// Obtener todos los clientes
router.get("/", getClients);

// Crear un nuevo cliente
router.post(
    "/",
    body("ticket")
        .notEmpty().withMessage("El ticket es obligatorio")
        .isString().withMessage("El ticket debe ser un texto"),
    body("name")
        .notEmpty().withMessage("El nombre es obligatorio")
        .isString().withMessage("El nombre debe ser un texto"),
    body("plate")
        .notEmpty().withMessage("La placa es obligatoria")
        .isString().withMessage("La placa debe ser un texto"),
    body("carModel")
        .notEmpty().withMessage("El modelo del coche es obligatorio")
        .isString().withMessage("El modelo debe ser un texto"),
    body("paymentStatus")
        .notEmpty().withMessage("El estado de pago es obligatorio")
        .isIn(["Pendiente", "Pagado"]).withMessage("El estado de pago debe ser 'Pendiente' o 'Pagado'"),
    handleInputerrors,
    createClient
);

// Actualizar un cliente por su ticket
router.put(
    "/:ticket",
    param("ticket").notEmpty().withMessage("El ticket es obligatorio"),
    body("name")
        .optional()
        .isString().withMessage("El nombre debe ser un texto"),
    body("plate")
        .optional()
        .isString().withMessage("La placa debe ser un texto"),
    body("carModel")
        .optional()
        .isString().withMessage("El modelo debe ser un texto"),
    body("paymentStatus")
        .optional()
        .isIn(["Pendiente", "Pagado"]).withMessage("El estado de pago debe ser 'Pendiente' o 'Pagado'"),
    handleInputerrors,
    updateClient
);

// Actualizar el estado de pago de un cliente por su ticket
router.put(
    "/:ticket/payment",
    param("ticket").notEmpty().withMessage("El ticket es obligatorio"),
    body("paymentStatus")
        .notEmpty().withMessage("El estado de pago es obligatorio")
        .isIn(["Pendiente", "Pagado"]).withMessage("El estado de pago debe ser 'Pendiente' o 'Pagado'"),
    handleInputerrors,
    async (req, res): Promise<void> => {
        try {
            const { ticket } = req.params;
            const { paymentStatus } = req.body;

            // Buscar el cliente por su ticket
            const client = await Client.findOne({ where: { ticket } });
            if (!client) {
                res.status(404).json({ error: "Cliente no encontrado" });
                return;
            }

            // Actualizar el estado de pago
            client.paymentStatus = paymentStatus;
            await client.save();

            res.json({ data: client });
        } catch (error) {
            console.error("Error al actualizar el estado de pago:", error);
            res.status(500).json({ error: "Error al actualizar el estado de pago" });
        }
    }
);

// Eliminar un cliente por su ticket
router.delete(
    "/:ticket",
    param("ticket").notEmpty().withMessage("El ticket es obligatorio"),
    handleInputerrors,
    deleteClient
);

export default router;
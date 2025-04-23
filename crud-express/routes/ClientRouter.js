import express from 'express';
import { ClientController } from '../controllers/clientController.js';

const router = express.Router();

// Rutas para vistas y API
router.get('/', ClientController.getAllClients);
router.post('/', ClientController.registerClient);
router.get('/:id', ClientController.getClientById);
router.put('/:id', ClientController.updateClient);
router.delete('/:id', ClientController.deleteClient);

export default router;
import express from 'express';
import { ServiceController } from '../controllers/serviceController.js';

const router = express.Router();

// Rutas para API
router.get('/', ServiceController.getAllServices);
router.post('/', ServiceController.createService);
router.get('/:id', ServiceController.getServiceById);
router.put('/:id', ServiceController.updateService);
router.delete('/:id', ServiceController.deleteService);

export default router;


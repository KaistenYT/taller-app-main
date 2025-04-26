import express from 'express';
import { DeviceController } from '../controllers/deviceController.js';

const router = express.Router();

// Ruta para obtener dispositivos por cliente (debe ir antes de /:id)
router.get('/cliente/:idCliente', DeviceController.getDevicesByCliente);

// Rutas para API
router.get('/', DeviceController.getAllDevices);
router.post('/', DeviceController.createDevice);
router.get('/:id', DeviceController.getDeviceById);
router.put('/:id', DeviceController.updateDevice);
router.delete('/:id', DeviceController.deleteDevice);

export default router;

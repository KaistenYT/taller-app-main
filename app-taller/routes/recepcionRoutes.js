import express from 'express';
import { RecepcionController } from '../controllers/recepcionController.js';

const router = express.Router();

// Ruta para obtener recepciones por cliente (debe ir antes de /:id)
router.get('/cliente/:idCliente', RecepcionController.getRecepcionesByCliente);

// Rutas para API
router.get('/', RecepcionController.getAllRecepciones);
router.post('/', RecepcionController.createRecepcion);
router.get('/:id', RecepcionController.getRecepcionById);
router.put('/:id', RecepcionController.updateRecepcion);
router.delete('/:id', RecepcionController.deleteRecepcion);

export default router;

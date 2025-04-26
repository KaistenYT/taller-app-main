import Recepcion from '../model/recepcion.js';
import Client from '../model/client.js';
import Device from '../model/device.js';
export class RecepcionController {
    static async getAllRecepciones(req, res) {
        try {
            const recepciones = await Recepcion.getAll();
            const clientes = await Client.getAll();
            const dispositivos = await Device.getAll();
            
            if (req.path.startsWith('/api/')) {
                return res.json({
                    success: true,
                    data: recepciones
                });
            }
            res.render('pages/recepcion', { recepciones, clientes, dispositivos });
        } catch (error) {
            console.error('Error al obtener las recepciones:', error);
            if (req.path.startsWith('/api/')) {
                return res.status(500).json({ 
                    success: false,
                    error: 'Error al obtener las recepciones' 
                });
            }
            res.status(500).render('pages/error', { error: 'Error al cargar las recepciones' });
        }
    }

    static async getRecepcionById(req, res) {
        try {
            const recepcion = await Recepcion.getById(req.params.id);
            if (!recepcion) {
                return res.status(404).json({ 
                    success: false,
                    error: 'Recepción no encontrada' 
                });
            }
            return res.json({
                success: true,
                data: recepcion
            });
        } catch (error) {
            console.error('Error al obtener la recepción:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Error al obtener la recepción' 
            });
        }
    }

    static async createRecepcion(req, res) {
        try {
            const newRecepcion = await Recepcion.create({
                ...req.body,
                fechaRecibido: new Date()
            });
            
            return res.status(201).json({
                success: true,
                message: 'Recepción creada exitosamente',
                data: newRecepcion
            });
        } catch (error) {
            console.error('Error al crear la recepción:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Error al crear la recepción',
                details: error.message 
            });
        }
    }

    static async updateRecepcion(req, res) {
        try {
            const updated = await Recepcion.update(req.params.id, req.body);
            if (updated === 0) {
                return res.status(404).json({ 
                    success: false,
                    error: 'Recepción no encontrada' 
                });
            }
            return res.json({
                success: true,
                message: 'Recepción actualizada exitosamente',
                data: updated
            });
        } catch (error) {
            console.error('Error al actualizar la recepción:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Error al actualizar la recepción' 
            });
        }
    }

    static async deleteRecepcion(req, res) {
        try {
            const result = await Recepcion.delete(req.params.id);
            if (result === 0) {
                return res.status(404).json({ 
                    success: false,
                    error: 'Recepción no encontrada' 
                });
            }
            return res.json({
                success: true,
                message: 'Recepción eliminada exitosamente'
            });
        } catch (error) {
            console.error('Error al eliminar la recepción:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Error al eliminar la recepción' 
            });
        }
    }

    static async getRecepcionesByCliente(req, res) {
        try {
            const recepciones = await Recepcion.getByCliente(req.params.idCliente);
            return res.json({
                success: true,
                data: recepciones
            });
        } catch (error) {
            console.error('Error al obtener las recepciones del cliente:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Error al obtener las recepciones del cliente' 
            });
        }
    }
}

export default RecepcionController;
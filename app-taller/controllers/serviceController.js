import Service from '../model/service.js';
import Recepcion from '../model/recepcion.js';
export class ServiceController{

    static async getAllServices(req, res) {
        try {
            const servicios = await Service.getAll();
            const recepciones = await Recepcion.getAll();
            
            if (req.path.startsWith('/api/')) {
                return res.json({
                    success: true,
                    data: servicios
                });
            }
            res.render('pages/service', { servicios, recepciones});
        } catch (error) {
            console.error('Error al obtener los servicios:', error);
            if (req.path.startsWith('/api/')) {
                return res.status(500).json({ 
                    success: false,
                    error: 'Error al obtener los servicios' 
                });
            }
            res.status(500).render('pages/error', { error: 'Error al cargar los servicios' });
        }
    }

    static async getServiceById(req, res) {
        try {
            const servicio = await Service.getById(req.params.id);
            if (!servicio) {
                return res.status(404).json({ 
                    success: false,
                    error: 'Servicio no encontrado' 
                });
            }
            return res.json({
                success: true,
                data: servicio
            });
        } catch (error) {
            console.error('Error al obtener el servicio:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Error al obtener el servicio' 
            });
        }
    }

    static async createService(req, res) {
        try {
            const newService = await Service.create({
                ...req.body,
                
            });
            
            return res.status(201).json({
                success: true,
                message: 'Servicio creado exitosamente',
                data: newService
            });
        } catch (error) {
            console.error('Error al crear el servicio:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Error al crear el servicio',
                details: error.message 
            });
        }
    }

    static async updateService(req, res) {
        try {
            const updated = await Service.update(req.params.id, req.body);
            if (updated === 0) {
                return res.status(404).json({ 
                    success: false,
                    error: 'Servicio no encontrado' 
                });
            }
            return res.json({ 
                success: true, 
                message: 'Servicio actualizado exitosamente',
                data: updated 
            });
        } catch (error) {
            console.error('Error al actualizar el servicio:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Error al actualizar el servicio' 
            });
        }
    }

    static async deleteService(req, res) {
        try {
            const result = await Service.delete(req.params.id);
            if (result === 0) {
                return res.status(404).json({ 
                    success: false,
                    error: 'Servicio no encontrado' 
                });
            }
            return res.json({ 
                success: true, 
                message: 'Servicio eliminado exitosamente'
            });
        } catch (error) {
            console.error('Error al eliminar el servicio:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Error al eliminar el servicio' 
            });
        }
    }
}
import Service from '../model/service.js';
import Recepcion from '../model/recepcion.js';
export class ServiceController{

    static async getAllServices(req, res) {
        try {
            console.log('Fetching all services from database');
            const servicios = await Service.getAll();
            console.log('Successfully fetched services:', servicios);
            
            if (req.path.startsWith('/api/')) {
                return res.json({
                    success: true,
                    data: servicios
                });
            }
            
            const recepciones = await Recepcion.getAll();
            res.render('pages/service', { servicios, recepciones });
        } catch (error) {
            console.error('Error details:', {
                message: error.message,
                stack: error.stack,
                rawError: error
            });
            if (req.path.startsWith('/api/')) {
                return res.status(500).json({ 
                    success: false,
                    error: 'Error al obtener los servicios',
                    details: process.env.NODE_ENV === 'development' ? error.message : undefined
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
            const newService = await Service.registerService(req.body);
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
            console.log('Actualizando servicio ID:', req.params.id, 'con datos:', req.body);
            const updated = await Service.update(req.params.id, req.body);
            
            if (updated === 0) {
                return res.status(404).json({ 
                    success: false,
                    error: 'Servicio no encontrado' 
                });
            }
            
            // Obtener y devolver el servicio actualizado
            const updatedService = await Service.getById(req.params.id);
            return res.json({ 
                success: true, 
                message: 'Servicio actualizado exitosamente',
                data: updatedService
            });
            
        } catch (error) {
            console.error('Error al actualizar servicio:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Error al actualizar el servicio',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }

    static async deleteService(req, res) {
        try {
            console.log(`Intentando eliminar servicio con ID: ${req.params.id}`);
            const result = await Service.deleteService(req.params.id);
            console.log(`Resultado de eliminación:`, result);
            
            if (result === 0) {
                console.log('Servicio no encontrado');
                return res.status(404).json({ 
                    success: false,
                    error: 'Servicio no encontrado' 
                });
            }
            
            console.log('Servicio eliminado exitosamente');
            return res.json({ 
                success: true, 
                message: 'Servicio eliminado exitosamente'
            });
        } catch (error) {
            console.error('Error detallado al eliminar servicio:', {
                message: error.message,
                stack: error.stack,
                rawError: error
            });
            return res.status(500).json({ 
                success: false,
                error: 'Error al eliminar el servicio',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
}
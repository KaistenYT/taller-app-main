import Device from '../model/device.js';
import Client from '../model/client.js';

export class DeviceController {
    static async getAllDevices(req, res) {
        try {
            const devices = await Device.getAll();
            const clientes = await Client.getAll();
            
            if (req.path.startsWith('/api/')) {
                return res.json({
                    success: true,
                    data: devices
                });
            }
            res.render('pages/device', { devices, clientes });
        } catch (error) {
            console.error('Error al obtener los dispositivos:', error);
            if (req.path.startsWith('/api/')) {
                return res.status(500).json({ 
                    success: false,
                    error: 'Error al obtener los dispositivos' 
                });
            }
            res.status(500).render('pages/error', { error: 'Error al cargar los dispositivos' });
        }
    }

    static async getDeviceById(req, res) {
        try {
            const device = await Device.getById(req.params.id);
            if (!device) {
                return res.status(404).json({ 
                    success: false,
                    error: 'Dispositivo no encontrado' 
                });
            }
            return res.json({
                success: true,
                data: device
            });
        } catch (error) {
            console.error('Error al obtener el dispositivo:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Error al obtener el dispositivo' 
            });
        }
    }

    static async createDevice(req, res) {
        try {
            const newDevice = await Device.create(req.body);
            return res.status(201).json({
                success: true,
                message: 'Dispositivo creado exitosamente',
                data: newDevice
            });
        } catch (error) {
            console.error('Error al crear el dispositivo:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Error al crear el dispositivo' 
            });
        }
    }

    static async updateDevice(req, res) {
        try {
            const updated = await Device.update(req.params.id, req.body);
            if (updated === 0) {
                return res.status(404).json({ 
                    success: false,
                    error: 'Dispositivo no encontrado' 
                });
            }
            return res.json({
                success: true,
                message: 'Dispositivo actualizado exitosamente',
                data: updated
            });
        } catch (error) {
            console.error('Error al actualizar el dispositivo:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Error al actualizar el dispositivo' 
            });
        }
    }

    static async deleteDevice(req, res) {
        try {
            const result = await Device.delete(req.params.id);
            if (result === 0) {
                return res.status(404).json({ 
                    success: false,
                    error: 'Dispositivo no encontrado' 
                });
            }
            return res.json({
                success: true,
                message: 'Dispositivo eliminado exitosamente'
            });
        } catch (error) {
            console.error('Error al eliminar el dispositivo:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Error al eliminar el dispositivo' 
            });
        }
    }

    static async getDevicesByCliente(req, res) {
        try {
            const devices = await Device.getByCliente(req.params.idCliente);
            return res.json({
                success: true,
                data: devices
            });
        } catch (error) {
            console.error('Error al obtener los dispositivos del cliente:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Error al obtener los dispositivos del cliente' 
            });
        }
    }
}

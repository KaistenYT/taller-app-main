import Client from "../model/client.js";

export class ClientController {
    static async getAllClients(req, res) {
        try {
            const clients = await Client.getAll();
            if (req.path.startsWith('/api/')) {
                return res.json(clients);
            }
            res.render('pages/client', { clients });
        } catch (error) {
            console.error('Error al obtener los clientes:', error);
            if (req.path.startsWith('/api/')) {
                return res.status(500).json({ error: 'Error al obtener los clientes' });
            }
            res.status(500).render('pages/error', { error: 'Error al obtener los clientes' });
        }
    }

    static async getClientData() {
        try {
            return await Client.getAll();
        } catch (error) {
            console.error('Error al obtener los clientes:', error);
            return [];
        }
    }

    static async getClientById(req, res) {
        try {
            const client = await Client.getById(req.params.id);
            if (!client) {
                return res.status(404).json({ 
                    success: false, 
                    error: 'Cliente no encontrado' 
                });
            }
            return res.json({ 
                success: true, 
                data: client 
            });
        } catch (error) {
            console.error('Error al obtener el cliente:', error);
            return res.status(500).json({ 
                success: false, 
                error: 'Error al obtener el cliente' 
            });
        }
    }

    static async registerClient(req, res) {
        try {
            const newClient = await Client.registerClient(req.body);
            return res.status(201).json({ 
                success: true, 
                message: 'Cliente creado exitosamente',
                data: newClient 
            });
        } catch (error) {
            console.error('Error al registrar el cliente:', error);
            return res.status(500).json({ 
                success: false, 
                error: 'Error al registrar el cliente' 
            });
        }
    }

    static async updateClient(req, res) {
        try {
            const updated = await Client.updateClient(req.params.id, req.body);
            if (updated === 0) {
                return res.status(404).json({ 
                    success: false, 
                    error: 'Cliente no encontrado' 
                });
            }
            return res.json({ 
                success: true, 
                message: 'Cliente actualizado exitosamente' 
            });
        } catch (error) {
            console.error('Error al actualizar el cliente:', error);
            return res.status(500).json({ 
                success: false, 
                error: 'Error al actualizar el cliente' 
            });
        }
    }

    static async deleteClient(req, res) {
        try {
            const result = await Client.deleteClient(req.params.id);
            if (result === 0) {
                return res.status(404).json({ 
                    success: false, 
                    error: 'Cliente no encontrado' 
                });
            }
            return res.json({ 
                success: true, 
                message: 'Cliente eliminado exitosamente' 
            });
        } catch (error) {
            console.error('Error al eliminar el cliente:', error);
            return res.status(500).json({ 
                success: false, 
                error: 'Error al eliminar el cliente' 
            });
        }
    }
}
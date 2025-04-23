import db from '../config/databaseCon.js';

class Device {
    static async getAll() {
        try {
            return await db('device')
                .select(
                    'device.*',
                    'cliente.descripcion as nombreCliente'
                )
                .leftJoin('cliente', 'device.idCliente', 'cliente.idCliente')
                .orderBy('device.marca', 'asc');
        } catch (error) {
            console.error('Error en getAll:', error);
            throw error;
        }
    }

    static async getById(id) {
        try {
            const device = await db('device')
                .select(
                    'device.*',
                    'cliente.descripcion as nombreCliente'
                )
                .leftJoin('cliente', 'device.idCliente', 'cliente.idCliente')
                .where('device.idDevice', Number(id))
                .first();
            return device;
        } catch (error) {
            console.error('Error en getById:', error);
            throw error;
        }
    }

    static async getByCliente(idCliente) {
        try {
            return await db('device')
                .select(
                    'device.*',
                    'cliente.descripcion as nombreCliente'
                )
                .leftJoin('cliente', 'device.idCliente', 'cliente.idCliente')
                .where('device.idCliente', Number(idCliente))
                .orderBy('device.marca', 'asc');
        } catch (error) {
            console.error('Error en getByCliente:', error);
            throw error;
        }
    }

    static async create(data) {
        try {
            const [id] = await db('device').insert({
                marca: data.marca,
                modelo: data.modelo,
                idCliente: Number(data.idCliente)
            });
            return this.getById(id);
        } catch (error) {
            console.error('Error en create:', error);
            throw error;
        }
    }

    static async update(id, data) {
        try {
            const updateData = {
                marca: data.marca,
                modelo: data.modelo,
                idCliente: data.idCliente ? Number(data.idCliente) : undefined
            };

            // Eliminar propiedades undefined
            Object.keys(updateData).forEach(key => 
                updateData[key] === undefined && delete updateData[key]
            );

            const result = await db('device')
                .where('idDevice', Number(id))
                .update(updateData);

            if (result > 0) {
                return this.getById(id);
            }
            return 0;
        } catch (error) {
            console.error('Error en update:', error);
            throw error;
        }
    }

    static async delete(id) {
        try {
            return await db('device')
                .where('idDevice', Number(id))
                .delete();
        } catch (error) {
            console.error('Error en delete:', error);
            throw error;
        }
    }
}

export default Device;

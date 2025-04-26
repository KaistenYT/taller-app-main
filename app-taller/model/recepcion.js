import db from '../config/databaseCon.js';

class Recepcion {
    static async getAll() {
        try {
            return await db('recepcion')
                .select(
                    'recepcion.*',
                    'cliente.descripcion as nombreCliente',
                    'device.marca as marcaDispositivo',
                    'device.modelo as modeloDispositivo'
                )
                .leftJoin('cliente', 'recepcion.idCliente', 'cliente.idCliente')
                .leftJoin('device', 'recepcion.idDevice', 'device.idDevice')
                .orderBy('recepcion.fechaRecibido', 'desc');
        } catch (error) {
            console.error('Error en getAll:', error);
            throw error;
        }
    }

    static async getById(id) {
        try {
            const recepcion = await db('recepcion')
                .select(
                    'recepcion.*',
                    'cliente.descripcion as nombreCliente',
                    'device.marca as marcaDispositivo',
                    'device.modelo as modeloDispositivo'
                )
                .leftJoin('cliente', 'recepcion.idCliente', 'cliente.idCliente')
                .leftJoin('device', 'recepcion.idDevice', 'device.idDevice')
                .where('recepcion.idRecepcion', Number(id))
                .first();
            return recepcion;
        } catch (error) {
            console.error('Error en getById:', error);
            throw error;
        }
    }

    static async getByCliente(idCliente) {
        try {
            return await db('recepcion')
                .select(
                    'recepcion.*',
                    'cliente.descripcion as nombreCliente',
                    'device.marca as marcaDispositivo',
                    'device.modelo as modeloDispositivo'
                )
                .leftJoin('cliente', 'recepcion.idCliente', 'cliente.idCliente')
                .leftJoin('device', 'recepcion.idDevice', 'device.idDevice')
                .where('recepcion.idCliente', Number(idCliente))
                .orderBy('recepcion.fechaRecibido', 'desc');
        } catch (error) {
            console.error('Error en getByCliente:', error);
            throw error;
        }
    }

    static async create(data) {
        try {
            const [id] = await db('recepcion').insert({
                fechaRecibido: data.fechaRecibido,
                idDevice: Number(data.idDevice),
                idCliente: Number(data.idCliente),
                estado: data.estado || 'Pendiente',
                observacion: data.observacion,
                falla: data.falla
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
                idDevice: data.idDevice ? Number(data.idDevice) : undefined,
                idCliente: data.idCliente ? Number(data.idCliente) : undefined,
                estado: data.estado,
                observacion: data.observacion,
                falla: data.falla
            };

            // Eliminar propiedades undefined
            Object.keys(updateData).forEach(key => 
                updateData[key] === undefined && delete updateData[key]
            );

            const result = await db('recepcion')
                .where('idRecepcion', Number(id))
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
            return await db('recepcion')
                .where('idRecepcion', Number(id))
                .delete();
        } catch (error) {
            console.error('Error en delete:', error);
            throw error;
        }
    }
}

export default Recepcion;
import db from '../config/databaseCon.js';

class Service{
    static async getAll(){
        return await db('servicio').select('*');
    }

    static async getById(id){
        return await db('servicio').where('idServicio', Number(id)).first();
    }

    static async registerService(service){
        const [id] = await db('servicio').insert(service);
        return this.getById(id);
    }

    static async update(id, serviceData) {
        return await db('servicio')
            .where('idServicio', Number(id))
            .update({
                idRecepcion: serviceData.idRecepcion,
                descripcion: serviceData.descripcion
            });
    }

    static async updateService(id, service){
        const result = await db('servicio').where('idServicio', Number(id)).update(service);
        if (result > 0) {
            return this.getById(id);
        }
        return result;
    }
    
    static async deleteService(id){
        return await db('servicio').where('idServicio', Number(id)).del();
    }
}

export default Service;
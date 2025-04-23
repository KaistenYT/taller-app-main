import db from '../config/databaseCon.js';

class Client {
   static async getAll(){
    return await db('cliente').select('*');
   }

   static async getById(id){
    return await db('cliente').where('idCliente', Number(id)).first();
   }

   static async registerClient(client){
    const [id] = await db('cliente').insert(client);
    return this.getById(id);
   }

   static async updateClient(id, client){
    const result = await db('cliente').where('idCliente', Number(id)).update(client);
    if (result > 0) {
      return this.getById(id);
    }
    return result;
   }
   
   static async deleteClient(id){
    return await db('cliente').where('idCliente', Number(id)).del();
   }
}

export default Client;
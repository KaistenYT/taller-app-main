import knex from 'knex';

const db = knex({
    client: 'sqlite3', 
    connection: {
      filename: './mydb.sqlite',
    },
});

// Crear la tabla cliente
async function createClientTable() {
    const exists = await db.schema.hasTable('cliente');
    if (!exists) {
        await db.schema.createTable('cliente', (table) => {
            table.increments('idCliente').primary();
            table.string('descripcion');
            table.string('telefono');
        });
        console.log("table client created");
    } else {
        console.log("table client already exists");
    }
}

async function createDeviceTable() {
    const exists = await db.schema.hasTable('device')
    if (!exists){
        await db.schema.createTable('device', (table)=>{
            table.increments('idDevice').primary();
            table.string('marca').notNullable();
            table.string('modelo').notNullable();
            table.integer('idCliente').notNullable();
            table.foreign('idCliente').references('cliente.idCliente');
        });
        console.log('Table device created');
    }else{
        console.log('Table device already exists');
    }
}

// Crear la tabla recepcion
async function createReceptionTable() {
    const exists = await db.schema.hasTable('recepcion');
    if (!exists) {
        await db.schema.createTable('recepcion', (table) => {
            table.increments('idRecepcion').primary();
            table.date('fechaRecibido').notNullable();
            table.integer('idDevice').notNullable();
            table.integer('idCliente').notNullable();
            table.string('estado').defaultTo('Pendiente');
            table.string('observacion');
            table.string('falla').notNullable();
            table.foreign('idDevice').references('device.idDevice');
            table.foreign('idCliente').references('cliente.idCliente');
        });
        console.log("table reception created");
    } else {
        console.log("table reception already exists");
    }
}

async function createInitialTables() {
    await createClientTable();
    await createDeviceTable();
    await createReceptionTable();
    console.log("All tables created");
}

createInitialTables();

export default db;
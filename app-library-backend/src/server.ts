import 'dotenv/config';
import { Server } from 'http';
import app from './app';
import db from './database/init';

let server: Server | null = null;

async function databaseInit() {
    const isDevelopment: boolean = process.env.NODE_ENV !== 'production';
    await db.authenticate();
    // sync crea las tablas, alter modifica las tablas ajustandose al modelo
    await db.sync({ alter: isDevelopment });
    console.log('Database succesfully connected!!');
}

async function main() {
    try {
        await databaseInit();
        const BACKEND_PORT: number = parseInt(process.env.APP_PORT || '3000', 10);
        server = app.listen(BACKEND_PORT, () => {
            console.log(`HTTP Server listen on port: ${BACKEND_PORT}`);
        });
    } catch (error: unknown) {
        console.log(error);
    }
}

function gracefullyShotdown() {
    console.log('Stopping service...');
    db.close();
    if (server) {
        server.close(() => {
            console.log('Server terminated');
            return process.exit(0);
        });
    }
    process.exit(1);
}

process.on('SIGTERM', gracefullyShotdown);
process.on('SIGINT', gracefullyShotdown);

main();

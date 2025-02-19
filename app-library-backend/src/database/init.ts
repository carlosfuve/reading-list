import { Dialect, Sequelize } from 'sequelize';

const DB_NAME: string = process.env.DATABASE_DBNAME as string || '';
const DB_USER: string = process.env.DATABASE_USER as string || '';
const DB_PASS: string = process.env.DATABASE_PASSWORD as string || '';
const DB_HOST: string = process.env.DATABASE_HOST as string || '';
const DB_PORT: number = parseInt(process.env.DATABASE_PORT || '5432', 10) as number;
const DB_DRIV: Dialect = process.env.DATABASE_DIALECT as Dialect || 'postgres';

const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DRIV,
    logging: process.env.NODE_ENV === 'production' ? false : console.log
});

export default db;

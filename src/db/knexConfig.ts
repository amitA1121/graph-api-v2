import dotenv from "dotenv";

dotenv.config();

export const CLIENT = process.env.DB_CLIENT;
export const HOST = process.env.DB_HOST;
export const PORT_NUMBER = Number(process.env.DB_PORT)
export const USER_NAME = process.env.DB_USER;
export const PASSWORD = process.env.DB_PASS;
export const DATABASE_NAME = process.env.DB_NAME;
export const DIRECTORY = process.env.DB_MIGRATIONS_DIR;
export const EXTENSION = process.env.DB_MIGRATIONS_EXT;
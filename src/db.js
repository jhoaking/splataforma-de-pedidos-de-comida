import { createPool } from "mysql2/promise";
import { DB_DATABASE,DB_HOST,DB_PASSWORD,DB_PORT,DB_USER } from "./config.js";

export const connection = createPool({
    port : DB_PORT,
    host: DB_HOST,
    user : DB_USER,
    password : DB_PASSWORD,
    database: DB_DATABASE
})
import { config } from "dotenv";

config();
export const PORT = process.env.PORT || 3000
export const DB_PORT = process.env.DB_PORT || 3306
export const DB_HOST = process.env.DB_HOST || "example_host"
export const DB_USER = process.env.DB_USER || "example_user"
export const DB_PASSWORD = process.env.DB_PASSWORD || "example_password"
export const DB_DATABASE = process.env.DB_DATABASE || "example_db";
export const SALT_ROUNDS = process.env.SALT_ROUNDS || 10
export const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY || "example_jwt_key"

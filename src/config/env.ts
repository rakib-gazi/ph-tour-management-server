import dotenv from "dotenv";
dotenv.config();
export const envVars = {
    PORT : process.env.PORT,
    DB_USER : process.env.DB_USER,
    DB_PASS : process.env.DB_PASS,
    DB_NAME : process.env.DB_NAME,
    NODE_ENV : process.env.NODE_ENV,
}
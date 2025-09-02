import dotenv from "dotenv";
dotenv.config();
export const envVars = {
    PORT : process.env.PORT,
    DB_USER : process.env.DB_USER,
    DB_PASS : process.env.DB_PASS,
    DB_NAME : process.env.DB_NAME,
    NODE_ENV : process.env.NODE_ENV,
    JWT_TOKEN : process.env.JWT_TOKEN,
    JWT_EXP : process.env.JWT_EXP,
    SALT_ROUND : process.env.SALT_ROUND,
    SUPER_ADMIN_EMAIL : process.env.SUPER_ADMIN_EMAIL,
    SUPER_ADMIN_PASS : process.env.SUPER_ADMIN_PASS,
}
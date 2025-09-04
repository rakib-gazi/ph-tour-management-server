import dotenv from "dotenv";
dotenv.config();
interface EnvConfig {
  PORT: string;
  DB_USER: string;
  DB_PASS: string;
  DB_NAME: string;
  NODE_ENV: "development" | "production";
  JWT_TOKEN: string;
  JWT_EXP: string;
  SALT_ROUND: number;
  SUPER_ADMIN_EMAIL: string;
  SUPER_ADMIN_PASS: string;
  Refresh_Token: string;
  Refresh_EXP: string;

  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CALLBACK_URL: string;
  Express_SESSION: string;
  FRONTED_URL: string;
}
export const envVars = {
  PORT: process.env.PORT,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
  NODE_ENV: process.env.NODE_ENV,
  JWT_TOKEN: process.env.JWT_TOKEN,
  JWT_EXP: process.env.JWT_EXP,
  SALT_ROUND: process.env.SALT_ROUND,
  SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL,
  SUPER_ADMIN_PASS: process.env.SUPER_ADMIN_PASS,
  Refresh_Token: process.env.Refresh_Token,
  Refresh_EXP: process.env.Refresh_EXP,
};
const loadEnvVariables = (): EnvConfig => {
  const requiredEnvVariables: string[] = [
    "PORT",
    "DB_USER",
    "DB_PASS",
    "DB_NAME",
    "NODE_ENV",
    "JWT_TOKEN",
    "JWT_EXP",
    "SALT_ROUND",
    "SUPER_ADMIN_EMAIL",
    "SUPER_ADMIN_PASS",
    "Refresh_Token",
    "Refresh_EXP",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CALLBACK_URL",
    "Express_SESSION",
    "FRONTED_URL",
  ];
  requiredEnvVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing Require Environment variable ${key}`);
    }
  });
  return {
    PORT: process.env.PORT as string,

    DB_USER: process.env.DB_USER as string,
    DB_PASS: process.env.DB_PASS as string,
    DB_NAME: process.env.DB_NAME as string,
    
    NODE_ENV: process.env.NODE_ENV as "development" | "production",

    JWT_TOKEN: process.env.JWT_TOKEN as string,
    JWT_EXP: process.env.JWT_EXP as string,

    SALT_ROUND: Number(process.env.SALT_ROUND),

    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    SUPER_ADMIN_PASS: process.env.SUPER_ADMIN_PASS as string,

    Refresh_Token: process.env.Refresh_Token as string,
    Refresh_EXP: process.env.Refresh_EXP as string,

    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
    Express_SESSION: process.env.Express_SESSION as string,
    FRONTED_URL: process.env.FRONTED_URL as string,
  };
};

export const envVariable = loadEnvVariables();

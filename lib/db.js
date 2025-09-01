import pkg from "@next/env";
const { loadEnvConfig } = pkg;
import mysql from "mysql2/promise";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

export async function getConnection() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  return connection;
}

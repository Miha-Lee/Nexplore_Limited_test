import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const port: number = Number(process.env.POSTGRES_PORT);

const pool = new Pool({
  user: process.env.POSTGRES_USERNAME,
  host: process.env.POSTGRES_LOCALHOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port,
});

export default pool;

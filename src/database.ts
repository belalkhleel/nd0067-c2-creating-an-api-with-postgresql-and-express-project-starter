import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Pool({
  host: process.env.DB_HOST,
  database: process.env.ENV === 'test' 
    ? process.env.DB_TEST_NAME
    : process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT as string),
});

export default client;
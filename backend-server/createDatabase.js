// createDatabase.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const DB_NAME = process.env.MYSQL_DATABASE || 'urlshortener';

const connectionConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  port: process.env.MYSQL_PORT || 3306
};

async function createDatabase() {
  try {
    const connection = await mysql.createConnection(connectionConfig);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    console.log(`✅ Database '${DB_NAME}' created or already exists.`);
    await connection.end();
  } catch (error) {
    console.error('❌ Error creating database:', error.message);
    process.exit(1);
  }
}

createDatabase();

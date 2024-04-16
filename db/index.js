import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config({
  path:'./.env'
})

const db = await mysql.createConnection({
          host:process.env.DB_HOST ,
          user: process.env.DB_USERNAME,
          database: 'Blood_Bank_Management',
          port: 3306,
          password:process.env.DB_PASSWORD,
        });
console.log('DB connected')
      


export {db};


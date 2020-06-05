/* eslint-disable no-nested-ternary */
/* eslint-disable import/extensions */
/* eslint-disable import/first */
import "dotenv/config.js";
import mysql from "mysql2";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  port: 3306,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
  keepAliveInitialDelay: 10000,
  enableKeepAlive: true,
});

const promisePool = pool.promise();

export default promisePool;

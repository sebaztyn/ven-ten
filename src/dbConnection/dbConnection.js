/* eslint-disable no-nested-ternary */
/* eslint-disable import/extensions */
/* eslint-disable import/first */
import "dotenv/config.js";
import mysql from "mysql2";

const environment = process.env.NODE_ENV;
const pool = mysql.createPool({
  host:
    environment === "production"
      ? process.env.DB_HOST_PROD
      : process.env.DB_HOST,
  user:
    environment === "production"
      ? process.env.DB_USER_PROD
      : process.env.DB_USER,
  password:
    environment === "production" ? process.env.DB_PWD_PROD : process.env.DB_PWD,
  port: 3306,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
  keepAliveInitialDelay: 10000,
  enableKeepAlive: true,
});

const promisePool = pool.promise();

export default promisePool;

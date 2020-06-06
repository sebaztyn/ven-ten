/* eslint-disable import/extensions */
/* eslint-disable no-nested-ternary */
// eslint-disable-next-line import/extensions
import "dotenv/config.js";
import fs from "fs";
import mysql from "mysql";

const environment = process.env.NODE_ENV;
const testDB = process.env.DB_TEST;
const developmentDB = process.env.DB_DEV;
const productionDB = process.env.DB_PROD;
const appRoot = `${process.env.PWD}/src/assets/car_owners_data.csv`;
const queryString = `LOAD DATA LOCAL INFILE '${appRoot}'
INTO TABLE Carowners FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\r\n' IGNORE 1 ROWS;`;

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
  database:
    environment === "production"
      ? productionDB
      : environment === "test"
      ? testDB
      : developmentDB,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
  keepAliveInitialDelay: 10000,
  enableKeepAlive: true,
});

const loadCSV = async () => {
  return pool.query(queryString, (error, results, fields) => {
    if (error) throw error;
    // console.log("The solution is: ", results[0].solution);
    console.log(results);
    pool.end();
  });
};

loadCSV();

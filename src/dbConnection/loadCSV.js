/* eslint-disable no-nested-ternary */
// eslint-disable-next-line import/extensions
import "dotenv/config.js";
import fs from "fs";
import mysql from "mysql2";

const environment = process.env.NODE_ENV;
const testDB = process.env.DB_TEST;
const developmentDB = process.env.DB_DEV;
const productionDB = process.env.DB_PROD;
const appRoot = `${process.env.PWD}/src/assets/car_owners_data.csv`;
const queryString = `LOAD DATA LOCAL INFILE '${appRoot}'
INTO TABLE carowners FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\r\n' IGNORE 1 ROWS;`;

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
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
  })
  .promise();

const loadCSV = async () => {
  return pool
    .query({
      sql: queryString,
      database:
        environment === "production"
          ? productionDB
          : environment === "test"
          ? testDB
          : developmentDB,
      infileStreamFactory: () => fs.createReadStream(appRoot),
    })
    .then((result) => {
      console.log("result :>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ", result);
      console.log("CSV file loaded successfully!!");
    })
    .then(() => pool.end())
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

loadCSV();

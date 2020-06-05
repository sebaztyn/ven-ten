/* eslint-disable no-nested-ternary */
/* eslint-disable quotes */
import "dotenv/config.js";
import promisePool from "./dbConnection.js";

const environment = process.env.NODE_ENV;
const testDB = process.env.DB_TEST;
const developmentDB = process.env.DB_DEV;
const productionDB = process.env.DB_PROD;

const createDB = () => {
  promisePool
    .query(
      "CREATE DATABASE IF NOT EXISTS ??",
      environment === "production"
        ? productionDB
        : environment === "test"
        ? testDB
        : developmentDB,
    )
    .then(() => console.log("DB created successfully!!"))
    .then(() => promisePool.end())
    .catch((err) => console.log(err));
};

createDB();

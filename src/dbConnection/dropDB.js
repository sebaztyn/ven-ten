/* eslint-disable no-nested-ternary */
import "dotenv/config.js";
import promisePool from "./dbConnection.js";

const environment = process.env.NODE_ENV;
const testDB = process.env.DB_TEST;
const developmentDB = process.env.DB_DEV;
const productionDB = process.env.DB_PROD;

const dropDB = () => {
  promisePool
    .query(
      "DROP DATABASE IF EXISTS ??",
      environment === "production"
        ? productionDB
        : environment === "test"
        ? testDB
        : developmentDB,
    )
    .then(() => console.log("DB dropped successfully!!"))
    .then(() => promisePool.end())
    .catch((err) => console.log(err));
};

dropDB();

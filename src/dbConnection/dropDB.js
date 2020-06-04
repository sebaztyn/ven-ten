/* eslint-disable no-nested-ternary */
// eslint-disable-next-line import/extensions
import "dotenv/config";

const promisePool = require("./dbConnection.js");

const environment = process.env.NODE_ENV;
const testDB = process.env.DB_TEST;
const developmentDB = process.env.DB_DEV;
const productionDB = process.env.DB_PROD;

const dropDB = () => {
  promisePool
    .query(
      `DROP SCHEMA IF EXISTS ${
        environment === "production"
          ? productionDB
          : environment === "test"
          ? testDB
          : developmentDB
      };`,
    )
    .then(() => console.log("DB dropped successfully!!"))
    .then(() => promisePool.end())
    .catch((err) => console.log(err));
};

dropDB();

/* eslint-disable import/extensions */
/* eslint-disable no-nested-ternary */
// eslint-disable-next-line import/extensions
import "dotenv/config.js";
import db from "../models/index.js";

const { sequelize } = db;

const appRoot = `${process.env.PWD}/src/assets/car_owners_data.csv`;
const queryString = `COPY carowners FROM '${appRoot}' HEADER CSV DELIMITER ',';`;

const loadCSV = async () => {
  try {
    const results = await sequelize.query(queryString);
    console.log("results :>> ", results);
    return results;
  } catch (error) {
    console.log("error", error);
  }
};

loadCSV();

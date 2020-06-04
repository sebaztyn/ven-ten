// eslint-disable-next-line import/extensions
import "dotenv/config";

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DEV,
    host: process.env.DB_HOST,
    dialect: "mysql",
    migrationStorage: "json",
    migrationStoragePath: "dev-meta-data.json",
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_TEST,
    host: process.env.DB_HOST,
    dialect: "mysql",
    migrationStorage: "json",
    migrationStoragePath: "dev-meta-data.json",
  },
  production: {
    username: process.env.DB_USER_PROD,
    password: process.env.DB_PWD_PROD,
    database: process.env.DB_PROD,
    host: process.env.DB_HOST_PROD,
    dialect: "mysql",
    migrationStorage: "json",
    migrationStoragePath: "dev-meta-data.json",
  },
};

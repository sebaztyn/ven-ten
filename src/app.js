/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/first */
/* eslint-disable quotes */
require("@babel/register");

import errorHandler from "errorhandler";
import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import methodOverride from "method-override";
import allRoutes from "./routes";

const isProduction = process.env.NODE_ENV === "production";

// Create global app object
const app = express();

app.use(cors());

// Normal express config defaults
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Documentation
app.use(methodOverride());

if (!isProduction) {
  app.use(errorHandler());
}
app.use(allRoutes);

app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to Ven-Ten Challenge",
  }),
);
// / catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// / error handlers
// development error handler
// will print stacktrace
if (!isProduction) {
  app.use((err, req, res) => {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

const port = process.env.NODE_ENV === "test" ? 3001 : 3000;
const server = app.listen(process.env.PORT || port, () => {
  console.log(`Listening on port ${server.address().port}`);
});

export default server;

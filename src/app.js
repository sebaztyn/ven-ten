/* eslint-disable no-underscore-dangle */
/* eslint-disable import/first */
/* eslint-disable quotes */
import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import "dotenv/config";
import cors from "cors";
import errorhandler from "errorhandler";
import methodOverride from "method-override";
import allRoutes from "../routes";

import indexRouter from "../routes/index.js";
import usersRouter from "../routes/users.js";

const app = express();
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const isProduction = process.env.NODE_ENV === "production";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Documentation
app.use(methodOverride());

app.use(express.static(`${__dirname}/public`));

if (!isProduction) {
  app.use(errorhandler());
}
app.use(allRoutes);

app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to Korapay Backend Technical Challenge",
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

//export default app;

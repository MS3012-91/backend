const express = require("express");
const appRouter = require("./routes");
const {errors} = require ('./middleware')

const app = express();

app.use(express.json());
app.use("/api", appRouter);
app.use(errors.dbErrorHandler, errors.errorHandler);

module.exports = app;

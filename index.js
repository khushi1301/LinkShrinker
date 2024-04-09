const express = require("express");
const cors = require("cors");
const db = require("./database/db");
const shortenUrlRouter = require("./routes/shortenUrl");
const redirectRouter = require("./routes/redirect");
const { port } = require("./config/default");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/shorten-url", shortenUrlRouter);
app.use("/", redirectRouter);

const errorHandler = (err, req, res, next) => {
  const status = err.status || 404;
  res.status(status).send(err.message);
};
app.use(errorHandler);

app.listen(port, () => console.log(`Short URL app listening on port ${port}`));

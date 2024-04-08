const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const routes = require("./routes/v1/index");
// Social and Manual Registration & logins routes
// require("./routes/v1/index")(app);

const app = express();

dotenv.config();

mongoose
.connect(process.env.DB_Med, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((res) => {
    console.log("connected to db");

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/", routes);

    app.use((req, res, next) => {
      res.status(404).send("Not found");
    });

    require("./utils/mqtt");

    app.listen(5002, () => {
      console.log("server up and runing on port 5002!");
    });
  })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => {
    console.log(err);
  });

process.on("unhandledRejection", (err) => {
  console.log(`send this error ${err.stack}`);
});

const express = require("express");
const mongoose = require("mongoose");
// const dotenv = require("dotenv");
const cors = require("cors");
const https = require("https")
const path = require('path');
const routes = require("./routes/v1/index");
const morgan = require("morgan");
// Social and Manual Registration & logins routes
// require("./routes/v1/index")(app);
require("dotenv").config();
const app = express();
const createError = require('http-errors');
 var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended : true}))
app.use(morgan('dev'))
app.use(bodyParser.json())
// app.use(express.static(__dirname + './public/'));
app.use(express.static('public'));  
app.use('/uploads', express.static('uploads')); 
  
//app.use('/public/uploads',express.static('uploads'))

// dotenv.config();

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
    // consoleapp.use(express.static(path.join(__dirname, "public")));
    app.use('/upload',express.static('upload'));
    //app.use('/public/uploads',express.static('uploads'));
    app.use("/", routes);

    app.use((req, res, next) => {
      res.status(404).send("Not found");
    });

    require("./utils/mqtt");
   // require("./utils/errorHandler");

   //___________error handler____________//

   app.use((req, res, next)=>{
    //  const err = new Error('Not Found');
    //  error.status = 404;
    //  next(err) 
    next(createError(404, 'Not Found'));
   });

   app.use((err,req,res,next)=>{
     res.status(err.status || 500);
      res.send({error:{
        status : err.status || 500,
        message : err.message 
      }});
   });
   //___________error handler____________//

    app.listen(5003, () => {
      console.log("server up and runing on port 5003!");
    });
  })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => {
    console.log(err);
  });

process.on("unhandledRejection", (err) => {
  console.log(`send this error ${err.stack}`);
});

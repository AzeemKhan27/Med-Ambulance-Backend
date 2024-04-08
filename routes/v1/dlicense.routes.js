'use strict';
"--unhandled-rejections=strict";

const router = require("express").Router();
const { Driverupdate , isRequestValidated } = require('../../validation/validations');
const { Driverlicense , } = require("../../controllers/detail.controller");
//const verifyAuth = require("../../middleware/auth");

var multer  = require('multer');
var path = require("path");

var storage = multer.diskStorage({
  destination: function(req,file,cb){
     cb(null,'./upload')
  },
  filename: (req, file, cb) => {
    console.log('multer' + JSON.stringify(file));
    let ext = path.extname(file.originalname)
    cb(null,Date.now() + ext)
  //cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, '')}`);
  }
})
 

const upload = multer({
  storage,
  fileFilter : (req,file,callback) =>  {
    if(
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/pdf" 
    ){
      callback(null, true)
    }else{
      console.log('only jpg,png,jpeg file are supported!')
      callback(null,false)
    }
  },
  limits : {
    fileSize : 1024 * 1024 * 2
  }
});
router.post("/licenseregister",upload.array("images"),Driverupdate, isRequestValidated, Driverlicense);

module.exports=router;
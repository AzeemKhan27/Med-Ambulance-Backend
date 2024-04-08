'use strict';
"--unhandled-rejections=strict";

const router = require("express").Router();
const { persIdupdate,isRequestValidated } = require('../../validation/validations');
const { personalID } = require("../../controllers/detail.controller");
//const verifyAuth = require("../../middleware/auth");
  

var multer  = require('multer');
var path = require("path");

// var storage = multer.diskStorage({
//   destination: './public/uploads/PID',
//   filename: function (req, file, cb) {
//     // console.log("user name mobile ==== ",req.filename);
//     //cb(null, file.fieldname + '_' + Date.now()+path.extname(file.originalname));
//   console.log('multer' + JSON.stringify(file));
//   cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, '')}`);
//   }
// });
//   const fileFilter = (req,file,cb)=>{
//     // console.log('11111',file.mimetype);
//       if(file.mimetype === 'application/pdf' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
//       cb(null,true)
//       }else{
//       cb(new Error('Not support file format'),false)
//       }
//   }

// const upload = multer({
//   dest: './public/uploads/PID',
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 10
//   }
//   // fileFilter
// });
// console.log(upload,"upload")

var storage = multer.diskStorage({
  destination : (req,file,cb) => {
    cb(null,'./upload')
  },
  filename: (req, file, cb) => {
      console.log("multer" + JSON.stringify(file));
      let ext = path.extname(file.originalname)
      cb(null,Date.now() + ext)
      //cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, "")}`);
  },
});

const upload = multer({
  storage,
  fileFilter : (req,file,callback) =>{
    if(
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/pdf"
    ){
      callback( null , true)
    }else{
      console.log('only jpeg,jpg,png and pdf are supported!!')
      callback( null , false)
    }
  },
  limits : { 
    fileSize : 1024 * 1024 * 2
  }
});

                             
//______________________________Personal_ID___________________________//
                       
router.post("/pId",upload.array('images'),persIdupdate,isRequestValidated,personalID);

                                  
//____________________________________________________________________//

module.exports = router;
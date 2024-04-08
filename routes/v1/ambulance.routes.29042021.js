// 'use strict';
// "--unhandled-rejections=strict";

// const router = require("express").Router();
// // var multer  = require('multer');
// // var path = require("path");
// //  var tempPath = req.file.path;

// const { ambulanceInfoUpdate,isRequestValidated } = require('../../validation/validations');
// const { ambulanceINFO  } = require("../../controllers/detail.controller");
// const { Admin_AddAmb,Admin_AmbgetALLData,Admin_GetByID,Admin_UpdateAdminData,Admin_DeleteAdminData } = require("../../controllers/Admin.controller");
// const {getallambulance} = require("../../controllers/dashboard.controller");

// //_________________________________IMAGE_____________________________//

// var multer  = require('multer');
// var path = require("path");

// var storage = multer.diskStorage({
//   destination: './public/uploads/DL',
//   filename: function (req, file, cb) {
//       // console.log("user name mobile ==== ",req.filename);
//     //cb(null, file.fieldname + '_' + Date.now()+path.extname(file.originalname));
//     console.log('multer' + JSON.stringify(file));
//   cb(null, `${Date.now()}-${file.originalname.replace(/\s/g,'')}`);
//   }
// })
//   const fileFilter = (req,file,cb)=>{
//       if(file.mimetype == 'application/pdf' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'){
//       cb(null,true)
//       }else{
//       cb(new Error('Not support file format'),false)
//       }
//   }

// const upload = multer({
//   dest: './',
//   storage: storage,
  
// });
// //________________________________________Image_End___________________________________________// 

// // var logz = console.log;

// router.post("/Info",upload.single("image"),ambulanceINFO,ambulanceInfoUpdate,isRequestValidated);

// // logz(ambulanceINFO ,"debugging info routes");

// //______Admin____ROUTES________//

// //router.post("/Infos",upload.single("image"),Admin_AddAmb,ambulanceInfoUpdate,isRequestValidated);

// router.post("/AdminAMB",Admin_AddAmb);
// //(req,res,next)=>console.log("Comming AdminAMB",Admin_2),

// router.get("/getAmbu",Admin_AmbgetALLData);
// //(req,res,next)=>console.log("Comming getAmbu"),

// router.get("/singleAmb/:Id",Admin_GetByID);
// //(req,res,next)=>console.log("Comming singleAmb"),

// router.put("/EditAmb/:Id",upload.single("image"),Admin_UpdateAdminData);
// //(req,res,next)=>console.log("Comming EditAmb"),

// router.delete("/RemoveAmb/:Id",Admin_DeleteAdminData);
// //,(req,res,next)=>console.log("Comming RemoveAmb")

// //____________ADMIN ROUTES END_________________//
// module.exports = router;
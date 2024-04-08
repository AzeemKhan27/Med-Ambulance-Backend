'use strict';
"--unhandled-rejections=strict";
const express = require('express');
const jwt = require("jsonwebtoken");
//const upload = require('../../middleware/uploads')
//const verifyAuthUser = require("../../middleware/userAuth");
//const mqtts = require("./utils/mqtt");
//const router = require("express").Router();
//const {sendNotificationToUser} = require("../../controllers/notification.controller");

const { userVerifyUpdate,
  //userVerifyUserIdUpdate,
  userRegisterUpdate,
  isRequestValidated
} = require('../../validation/validations');
const { userRegister,
  Addnotification,
  userProfileGetRoutes,
  userProfileGetByID,
  userProfileUpdatebyID,
  Verifyotp,
  userLogin,
  findAllUsers,
  updateUser,
  getSingleUser ,
  activateDeativate,
  userActivate_Deactivate
} = require("../../controllers/user.controller");
const {
  addbooking,
  getBooking,
  userallmytrip,
  userlastmytrip,
  usercancelTrip,
  statusUpdate,
  feedbackUserlstRide,
  allUserTrips,
  userSingleTrip,
  userlasttrip,
  User_SingleSortedTrip,
} = require("../../controllers/booking.controller");
const {AdduserMessageCancle,
       GetuserMessageCancle
} = require("../../controllers/userCancelmsg.controller")
const { AddAmtTrans,ViewAmountTrans,ViewAllTrans
     } = require("../../controllers/transUser.controller");
const { sendMailToUser, sendMailToAllUser } = require('../../controllers/mail');
const { sendNotificationToUser, sendNotificationToAllUser } = require('../../controllers/notification');
const multer = require('multer');
//const userController = require("../controllers/user.controller");
const path = require('path');
const router = express.Router();

//____________________________

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
  },
});


//_________________________USER______PROFILE______Start__________________ //

router.post("/Register", userRegister, userRegisterUpdate, isRequestValidated);
router.put("/updateuser/:userId",updateUser);
router.get("/user/:userId",getSingleUser);
//______________________________GET All listing___________________________//                           

router.get("/profile", userProfileGetRoutes);

//____________________ Single_User_Profile__listing________________________//

router.get("/profile/:userProfileId", userProfileGetByID);

//_________________________Update And Edit Profile__________________________//

//router.put("/profileupdate/:userProfileId",upload.single('image'),userProfileUpdatebyID);
router.put("/profileupdate/:userProfileId",upload.fields([
  {name : 'image',maxCount : 1},
]),userProfileUpdatebyID);



//_____________________________Router Get OTP______________________________//
    
router.get("/VerifyOTP", Verifyotp, userVerifyUpdate, isRequestValidated);   //userVerifyUserIdUpdate

//__________________________User Login______________________________________//

router.post("/login", userLogin);

router.post("/allUsers", findAllUsers); 

//________________________________________________________________________//

router.post("/userbooking", addbooking);

//___________get booking by user id_______//
//router.get("/viewbooking/:UserId", getBooking);

router.get("/viewbooking/:UserID", getBooking);
//________________________________________//

router.get("/userride/:UserID", userallmytrip);
router.put("/mytrip/user/statusUpdate",  statusUpdate);
//____________________________start__last Ride___________________________________//
router.get("/lastride/:UserId", userlastmytrip);
//router.put("/feedback/lstride/:UserId/:rideId", feedbackUserlstRide);
router.put("/feedback/lstride/:UserId", feedbackUserlstRide);
//______________________________last Ride_end__________________________________//

router.post("/usercanceltrip", usercancelTrip);
router.post("/cancel-reason", AdduserMessageCancle);
router.get("/cancel-reason", GetuserMessageCancle);
 
router.get("/logout", async (req, res) => {
  res.clearCookie('t');
  res.json({
    message: 'logout',
    statusCode: 200
  });
});

//___________________________start transaction_____________________//

router.post("/addPayment/transaction", AddAmtTrans);
router.get("/view/transaction/:id", ViewAmountTrans);
//router.get("/view/transaction/:UserId/:DriverId/:bookingId", ViewAmountTrans);
router.get("/viewAll/transaction", ViewAllTrans);

//____________________________end transaction______________________//
//______________start________Notification_______________________//

router.post("/sendToAll", Addnotification);
//router.post("/notification/send",sendNotificationToUser);

//_______________________Notification_____end___________________//
// creat and assign a token
// const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
// res.header("auth-token", token).send({ token: token });

router.get("/userlastmytrip/:userId", userlasttrip);
router.get("/allUserTrips/:userId", allUserTrips);
router.get("/userSingleTrip/:userId/:bookingId", userSingleTrip);

//_________________userSortedTripComplete____________start____//
router.get("/Single_SortedTrip/:userId",User_SingleSortedTrip);
//_________________userSortedTripComplete______________end____//

router.post("/sendMailToUser", sendMailToUser); 
router.post("/sendMailToAllUser", sendMailToAllUser); 

//_______________notification__________user____________//

router.post("/sendNotificationToUser", sendNotificationToUser); 
router.post("/sendNotificationToAllUser", sendNotificationToAllUser); 

//_______________notification__________user____________//
 
//____start__________user Activate or De-Activate____routes___//
router.patch("/active-deactivate/:id",userActivate_Deactivate);
//_____end_________user Activate or De-Activate____routes___//

//_______________ntn ___bro______________________________//
router.patch("/activateDeativate/:id", activateDeativate);
//_______________________________________________________// 
module.exports = router;

'use strict';
"--unhandled-rejections=strict";

const router = require("express").Router();
const {
    registerupdatePass,
    driverVerifyUpdate,
    registerupdate,
    isRequestValidated,
    loginupdate
} = require('../../validation/validations');
const {
    Addnotification,
    forgetPassword,
    Register,
    login,
    verifyOtp,
    ForgetVerify,
    changePwd,
    fetchingALL,
    statusupdate,
    issVerify,
    driverProfileUpdatebyID,
    locationupdate,
    findAllDriver,
    getSingleDriver,
    updateDriver,
    deleteDriver,
    addDriver,
    getOneDriver,
} = require("../../controllers/driver.controller");
const {
  startTrip,
  accepeteddriver,
  drivercancelTrip,
  endTrip,
  statusUpdate,
  allmytrip,
  driverResponse,
  sortedTrip,
  Single_SortedTrip,
  allDriverTrips,
  driverSingleTrip,
  driverlasttrip,
  singleTrip,
  bookingPayment,
  CancelTrips_Driver
} = require("../../controllers/booking.controller");
// const verifyAuth = require("../../middleware/auth");
// const verifyAuthAdmin = require("../../middleware/admin_Auth");


var multer = require("multer");
var path = require("path");
const { sendMailToAllDriver, sendMailToAllUserAndAllDriver, sendMailToDriver } = require("../../controllers/mail");
const {  sendNotificationToDriver, sendNotificationToAllDriver, sendNotificationToAllDriverAndAllUser } = require("../../controllers/notification");
//sendNotificationToUser

var storage = multer.diskStorage({
    destination : (req,file,cb) => {
      cb(null,'./public/uploads/DL')
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
  
  
// checking user phone id in database
router.post("/startTrip",  startTrip);
router.post("/endtrip",  endTrip);
router.post("/canceltrip",  drivercancelTrip);
router.get("/mytrip/:DriverId",  allmytrip);
router.put("/mytrip/statusUpdate",  statusUpdate);

//___________start_________DriverCancelTrip ___________________//
router.post("/driver/cancelledTrip",CancelTrips_Driver);

//____________________DriverCancelTrip ______________end_______//


//________________________driver Register___________________//


router.post("/Register", registerupdatePass, registerupdate, isRequestValidated, Register);
router.get("/forget/password",  forgetPassword);
router.get("/ForgetVerifyOtp",ForgetVerify)

router.post("/all/driverList", findAllDriver);
router.get("/getdriver/:id", getSingleDriver);
router.put("/updateDriver/:id", updateDriver);
router.delete("/deleteDriver/:id", deleteDriver)
    //________________________driver Login______________________//

router.post("/login", login, loginupdate, isRequestValidated);
router.get("/viewdriver/:_id",  fetchingALL); //------->fetch all data from db
router.put("/changePassword/:phone",  changePwd); //------->
router.get("/VerifyOTP",  verifyOtp, driverVerifyUpdate, isRequestValidated);
//router.put("/updateprofile/:Id", upload.single("image"),driverProfileUpdatebyID);
router.put("/updateprofile/:Id", upload.fields([
  {name : 'DriverProfileImage',maxCount : 1},
]),driverProfileUpdatebyID);

//********************************************************************//
router.put("/isVerify/:Id", issVerify);
//********************************************************************//


//_______________________________booking _______________________________//

router.put("/status/:Id", statusupdate);
router.put("/location/:Id", locationupdate);
router.post("/acceptbooking", accepeteddriver);


router.get("/logout", async(req, res) => {
    res.clearCookie('t');
    res.json({
        message: 'logout',
        statusCode: 200
    });
});
router.delete("/deleteDriver/:id", deleteDriver);
router.get("/getOneDriver/:id", getOneDriver);


/*********************************** Addition ********************** */


router.post(
    "/addDriver",
    upload.fields([
        { name: "licenseFrontImage", maxCount: 1 },
        { name: "licenseBackImage", maxCount: 1 },
        { name: "personalFrontImage", maxCount: 1 },
        { name: "personalBackImage", maxCount: 1 },
        { name: "driverImage", maxCount: 1 },
    ]),
     addDriver
);

router.post(
    "/updateDriver/:id",
    upload.fields([
        { name: "licenseFrontImage", maxCount: 1 },
        { name: "licenseBackImage", maxCount: 1 },
        { name: "personalBackImage", maxCount: 1 },
        { name: "personalFrontImage", maxCount: 1 },
        { name: "driverImage", maxCount: 1 },
    ]),
     updateDriver
);

//______________start________Notification_______________________//

router.post("/sendToAll", Addnotification);
//router.get("/notification/send/:DriverId",sendNotificationToDriver);

//_______________________Notification_____end___________________//

router.post("/driverResponse", driverResponse);
router.get("/sortedTrip/:tripStatus", sortedTrip);
router.get("/Single_SortTrip/:driverId", Single_SortedTrip);
router.get("/allDriverTrips/:driverId", allDriverTrips); 
router.get("/driverlasttrip/:driverId", driverlasttrip); 
router.get("/driverSingleTrip/:driverId/:bookingId", driverSingleTrip); 
router.get("/singleTrip/:bookingId", singleTrip); 
router.post("/sendMailToAllDriver", sendMailToAllDriver); 
router.post("/sendMailToAllUserAndAllDriver", sendMailToAllUserAndAllDriver); 
router.post("/sendMailToDriver", sendMailToDriver); 
router.post("/bookingPayment", bookingPayment); 

//__________-notification___//

router.post("/sendNotificationToDriver", sendNotificationToDriver); 
router.post("/sendNotificationToAllDriver", sendNotificationToAllDriver); 
router.post("/sendNotificationToAllDriverAndAllUser", sendNotificationToAllDriverAndAllUser); 

//_________end notification_____//

// creat and assign a token
// const token = jwt.sign({ _id: driver._id }, process.env.TOKEN_SECRET);
// res.header("auth-token", token).send({ token: token });

module.exports = router;
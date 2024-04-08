"use strict";
"--unhandled-rejections=strict";

const { DriverRegister, license, Personal_Id } = require("../model");
const bcrypt = require("bcryptjs");
const { getRandomPin } = require("../utils/helpers");
const db = require("../services/dboperations");
var mqtt = require("mqtt");
//const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
//const cron = require("node-cron");
//const shell = require('shelljs');
const { createConnection } = require("mongoose");
const e = require("cors");
const DriverAuthentication = require("../middleware/sign_middleware");

var options = {
  host: "198.199.83.132",
  port: 1883,
  username: "med",
  password: "arub%MaTXn^mbW",
};
//debugger;

//initialize the MQTT client
var client = mqtt.connect(options);

exports.Register = async (req, res, next) => {
  var phoneExit = await DriverRegister.findOne({
    $or: [{ phone: req.body.phone }, { email: req.body.email }],
  });

  console.log(phoneExit, "debugging success line 32-40");

  if (phoneExit)
     res.json({
      status: false,
      statusCode: 400,
      message: "phone number or email already exists",
      data: null,
    });

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // //get OTP
  const m_otp = getRandomPin("0123456789", 4);

  // create new user
  const user = await DriverRegister({
    phone: req.body.phone,
    email: req.body.email,
    status: req.body.status,
    m_otp: m_otp,
    drivername: req.body.drivername,
    password: hashedPassword,
    deviceType: req.body.deviceType,
    // isVerifyLicense : req.body.isVerifyLicense,
    // isVerifyPersonalDetails : req.body.isVerifyPersonalDetails,
    // isVerifyAmbulance : req.body.isVerifyAmbulance
    //   latitude: req.body.latitude,
    //   longitude: req.body.longitude,
    //   location: req.body.location,
    liecenseId: req.body.liecenseId,
    ambulanceinfosId: req.body.ambulanceinfosId,
    personalId: req.body.personalId,
    

    //   location: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)],
  });

  console.log(user, "user phone 65-70");

  if (!user.password)
    return res.status(200).json({
      statusCode: 400,
      status: false,
      message: "All fields are required",
    });

  try {
    var savedUser = await user.save();
    console.log("debuging sucessfully on 50-60 line", savedUser);
    // res.send(savedUser);
    res.json({
      statusCode: 200,
      status: true,
      message: "Registered Successfully",
      data: savedUser,
    });
  } catch (error) {
    res.status(400).send(error);
    console.log(error, "debugging success line 45-50");
  }
};

//_______________________________forgetPasswrd__________________________//

exports.forgetPassword = async (req, res, next) => {

  try {
    //let { DriverId } = req.query;
    //let { phone } = req.query;
  let data = await DriverRegister.findOne({
    $or: [
      {
        phone: req.query.phone,
      },
    ],
  });

  //___
  const m_otp = getRandomPin("0123456789", 4);
    let dataToSetForget = {
      isVerifyForget: false,
      m_otp : m_otp,
  };

  let updateDriverForget = await db.findAndUpdate(
  //  DriverRegister, { _id: DriverId },
    DriverRegister, { phone : req.query.phone },
    dataToSetForget, {
          new: true,
      }
  );
  //___

  if (!data)
    return res.status(200).json({
      status: false,
      statusCode: 400,
      message: "Something Went Wrong",
    });
   else {
     return res.status(200).json({
      status: true,
      statusCode: 200,
      data : {
        id : updateDriverForget._id,
        m_otp : updateDriverForget.m_otp,
        isForgetVerify: updateDriverForget.isVerifyForget,
        message : "forget Password successfully"
      }
    });
   }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: false,
      statusCode : 500,
      message : "Internal Error",
      error : error.message
    });
  }
};

//_________start________Verify Otp ______________forget___________//

exports.ForgetVerify = async (req, res, next) => {
  let {phone} = req.query;
  let {m_otp} = req.query;
  let ForgetData = await DriverRegister.findOne({
    $or: [{m_otp :m_otp ,phone : phone}],
  }).then(async data => {
    if(!req.query.m_otp){
      return res.json({
        status : false,
        statusCode : 409,
        message : "Enter The Corect Otp",
      });
    }else if(!req.query.phone){
      return res.json({
        status : false,
        statusCode : 409,
        message : "phone number are required for verification",
      });
    }else if(!data){
      return res.json({
        status : false ,
        statusCode : 404,
        message : "Something Went Wrong",
      })
    }else {
      let dataSetForget = {
        isVerifyForget : true,
      };
      let updateForgetVerify = await db.findAndUpdate(
        DriverRegister, {phone : phone},
        dataSetForget,{new : true}
      );
      return res.json({
        status : true,
        statusCode : 200,
        message : "Verify Successfully",
        data : {
          id: updateForgetVerify._id,
          phone : updateForgetVerify.phone,
          isVerifyForget : updateForgetVerify.isVerifyForget
        },
      });
    }
  }).catch(error => {
    console.log(error.message);
    res.json({
      status : false,
      statusCode : 500,
      message : "error found",
      error : error.message
    })
  });
};

//_________end________Verify Otp ______________forget___________//

//___________________start_____________changePassword______________________//

exports.changePwd = async (req, res, next) => {
  try {
    const driverChangePassword = {
      password: req.body.password,
    };
    console.log(driverChangePassword, "78-110");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const updatedListing = await DriverRegister.findOneAndUpdate(
      { phone: req.params.phone },
      { password: hashedPassword }
    );
    console.log(updatedListing, "125-130");

    if (!updatedListing){
      return res.status(200).json({
        status: false,
        statusCode: 400,
        message: "Phone Number does not registered",
      });
    }else {
      return res.status(200).json({
        status: true,
        statusCode: 200,
        message: "Password changed successfully",
        data: null,
    });
  }
     
  } catch (error) {
    res.json({ message: error });
  }
};

//____________________Fetch DATA_______________________________//

exports.fetchingALL = async (req, res, next) => {
  try {
    let driverdata = await DriverRegister.findById(req.params._id);
    res.json({
      status: true,
      statusCode: 200,
      message: "View data",
      data: { driverdata },
    });
  } catch (error) {
    res.json({ message: error });
  }
};

//___Driver___Profile___Update____//

exports.driverProfileUpdatebyID = async (req, res, next) => {
  
  try {
    let { email, drivername } = req.body;
    // let { image  } = req.files;
    //if(email && drivername && req.files.DriverProfileImage)
    let checkDriverProfile = await db.findOne(DriverRegister,{ _id : req.params.Id });

    console.log(checkDriverProfile,req.params.Id + "checkDriverProfile");
    //debugger;
    if(!checkDriverProfile)
    {
    return res.status(400).send({message: "Something Went Wrong"});
    }
    //debugger;

    let dataToset = {
      email : email || checkDriverProfile.email,
      drivername : drivername || checkDriverProfile.drivername,
      // image : image  || checkDriverProfile.image,
      DriverProfileImage : req.files.DriverProfileImage
      ? `/uploads/DL/${req.files.DriverProfileImage[0].filename}`
      : checkDriverProfile.DriverProfileImage,
      // image : `uploads/DL/${image[0].filename}`,
      updatedAt : Date.now(),
    };

    console.log(dataToset,"dataToset");

   
    // var doc = await DriverRegister.findOneAndUpdate(
    //   { _id: req.params.Id },
    //   // req.body,
    //   {
    //    email,
    //    drivername,
    //    image:req.file.path
    //   },
    //   { new: true }
    // );

    let doc = await db.findAndUpdate(
      DriverRegister,
      { _id : req.params.Id },
      dataToset,
      { new : true }
    );
   
    const result = await doc.save();
    console.log(result,"result 987654321");

    if(result){
      return res.status(200).send({
        status: true,
        statusCode: 200,
        message: "driver profile updated successfully",
        data: {
          result
        },
      });
    }else{
      return res.status(404).send({
        status : false,
        statusCode : 404,
        message : "Something Went Wrong"
      })
    }
  } catch (error) {
    console.log(error.message)
     return res.status(500).send({
      status : false,
      statusCode : 500,
      message : 'Found Error || Internal Error',
      error : error.message
    })
  }
};

//______________________Driver_______Login_____________________________//

exports.login = async (req, res, next) => {
  //let { RegisterId } = req.body;
  const driver = await DriverRegister.findOne({
    $or: [
      {
        phone: req.body.phone,
        // deviceType: req.body.deviceType,
        // _id : RegisterId
        // licenseId : req.body.licenseId,
        // ambulanceinfosId : req.body.ambulanceinfosId,
        // Personal_Id : req.body.Personal_Id
        // requireddeviceToken : req.body.deviceToken
      },
    ],
  })
  .populate('liecenseId')
  .populate('ambulanceinfosId')   
  .populate('personalId');
  console.log(driver,"driver");

  if (!driver){
    return res.status(200).json({
      statusCode: 400,
      status: false,
      message: "Not Register || Auth Failed",
    });
  }
 
  const validPass = await bcrypt.compareSync(
    req.body.password,
    driver.password
    //driver[0].password
  );
  console.log(!validPass,"validPass");
  if (!validPass)
    return res.json({
      statusCode: 400,
      status: false,
      message: "Invalid Password || Auth Failed",
      data: null,
    });

  console.log(validPass, "validpass login line 71-80");

  //__________sign_jwt_authentication___start____________//

  //const token = jwt.sign({ _id: driver._id }, process.env.TOKEN_SECRET);
  //const token = jwt.sign({DriverId : driver[0]._id},'secret',{expiresIn:'1h'});

  // const token = DriverAuthentication.tokenDriver();

  //__________sign_jwt_authentication___end______________//

  return res.json(
    {
      statusCode: 200,
      status: true,
      message: " Login  Successfully",
      data: { driver },
      // token: token,
    } || data
  );
};

//______________start_______________issVerify__________________________//

exports.issVerify = async (req, res, next) => {
  var docIsVerify = await DriverRegister.findOneAndUpdate(
    { _id: req.params.Id },
    req.body,
    { new: true }
  );
  return res.json({
    status: true,
    statusCode: 200,
    message: "isVerify Update",
    dataup: {
      id: docIsVerify._id,
      isVerify: req.body.isVerify,
    },
  });
};

//_____________________________issVerify___________end_______________//
//______________________________verifyOtp _________________________//

exports.verifyOtp = async (req, res, next) => {
  let {_id} = req.query;
  let data = await DriverRegister.findOne({
    $or: [{ m_otp: req.query.m_otp , _id: _id }],
  }).then(async datas =>{
      if (!req.query.m_otp){ 
      return res.json({
        status: false,
        statusCode: 400,
        message: "Correct OTP Are Required",
      });
      }else if(!req.query._id){
        return res.json({
          status: false,
          statusCode: 400,
          message: "DriverId Are Required",
        });
      }else if(!datas){
        return res.json({
          status: false,
          statusCode: 400,
          message: "404 || otp Incorect",
        }); 
      }else{
        let dataSet = {
          isVerify: true,
      };
      let updateVerify =  await db.findAndUpdate(
          DriverRegister, { _id: _id },
          dataSet, {
              new: true,
          }
      );
       return res.json({
          status: true,
          statusCode: 200,
          message: "Verification Successfully",
          data: {
            id: updateVerify._id,
            phone: updateVerify.phone,
            isVerify : updateVerify.isVerify
          },
        });
       }
}).catch(error =>{console.log("error", error.message),
res.json({ status: false, 
        statusCode: 404,
        message : "error found",
        error : error.message,
       })
      });


  // if (!data)
  //   return res.json({
  //     status: false,
  //     statusCode: 400,
  //     message: "Invalid OTP",
  //   });
  // //if(!isVerify){
  // res.json({
  //   status: true,
  //   statusCode: 200,
  //   message: "Verification Successfully",
  //   data: {
  //     id: data._id,
  //     phone: data.phone,
  //   },
  // });
  //}
};

//________________________update status_____________________________________//

exports.statusupdate = async (req, res, next) => {
 try {
  var doc = await DriverRegister.findOneAndUpdate(
    { _id: req.params.Id },
    req.body,
    { new: true }
  );
 if(doc){
  return res.json({
          status: true,
          statusCode: 200,
          message: "status and driver location ",
          dataup: {
            id: doc._id,
            status: req.body.status,
            driverLat : doc.driverLat,
            driverLong : doc.driverLong
    },
  });
}
 } catch (error) {
   console.log(error.message)
   return res.status.send({
     status : false ,
     statusCode : 409,
     message : "Something went wrong",
     error : error.message
   })
 }
};

exports.locationupdate = async (req, res, next) => {
  // console.log(req.body)
  var doc = await DriverRegister.findOneAndUpdate(
    { _id: req.params.Id },
    req.body,
    { new: true }
  );
  console.log(doc,"doc");
  const returnObj = res.json({
    status: true,
    statusCode: 200,
    message: "update successfully",
    data: {
      id: doc.id,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      location: req.body.location,
    },
  });
  console.log(returnObj._id,"returnObj _id")
};

//______________________________start mqtt______________________________________//

//setup the callbacks
client.on("connect", function () {
  console.log("Connected");
});

client.on("error", function (error) {
  console.log(error);
});

client.on("message", function (topic, message) {
  //Called each time a message is received
  console.log("Received message:", topic, message.toString());
  var jsonString = message.toString();
  var jsonObj = JSON.parse(jsonString);

  var latitude = 0.0;
  var longitude = 0.0;

  for (var myKey in jsonObj) {
    console.log("key:" + myKey + ", value:" + jsonObj[myKey]);
    if (myKey == "latitude") {
      latitude = jsonObj[myKey];
    } else if (myKey == "longitude") {
      longitude = jsonObj[myKey];
    }
    console.log(latitude, longitude);
  }
});

try {
  client.subscribe("60681f65d8b88441bcb11d0c");
  //client.publish('60681f65d8b88441bcb11d0c', 'Hiii This is Azeem Pathan');
} catch (error) {
  console.log(error.message, "error found");
}

//******find all driver details here**************

exports.findAllDriver = async (req, res, next) => {
  // const limit = req.body.limit ? req.body.limit : 10;
  // const skip = req.body.skip ? req.body.skip : 0;
  // if (req.query.drivername) {
  //     DriverRegister.find({ "drivername": { $regex: req.query.drivername, $options: 'i' } }).then(dataNew => {
  //         return res.send(dataNew)
  //     })
  // }
  // if (req.query.phone) {
  //     DriverRegister.find({ phone: req.query.phone }).then(mydata => {
  //         return res.send(mydata)
  //     })
  // }
  // if (req.query.status) {
  //     DriverRegister.find({ status: req.query.status }).then(mydataResult => {
  //         return res.send(mydataResult)
  //     })
  // }
  try {
    const limit = parseInt(req.body.limit); // Make sure to parse the limit to number
    const skip = parseInt(req.body.skip); // Make sure to parse the skip to number
    let searchObj = {};
    if (req.body.search) {
      searchObj = {
        $or: [
          { drivername: { $regex: req.body.search, $options: "i" } },
          { phone: req.body.search },
          { email: req.body.search },
          { status: req.body.search },
        ],
      };
    }
    let count = await DriverRegister.countDocuments(searchObj);
    let drivers = await DriverRegister.find(searchObj).skip(skip).limit(limit);
    res.json({ success: true, message: "ALL", data: drivers, total: count });
  } catch (error) {
    res.status(500).send({ message: error });
  }

  // DriverRegister.countDocuments().then(total => {
  //     DriverRegister.find().populate('liecenseId').limit(limit).skip(skip * limit).then(result => {
  //         res.json({ success: true, message: 'ALL', data: result, total: total })
  //     })
  // })
};

//find single driver detail******

exports.getSingleDriver = async (req, res, next) => {
  try {
    const data = await await DriverRegister.findById(req.params.id)
      .populate("liecenseId")
      .populate("personalId");

   return res.json({
      success: true,
      message: "ok",
      data: data,
      statusCode: 200,
    });
  } catch (error) {
    return res.send(error);
  }
};

///*****************UPDATE DRIVERS***************/

exports.updateDrivers = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    let dataUpdate = await DriverRegister.findByIdAndUpdate(
      req.params.driverRegsiterId,
      {
        phone: req.body.phone,
        email: req.body.email,
        status: req.body.status,
        drivername: req.body.drivername,
        deviceType: req.body.deviceType,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        location: req.body.location,
        liecenseId: req.body.liecenseId,
        hospitalId: req.body.hospitalId,
        personalId: req.body.personalId,
        password: hashedPassword,
      },
      { new: true }
    );
    if (!dataUpdate) {
      return res.send("not found" + req.params.driverRegsiterId);
    }
    return res.status(200).json({
      message: "data update successfully",
      data: dataUpdate,
      success: true,
    });
  } catch (error) {
    console.log("error in catch", error);
    res.status(500).json({
      code: 400,
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
};

exports.addDriver = async (req, res, next) => {
  try {
    let {
      email,
      drivername,
      status,
      phone,
      deviceType,
      latitude,
      longitude,
      hospitalId,
      identityId,
      password,
      idType,
      licensenumber,
    } = req.body;
    console.log(req.body);
    if (
      email &&
      drivername &&
      status &&
      phone &&
      deviceType &&
      latitude &&
      longitude &&
      req.files.driverImage && 
      req.files.licenseFrontImage &&
      req.files.licenseBackImage &&
      req.files.personalFrontImage &&
      req.files.personalBackImage &&
      password &&
      identityId &&
      idType &&
      licensenumber
    ) {
      let checkDriver = await db.findOne(DriverRegister, {
        $or: [{ phone }, { email }],
      });
      if (checkDriver)
        return res.status(409).send({ message: "Already exists" });
      let saveDriver = await db.saveData(DriverRegister, {
        ...req.body,
        location: [parseFloat(longitude), parseFloat(latitude)],

        password: await bcrypt.hash(password, 10),
        driverImage: `/uploads/DL/${req.files.driverImage[0].filename}`,
      });
      if (saveDriver) {
        let dataForLicense = {
          DriverId: saveDriver._id,
          licensenumber,
          images: [
            `/uploads/DL/${req.files.licenseFrontImage[0].filename}`,
            `/uploads/DL/${req.files.licenseBackImage[0].filename}`, 
          ],
        };
        var saveDriverLicense = await db.saveData(license, dataForLicense);

        let dataForPersonal = {
          DriverId: saveDriver._id,
          idType,
          personal_Id: identityId,
          images: [
            `/uploads/DL/${req.files.personalFrontImage[0].filename}`,
            `/uploads/DL/${req.files.personalBackImage[0].filename}`,
          ],
        };
        var savePersonal = await db.saveData(Personal_Id, dataForPersonal);
        var updateDriver = await db.findAndUpdate(
          DriverRegister,
          { _id: saveDriver._id },
          {
            liecenseId: saveDriverLicense._id,
            personalId: savePersonal._id,
          },
          {
            new: true,
          }
        );
        console.log(saveDriverLicense, savePersonal);
      }

      return res.send({
        data: {
          driverData: updateDriver,
          licenseData: saveDriverLicense,
          personalData: savePersonal,
        },
        message: "added successfuly",
        status: true,
        statusCode: 200,
      });
    }

    return res.status(400).send({
      message: "All fields are required",
      statusCode: 400,
      status: false,
    });
  } catch (err) {
    console.log("===========", err);
    res.status(400).send({
      message: "Please enter valid data",
      statusCode: 400,
      status: false,
    });
  }
};

exports.updateDriver = async (req, res, next) => {
  try {
    let {
      email,
      drivername,
      status,
      phone,
      deviceType,
      latitude,
      longitude,
      licenseId,
      hospitalId,
      identityId,
      password,
      idType,
      licensenumber,
    } = req.body;
    console.log(req.files);
    /**********************************HANDLE DRIVER***************************** */
    let checkDriver = await db.findOne(DriverRegister, { _id: req.params.id });
    console.log(checkDriver, req.params.id);
    if (!checkDriver)
      return res.status(400).send({ message: "Driver not exists" });
    let dataToSet = {
      email: email || checkDriver.email,
      drivername: drivername || checkDriver.drivername,
      status: status || checkDriver.status,
      phone: phone || checkDriver.phone,
      deviceType: deviceType || checkDriver.deviceType,
      latitude: latitude || checkDriver.latitude,
      longitude: longitude || checkDriver.longitude,
      hospitalId: hospitalId || checkDriver.hospitalId,
      password: password
        ? await bcrypt.hash(password, 10)
        : checkDriver.password,
      driverImage: req.files.driverImage
        ? `/uploads/DL/${req.files.driverImage[0].filename}`
        : checkDriver.driverImage,
      updatedAt: Date.now(),
    };
    let updateDriver = db.findAndUpdate(
      DriverRegister,
      { _id: req.params.id },
      dataToSet,
      { new: true }
    );

    /********************HANDLE DRIVER********************** */
    let dataForLicense = {};
    if (licensenumber) {
      dataForLicense.licensenumber = licensenumber;
    }

   if (req.files.licenseFrontImage && req.files.licenseBackImage) {
      dataForLicense.images = [
        `/uploads/DL/${req.files.licenseFrontImage[0].filename}`,
        `/uploads/DL/${req.files.licenseBackImage[0].filename}`,
      ];
    } 
    let updateLicence = db.findAndUpdate(
      license,
      { _id: checkDriver.liecenseId },
      dataForLicense,
      { new: true }
    );

    /************************HANDLE PERSONAL******************************** */
    let dataForPersonal = {};
    if (identityId) {
      dataForPersonal.personal_Id = identityId;
    }
    if (idType) {
      dataForPersonal.idType = idType;
    }

    if (req.files.personalFrontImage && req.files.personalBackImage) {
      dataForPersonal.images = [
        `/uploads/DL/${req.files.personalFrontImage[0].filename}`,
        `/uploads/DL/${req.files.personalBackImage[0].filename}`,
      ];
    }
    let updatePersonal = db.findAndUpdate(
      Personal_Id,
      { _id: checkDriver.personalId },
      dataForPersonal,
      { new: true }
    );

    let [driverData, licenseData, personalData] = await Promise.all([
      updateDriver,
      updateLicence,
      updatePersonal,
    ]);
    return res.send({
      data: {
        driverData,
        licenseData,
        personalData,
      },
      message: "updated successfuly",
    });
  } catch (err) {
    console.log("===========", err);
    res.status(400).send({ message: "Please enter valid data" });
  }
};

// ************************delete Driver ********************************//

exports.deleteDriver = async (req, res, next) => {
  try {
    let findDriver = await db.findOne(DriverRegister, { _id: req.params.id });
    if (!findDriver)
      return res.status(404).send({ message: "Driver not found" });
    let removeDriver = db.remove(DriverRegister, { _id: req.params.id });
    let removeLisense = db.remove(license, { _id: findDriver.liecenseId });
    let removePersonal = db.remove(Personal_Id, { _id: findDriver.personalId });
    let [removedDriver, removedLisense, removedPersonal] = await Promise.all([
      removeDriver,
      removeLisense,
      removePersonal,
    ]);
    console.log(removedDriver, removedLisense, removedPersonal);
    return res.send({ message: "successfully deleted" });
  } catch (error) {
    console.log("error in catch", error);
    res.status(500).json({
      code: 500,
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
};

exports.getOneDriver = async (req, res, next) => {
  try {
    let getDriver = await db.findOne(DriverRegister, { _id: req.params.id });
    if (!getDriver)
      return res.send({
        status: false,
        message: "Driver not found",
        statusCode: 404,
      });
    let getLicense = db.findOne(license, { _id: getDriver.liecenseId });
    let getPersonal = db.findOne(Personal_Id, { _id: getDriver.personalId });
    let [licenseData, personalData] = await Promise.all([
      getLicense,
      getPersonal,
    ]);
    console.log(getDriver, req.params.id);
    res.send({
      status: true,
      message: "Ok",
      statusCode: 200,
      data: { driverData: getDriver, licenseData, personalData },
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

//______________start________Notification_______________________//

exports.Addnotification = async (req, res, next) => {
  let deviceTokenAndroid = process.env.DeviceTokenAndroid;
  var notification = {
    title: "Title of notification from the Server Side",
    text: "Subtitle from server side",
  };
  var fcm_tokens = [deviceTokenAndroid];
  var notification_body = {
    notification: notification,
    registration_ids: fcm_tokens,
  };

  fetch("https://fcm.googleapis.com/fcm.sent", {
    method: "POST",
    headers: {
      Authorization:
        "key=" +
        "AAAA5eElVI8:APA91bEH97DyjSamiQe963uRkuc31mEK6Dw8vhgItKa1GAH5AOso_lAqQLW7r6vkyfKlTl-ZV0In2Y1K25DfZ17ytsjcO6zk37EYOjhhiTTy2D-M2dqsYRUmN3Xh68EAEfEra74UMs4i",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notification_body),
  })
    .then(() => {
      res.status(200).send("Notification send successfully...");
    })
    .catch((err) => {
      res.status(400).send("Something Went Wrong!");
      console.log(err);
    });
};

//_______________________Notification_____end___________________//

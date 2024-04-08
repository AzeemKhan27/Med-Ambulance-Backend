'use strict';
"--unhandled-rejections=strict";

const {DriverRegister, ambulanceinfos, Personal_Id, license } = require('../model');
const { datas } = require('../validation/validations');
const db = require("../services/dboperations");
const  path = require("path");

//----------------------------------Driver License ---------------------------------------//

exports.Driverlicense = async (req, res, next) => {
  
  let data = await license.findOne({
    DriverId: req.body.DriverId
    // DriverId : _id
  });

  console.log(data)

  // create NEW 
  // Path: req.body.Link,
  //imagePath: req.file.path.split('public/DL')
  
  const licencedata = await license({
   
    DriverId: req.body.DriverId,
    licensenumber: req.body.licensenumber,
    
  });

  if( req.files){
    let path = ''
    req.files.forEach((files,index,array) => {
      path = path + files.path + ','
    })
    path = path.substring(0,path.lastIndexOf(','))
    licencedata.images = path
  }

  try {
    licencedata.save(async(err, save) => {
      console.log('save', save);
      if (err) {                 //|| licencedata == null || licencedata.image.length < 0
        console.log('err', err);
        return res.json({
          status: false, 
          statusCode: 400,
          message: 'All Fields Are Required...',
          //data: data.isVerifyLicense
          data: data
        });
      }
      else{
    
        let SetData_DL = {
          isVerifyLicense: true, 
          liecenseId : licencedata._id
          };
          console.log(SetData_DL,"SetData_DLSetData_DL");
         
      let updateVerifyLicense = await db.findAndUpdate(
       
        DriverRegister, {  _id : req.body.DriverId },
        SetData_DL, {
              new: true,
          }
      );
        return res.json({
          status: true,
          statusCode: 200,
          message: 'Data Uploaded Successfully',
          data: {
            licencedata,
            //updateVerifyLicense
          }
        });
      }
    })
  } catch (error) {
   return res.status(501).json({
      status:false,
      statusCode : 501,
      message : "something went wrong",
      error:error.message,
      data :null, 
      isVerifyLicense : data.isVerifyLicense
    });
    console.log(error.message, 'debugging success line 155-160');
  }
}

//____________________________________Personal_ID_________________________________________//

exports.personalID = async ( req, res, next ) => {

// try{
// image: req.files,
// Path: req.body.Link, 

  let personal = await Personal_Id({
    DriverId: req.body.DriverId,
    personal_Id: req.body.personal_Id,
    idType: req.body.idType
  });

  if(req.files){
    let path = ''
    req.files.forEach((files,index,array) => {
      path = path + files.path + ','
    })
    path = path.substring(0,path.lastIndexOf(','))
    personal.images = path
  }

 personal.save().then(async (datass) => {
  if(!datass){
    return res.json({
      status : false ,
      statusCode: 404,
      message: "all keys are required"
    })
  }
  else{
  //isVerifyPersonalId
   var SetData_Pid = {
    isVerifyPersonalDetails: true,
    personalId : datass._id
    };
    console.log(SetData_Pid,"SetData_DLSetData_DL");
   

 let updateVerifyPid = await DriverRegister.findOneAndUpdate(
  { _id : req.body.DriverId},
  SetData_Pid,{ new: true}
 )
 console.log(updateVerifyPid,"updateVerifyPidupdateVerifyPidupdateVerifyPid")
//  .populate('isVerifyPersonalId')
//  .exec();

// .populate('isVerifyPersonalId');  
// .getRequiredPopulate('isVerifyAmbulance');
  return res.json({
    status: true,
    statusCode: 200,
    message: 'Data Uploaded Sucessfully',
    //data: updateVerifyPid,
    data: datass,
  });
}
 }).catch(error =>{
  return res.status(501).json({
    status:false,
    statusCode : 501,
    message : "Something Went Wrong",
    error:error.message,
    data : null
  });
 })
}
//   } catch (error) {
//     res.status(400).send(error.message);
//     console.log(error.message, 'debugging success line 45-50');
//   }
// }
//___________________________AMBULANCE______INFO______________________________//

exports.ambulanceINFO = async (req, res,next) => {

  var ambinfomation = await ambulanceinfos.findOne({
    DriverId: req.body.DriverId,
  })
  // .populate('isVerifyAmbulance')
  // .exec();
  
  // if (ambinfomation == null) {
  //   return res.status(200).json({
  //     status: false,
  //     statusCode: 400,
  //     message: "DriverId already exists",
  //     //data : null
  //   });
  // }
  console.log(ambinfomation,"ambinfomation");

  const driverdetails = await ambulanceinfos({
    image: req.file.path,
    Path: req.body.Link,
    DriverId: req.body.DriverId,
    AmbulanceCategory: req.body.AmbulanceCategory,
    AmbulanceType: req.body.AmbulanceType,
    AmbulanceModel: req.body.AmbulanceModel,
    RegistrationNumber: req.body.RegistrationNumber,
    FuelType: req.body.FuelType,
    ManufacturedDate: req.body.ManufacturedDate,
    RegistrationDate: req.body.RegistrationDate,
    hospitalId:req.body.hospitalId,
    driverId:req.body.driverId
    //:req.body.DriverId
  });
  //console.log(driverdetails, "292-300");

  try {
    driverdetails.save(async(err, save) => {
      console.log('save', save);
      if (err || req.body.DriverId == null) {
        console.log('err', err);
        return res.json({
          status: false, 
          statusCode: 400,
          message: 'All Fields Are Required.',
          data: null
        });
      } else {
        var SetData_AmbulanceInfos = {
          isVerifyAmbulance: true,
          ambulanceinfosId: driverdetails._id
          };
          console.log(SetData_AmbulanceInfos,"SetData_AmbulanceInfos");
         
          let updateVerifyAmbulance =  await db.findAndUpdate(
            DriverRegister, { _id : req.body.DriverId },
            SetData_AmbulanceInfos, {
                new: true,
            }
        );

        return res.json({
          status: true,
          statusCode: 200,
          message: 'Data Uploaded Successfully',
          data: {
              driverdetails,
            //  updateVerifyAmbulance
          }
        });
      }
    })
  } catch (error) {
    return res.status(501).json({
      status:false,
      statusCode : 501,
      message : "something went wrong",
      error:error.message,
      data : null
    });
  }

}

//_____________________________END AMBU INFO____________________________//


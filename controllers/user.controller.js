"use strict";
"--unhandled-rejections=strict";

const bcrypt = require("bcryptjs");
const { getRandomPin } = require("../utils/helpers");
const { UserRegister } = require("../model");
const { Response } = require("../utils/response");
//const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const fetch = require("node-fetch");
const createError = require('http-errors');
const db = require("../services/dboperations");
const path = require('path')
const url = require('url');

//__________________________________USER________________________________//

//___________________________User_____Register___________________________//

exports.userRegister = async (req, res, next) => {
  try {
    let phoneExit = await UserRegister.findOne({
      phone: req.body.phone,
    });

    const m_otp = getRandomPin("0123456789", 4);

    if (phoneExit) {
      const result = await UserRegister.findOneAndUpdate(
        {
          phone: req.body.phone
          // email: req.body.email,
          // name: req.body.name,
        },
        { m_otp: m_otp },
        { upsert: true }
      );
      return res.status(200).json({
        status: true,
        statusCode: 200,
        message: "already Registered & otp send",
        data: {
          id: result._id,
          OTP: m_otp,
        },
      });
      //return res.status(200).json(Response(400,'eroor', status_data));
    } else {
      const userRegister = await UserRegister({
        phone: req.body.phone,
        email: req.body.email,
        m_otp: m_otp, 
        name: req.body.name,
        deviceToken: req.body.deviceToken,
        deviceType: req.body.deviceType,
      });

     let saveUser = await userRegister.save();
     return res.json({
            status: true,
            statusCode: 200,
            message: "Registered successfull",
            data: {
              id: saveUser._id,
              OTP: saveUser.m_otp,
              phone: req.body.phone,
              name: req.body.name,
              email: req.body.email,
            },
          });
    }
  } catch (error) {
     res.status(400).send(error.message);
  }
};

//_______________________GET_________________________//

exports.userProfileGetRoutes = async (req, res, next) => {
  try {
    const userRegister = await UserRegister.find(req.params.UserId);
    return res.status(200).json(userRegister);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};
//{status : true, statusCode : 200,data:userRegister}

//____________________GET___SingleListing______________________//

exports.userProfileGetByID = async (req, res, next) => {
  try {
    const userRegister = await UserRegister.findById(req.params.userProfileId);
    // res.json(userRegister);
  return res.json({
          status: true,
          statusCode: 200,
          message: "Your Profile",
          data: {
            userRegister,
          },
        });
      } catch (error) {
       return res.json({
              status: false,
              statusCode: 404,
              message: "something went wrong",
              error: error 
        });
      }
};

//____________________GET___END______________________//

exports.userProfileUpdatebyID = async (req, res, next) => {
  try {
    let { email, username , name} = req.body;

    let checkUserProfile = await db.findOne(UserRegister,{ _id: req.params.userProfileId });

    console.log(checkUserProfile,"checkUserProfile");

    if(!checkUserProfile){
      return res.status(400).send({
        status : false ,
        statusCode : 400,
        message: "Something Went Wrong"
      })
    }

    let dataToSet = {
      email : email || checkUserProfile.email,
      name : name || checkUserProfile.name,
      image : req.files.image
      ? `/upload/${req.files.image[0].filename}`
      : checkUserProfile.imgae,
      updatedAt : Date.now(),
    };

    console.log(dataToSet,"Updated User Profile Data");
    
    let updatesDocs = await db.findAndUpdate(
      UserRegister,
      { _id: req.params.userProfileId },
      dataToSet, { new: true }
    );

    const results = await updatesDocs.save();
    console.log(results,'results')

    if(results){
      return res.status(200).send({
        status : true,
        statusCode : 200,
        message : "user profile updated successfully",
        data : {
          results
        },
      })
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

    // const userRegister = {
    //   email,
    //   name,
    //   image : req.file.path,
    //   //Path: req.file.Link
    // };
    //console.log(req.file.path,"userRegister")


    // if(req.file){
    //   let path = ''
    //   req.file.forEach((file,index,array) => {
    //       path = path + file.path + ','
    //   })
    //   path = path.substring(0, path.lastIndexOf(','))
    //   userRegister.image = path
    // }

    // debugger;

    // const updateListing = await UserRegister.findByIdAndUpdate(
    //   { _id: req.params.userProfileId },
    //   {
    //     email,
    //     name,
    //     image: req.file.path,
    //   //  Path: req.file.path
    //   },
    //   {new: true}
    // );
    // .select("email name _id image")
    // .exec()
    // .then(docs => {
    //   const response = {
    //      data : docs.map(doc => {
    //        return {
    //         // id: req.params.userProfileId,
    //         // email: req.body.email,
    //         // name: req.body.name,
    //         id : docs._id,
    //         name : docs.name,
    //         email : docs.email
    //        }
    //      })
    //   }
    // });


//  if(updateListing){
//    return res.json({
//             status: true,
//             statusCode: 200,
//             message: "user profile update successfully",
//             data: {
//               id: req.params.userProfileId,
//               email: updateListing.email,
//               name: updateListing.name,
//               image : updateListing.image
//             },
//           });
//         }

//   } catch (error) {
//     console.log(error.message ,"message error")
//     return res.json({ 
//             status: false, 
//             statusCode: 409,
//             message : "Something Went Wrong",
//             error: error.message 
//     });
//   }

//_______________user_Verify_OTP_________________//

exports.Verifyotp = async (req, res, next) => {
  // try { 
  //  let {_id}=req.query._id;
   //let {m_otp}= req.query.m_otp;
   // console.log("up and running 147",datas),
  let data = await UserRegister.findOne({
    $or: [{ m_otp : req.query.m_otp, _id: req.query._id}],
  }).then(datas =>{
          //if(datas){
            if (!req.query.m_otp){ 
            return res.json({
              status: false,
              statusCode: 400,
              message: "correct OTP Are Required",
            });
            }else if(!req.query._id){
              return res.json({
                status: false,
                statusCode: 400,
                message: "UserId Are Required",
              });
            }else if(!datas){
              return res.json({
                status: false,
                statusCode: 400,
                message: "Something Went Wrong",
              }); 
            }else{
              res.json({
                status: true,
                statusCode: 200,
                message: "Verification Successfully",
                data: {
                  id: datas._id,
                  phone: datas.phone,
                },
              });
            }
  }).catch(error =>{
   console.log("error", error.message),
   res.json({ 
              status: false, 
              statusCode: 404,
              message : "error found",
              error : error.message,
             })
          }); 
 
 // console.log(datas.m_otp,datas._id, "TopLevel-120");
  
  //   if (!data.m_otp ) {   //&& data.m_otp === undefined || null
  //     return res.json({   //|| !data.m_otp
  //       status: false,    //!req.query.m_otp 
  //       statusCode: 400,
  //       message: "Invalid OTP",
  //     }); 
  //   }else if (!data._id ) //&& data._id === undefined || null
  //   {                          //|| !data._id 
  //     return res.json({        // !req.query._id
  //     status: false,
  //     statusCode: 400,
  //     message: "UserId Error",
  //   }); 
  // }
  // else if (data == 'undefined') {
  //   return res.json({
  //     status: false,
  //     statusCode: 400,
  //     message: "All Data Are Required",
  //   }); 
  // }else {
  //    return res.json({
  //     status: true, 
  //     statusCode: 200,
  //     message: "Verification Successfully",
  //     data: {
  //       id: data._id,
  //       phone: data.phone,
  //     },
  //   });}
  // } catch (error) {
  //   console.log(error.message, "error message");
  //   res.json({message : error.message});
  // }
};

//******find all user details here**************

exports.findAllUsers = async (req, res ,next) => {
  const limit = parseInt(req.body.limit); // Make sure to parse the limit to number
  const skip = parseInt(req.body.skip); // Make sure to parse the skip to number
  let searchObj = {};
  if (req.body.search) {
    searchObj = {
      $or: [
        { name: { $regex: req.body.search, $options: "i" } },
        { phone: req.body.search },
        { email: req.body.search },
      ],
    };
  }
  let count = await UserRegister.countDocuments(searchObj);
  let users = await UserRegister.find(searchObj).skip(skip).limit(limit);
  res.json({ success: true, message: "ALl", data: users, total: count });
};

//_______________________END__OTP__VERIFY______________________//

exports.userLogin = async (req, res, error) => {
  let { deviceType, deviceToken, phone } = req.body;
  const userRegister = await UserRegister.find({
    phone,
    deviceType,
    deviceToken,
  });
  if (!userRegister)
    return res.status(400).json({ message: "phone numbers is wrong" });
};

//*********************************get single user by id************************************* */
exports.getSingleUser = async (req, res ,next) => {
  try {
    const data = await await UserRegister.findById(req.params.userId).populate(
      "bookingId"
    );
    if (!data) {
      return res.send("userId not found" + `${req.params.userId}`);
    }
    return res.send(data);
  } catch (error) {
    return res.send(error);
  }
};

//**********************update user by Id**********************************************//

exports.updateUser = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    let dataUpdate = await UserRegister.findByIdAndUpdate(
      req.params.userId,
      {
        phone: req.body.phone,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
      { new: true }
    );
    if (!dataUpdate) {
      return res.send(" not found" + req.params.userId);
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

//______________start________Notification_______________________//
exports.Addnotification = async (req, res, next) => {
  var notification = {
    title: "Title of notification",
    text: "Subtitle",
  };
  var fcm_tokens = [];
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
      res.status(200).send("Notification send successfully");
    })
    .catch((err) => {
      res.status(400).send("Something Went Wrong!");
      console.log(err);
    });
};
//_______________________Notification_____end___________________//

exports.userActivate_Deactivate = async(req, res, next) => {
      
    // var doc = await UserRegister.findOneAndUpdate(
    //   { _id: req.params.Id },
    //   req.body,
    //   { new: true }
    // );

try { 
    //_id: req.params.id
    const {status}= req.body.status;
    let id = req.params.id;
    var doc = await db.findAndUpdate(UserRegister,{ id },
         status,
    { $upsert: { status } }, {},
     {new:true});
    
    // if(!doc){throw createError(404,'does not exist.')}
    
    if(req.body.status == 'DEACTIVATE')
    return res.json({
        statusCode: 200,
        message: "User De_Activated ",
        data: {
          status: false,
        },
      });else if(req.body.status == "ACTIVATE"){
        return res.json({
            statusCode: 200,
            message: "User Activated ",
            data: {
              status: true,
            },
          });
      }else{
          return res.json({message : "something went wrong"});
      }
    } catch (error) {
        console.log(error.message);
    }finally{console.log("running user active or not")}
};
  
//_________USER_______De_Activated___________________//

exports.activateDeativate = async (req, res ,next) => {
  try {
    let dataUpdate = await UserRegister.findByIdAndUpdate(
      req.params.id,
      {
        isBlocked: req.body.isBlocked,
      },
      { new: true, upsert: true }
    );
    return res.status(200).json({
      code: 200,
      success: true,
      message: "OK",
      data: dataUpdate,
    });
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


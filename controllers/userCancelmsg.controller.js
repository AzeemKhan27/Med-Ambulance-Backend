"use strict";
"--unhandled-rejections=strict";

const { UserCanMsg } = require("../model"); //StatusOfTrip

exports.AdduserMessageCancle = async(req,res) => {
    try {
    
        let userMsgDetails = await UserCanMsg.create({
            cancelReason :req.body.cancelReason
        });
        console.log(userMsgDetails,"activate");
        res.status(200).send({
            status: true,
            statusCode: 200,
            message: "Data Uploaded Successfully",
            data: userMsgDetails
        });
    } catch (error) {
        console.log(error.message);
      res.status(400).send(error.message);
};
};

exports.GetuserMessageCancle = async (req, res) => {
 try {
    let getuserMsgDetails = await UserCanMsg.find()
    res.json({status : true, 
              statusCode : 200,
              message : "view all reason list of user cancel", 
              data : getuserMsgDetails        
    })
 } catch (error) {
     console.log(error.message);
     res.json(error.message);
 }
};
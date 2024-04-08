'use strict';
"--unhandled-rejections=strict";

const { userTrans } = require("../model");
//const { getRandomPin } = require("../utils/helpers");
const db = require("../services/dboperations");

var mqtt = require('mqtt');
const cron = require("node-cron");
const { request } = require('express');

var options = {

    host: "198.199.83.132",
    port: 1883,
    username: "med",
    password: "arub%MaTXn^mbW"

}

//initialize the MQTT client
var client = mqtt.connect(options);

//_____________________________________________________________________//

exports.AddAmtTrans = async(req, res, next) => {
    try {
         // let objectInfos = await userTrans({
        //     bookingId : req.body.bookingId,
        //     AmmountAdd:req.body.AmmountAdd,
        //     AmmountStatus:req.body.AmmountStatus,
        //     TotalPaidAmmount:req.body.TotalPaidAmmount
        // });

        let objectInfos = {
            // UserId : req.body.UserId,
            // DriverId : req.body.DriverId,
            // bookingId : req.body.bookingId,
            AmmountAdd:req.body.AmmountAdd,
            AmmountStatus:req.body.AmmountStatus,
            TotalPaidAmmount:req.body.TotalPaidAmmount
        };
        if (req.body) {
            objectInfos.UserId = req.body.UserId;
            objectInfos.DriverId = req.body.DriverId;
            objectInfos.bookingId = req.body.bookingId;
        }

        let detailsTrans = await userTrans.create(objectInfos);
        if (!detailsTrans) return res.json({
            status: false,
            statusCode: 400,
            message: 'SOMETHING WENT WRONG'
            });
        res.status(200).send({
            status: true,
            statusCode: 200,
            message: "add payment successfully",
            data: {
                 detailsTrans
            },
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

exports.ViewAmountTrans = async (req, res, next) => {
    
   let usersGetTrans = await userTrans.find(req.params.bookingId).limit(1);
   //let usersGetTrans = await db.find(userTrans, { _id: req.params.id }).limit(1);
    if (!usersGetTrans) return res.json({
        status: false,
        statusCode: 400,
        message: 'SOMETHING WENT WRONG' 
        });
    res.json({success: true,count:usersGetTrans.length, message: 'ALL', data: usersGetTrans});
};

exports.ViewAllTrans = async (req,res,next) => {
    try {
         const ViewBylist = await userTrans.find();
            //.findById(req.params.id);
            // .limit()
            // .skip();
        res.json({
            statusCode: 200,
            status: true,
            count:ViewBylist.length,
            message: "view all data",
            data: ViewBylist
        });
    } catch (error) {
        res.json({ message: error });
    }
};

// exports.UpdateAmountTrans = async(req, res, next) => {
//     try {
//         let getAmbTrans = await userTrans.find( {
//           _id: req.params.id,
//           bookingId : req.body.bookingId
//         });
//         if (!getAmbTrans) return res.json({
//           status: true,
//           statusCode: 404,
//           message: "Not Found",
//           data: updatedList,
//         });
        
//         const list = {
//             TotalPaidAmmount : req.body.TotalPaidAmmount || getAmbTrans.TotalPaidAmmount,
//             AmmountStatus : req.body.AmmountStatus || getAmbTrans.AmmountStatus
//         };
//         const updatedList = await userTrans.findByIdAndUpdate({ _id: req.params.id ? bookingId: req.body.bookingId},
//             list ,{new:true}
//         );
//         console.log(updatedList);
//         res.json({ status: true, statusCode: 200, message: "update successfully", data: updatedList });
//     } catch (error) {
//         res.json({ message: error, statusCode: 500 });
//     }
// };


//setup the callbacks
client.on('connect', function () {
    console.log('Connected');
});

client.on('error', function (error) {
    console.log(error);
});

client.on('msg', function (topic, msg) {
    console.log('Received msg:', topic, msg.toString());
});

try {
    //client.subscribe('UserID/booking');
    //client.publish('UserID/booking', 'hiii');
} catch (error) {
    console.log(error, "error found");
}

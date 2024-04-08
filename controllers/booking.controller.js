// 'use strict';
// "--unhandled-rejections=strict";

// const { bookamb, DriverRegister } = require("../model");
// const { getRandomPin } = require("../utils/helpers");

// var mqtt = require('mqtt');
// const cron = require("node-cron");
// const { request } = require('express');

// var options = {

//     host: "67.205.166.11",
//     port: 1883,
//     username: "med",
//     password: "arub%MaTXn^mbW"

// }

// //initialize the MQTT client
// var client = mqtt.connect(options);

// exports.addbooking = async (req, res, next) => {
//     try {

//         let datanearambu = await DriverRegister.aggregate([
//             {

//                 "$geoNear": {
//                     "near": {
//                         "type": "Point",
//                         "coordinates": [parseFloat(req.body.sorclongitude), parseFloat(req.body.sorclatitude)],
//                         //"coordinates": [ "-80", "25.74673" ]
//                     },
//                     "maxDistance": 5000 * 1609,
//                     "spherical": true,
//                     "distanceField": "distance",
//                     "distanceMultiplier": 0.000621371
//                 },
//             },
//             {
//                 "$match": { "status": "ONLINE" }

//             },
//             { "$limit": 1 },
//         ])
//         let Driver = datanearambu[0]._id
//         // let driver = ' {"data":' + `${datanearambu[0]}` + '}'
//         // console.log(Driver);
//         let topic1 = Driver + '/request'
//         if (datanearambu.length > 0) {
//             // 2 abmullance availab;e

//             const booking = await bookamb({
//                 UserId: req.body.UserId,
//                 DriverId: req.body.DriverId,
//                 ambtype: req.body.ambtype,
//                 name: req.body.name,
//                 sorclongitude: req.body.sorclongitude,
//                 sorclatitude: req.body.sorclatitude,
//                 deslongitude: req.body.deslongitude,
//                 deslatitude: req.body.deslatitude,
//                 sorcaddress: req.body.sorcaddress,
//                 desaddress: req.body.desaddress,
//                 totalprice: req.body.totalprice
//             })
//             // let topic = booking.UserId + '/booking'

//             let savedboking = await booking.save();

//             res.json({
//                 statusCode: 200,
//                 data: datanearambu,
//                 success: true,
//                 count: datanearambu.length,
//             });
//             //let data1 = '{"data":' + JSON.stringify(datanearambu[0])  + '}'
//             let data1 = "" + JSON.stringify(savedboking)
//             console.log(topic1);
//             console.log(data1);
//             client.publish(topic1, data1);

//         } else {
//             return res.send(datanearambu)
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// exports.accepeteddriver = async (req, res, next) => {

//     try {

//         const m_otp = getRandomPin('0123456789', 4);
//         let driverdata = await DriverRegister.findById(req.body.DriverId)

//         const acceptbooking = await bookamb({
//             UserId: req.body.UserId,
//             DriverId: req.body.DriverId,
//             //drivername: req.body.drivername,
//             // phone: req.body.phone,
//             m_otp: m_otp,
//             sorclongitude: req.body.sorclongitude,
//             sorclatitude: req.body.sorclatitude,
//             deslongitude: req.body.deslongitude,
//             deslatitude: req.body.deslatitude,
//             sorcaddress: req.body.sorcaddress,
//             desaddress: req.body.desaddress,
//             availabilty: req.body.availabilty

//         })
//         let topic2 = acceptbooking.UserId + '/booking'
//         let topic3 = acceptbooking.UserId + '/ambulanceLiveLocation'
//         let savedacceptbooking = await acceptbooking.save();

//         let drivername = driverdata.drivername;
//         let phone = driverdata.phone
//         // let latitude = driverdata.latitude;
//         // let longitude = driverdata.longitude;

//         // const datacron = {
//         //     latitude,longitude
//         // }
//         const person = {
//             savedacceptbooking
//         }
//         const student = {
//             drivername, phone
//         }
//         // merge two objects
//         const newObj = Object.assign(person, student);
//         let data2 = '{ "booking":' + JSON.stringify(newObj) + '}'
//         console.log(topic2);
//         console.log(data2);
//         client.publish(topic2, data2);

//         let sendLocationData = `"latitude":${driverdata.latitude},"longitude":${driverdata.longitude}`
//         //console.log(driverdata.latitude);
//         cron.schedule("* * * * * * * * * * * * * * * * * ", function () {
//             // var doc =  DriverRegister.findOneAndUpdate({ _id: req.body.Id }, req.body.sendLocationData, { new: true });
//             let data3 = '{"ambulanceLiveLocation":{ ' + `${sendLocationData}` + '}}'
//             console.log(topic3);
//             console.log(data3);
//             client.publish(topic3, data3);
//         })
//         res.json({
//             status: true,
//             statusCode: 200,
//             data: savedacceptbooking,
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }

// exports.addTrip = async (req, res, next) => {

//     try {
//         let tripVerify = await bookamb.findOne({
//             m_otp: req.body.m_otp,
//             DriverId: req.body.DriverId
//         });
//         if (!tripVerify) {
//             return res.json({
//                 status: false,
//                 statusCode: 400,
//                 message: 'Invalid OTP'
//             });
//         } else {
//             let { DriverId, UserId, m_otp, sorclongitude, sorclatitude, deslongitude, deslatitude, starttrip } = req.body
//             let topic = UserId + '/starttrip'
//             const addedtrip = await bookamb.create(req.body);
//             let data = '{ "starttrip":' + JSON.stringify(addedtrip) + '}'
//             console.log(topic);
//             console.log(data);
//             client.publish(topic, data);
//             return res.json({
//                 status: true,
//                 statusCode: 200,
//                 data: addedtrip,
//             });
//             //res.status(400).send(returnObj);
//         }

//     } catch (error) {
//         console.log(error)
//     }
// }

// exports.drivercancelTrip = async (req, res) => {

//     try {

//         let { DriverId, canceltrip, availabilty } = req.body
//         //let topic = DriverId + '/canceltrip'

//         const canceledtrip = await bookamb.create(req.body);
//         res.json({
//             status: true,
//             statusCode: 200,
//             data: canceledtrip
//         });
//     } catch (error) {
//         console.log(error)
//     }
// }

// exports.usercancelTrip = async (req, res) => {

//     try {

//         let { UserId, canceltrip, availabilty } = req.body
//         //let topic = DriverId + '/canceltrip'

//         const canceledtrip = await bookamb.create(req.body);
//         res.json({
//             status: true,
//             statusCode: 200,
//             data: canceledtrip
//         });
//     } catch (error) {
//         console.log(error)
//     }
// }

// exports.endTrip = async (req, res) => {

//     try {
//         let { DriverId, UserId, endtrip, availabilty } = req.body
//         let topic = UserId + '/endtrip'
//         const endedtrip = await bookamb.create(req.body);
//         let data = '{ "endtrip":' + JSON.stringify(endedtrip) + '}'
//         console.log(topic);
//         console.log(data);
//         client.publish(topic, data);
//         return res.json({
//             status: true,
//             statusCode: 200,
//             data: endedtrip,
//         });
//         //res.status(400).send(returnObj);

//     } catch (error) {
//         console.log(error)
//     }
// }

// exports.allmytrip = async (req, res) => {

//     try {
//         console.log(req.query.DriverId);
//         const tripData = await bookamb.findOne(req.query.DriverId);
//         return res.json({
//             status: true,
//             statusCode: 200,
//             data: [tripData]
//         });
//         //res.status(400).send(returnObj);

//     } catch (error) {
//         console.log(error)
//     }
// }

// exports.userallmytrip = async (req, res) => {

//     try {
//         // console.log(req.query.DriverId);
//         const tripdata = await bookamb.findOne(req.query.UserId);
//         return res.json({
//             status: true,
//             statusCode: 200,
//             data: [tripdata]
//         });
//         //res.status(400).send(returnObj);

//     } catch (error) {
//         console.log(error)
//     }
// }

// //setup the callbacks
// client.on('connect', function () {
//     console.log('Connected');
// });

// client.on('error', function (error) {
//     console.log(error);
// });

// client.on('msg', function (topic, msg) {
//     //Called each time a message is received
//     console.log('Received msg:', topic, msg.toString());
// });

// try {
//     //client.subscribe('UserID/booking');
//     //client.publish('UserID/booking', 'hiii');
// } catch (error) {
//     console.log(error, "error found");
// }

"use strict";
"--unhandled-rejections=strict";

const { bookamb, DriverRegister, Payment } = require("../model"); //StatusOfTrip
const { getRandomPin } = require("../utils/helpers");

var mqtt = require("mqtt");
const cron = require("node-cron");
const { request } = require("express");
const db = require("../services/dboperations");

// var Enum = require('enum');

// // or extend node.js with this new type
// require('enum').// define an enum with own values

// var myEnum = new Enum({'A': 1, 'B': 2, 'C': 4});

var options = {
    host: "198.199.83.132",
    port: 1883,
    username: "med",
    password: "arub%MaTXn^mbW",
};

//initialize the MQTT client
var client = mqtt.connect(options);

exports.accepeteddriver = async(req, res, next) => {
    try {
        const m_otp = getRandomPin("0123456789", 4);
        console.log(m_otp);
        let driverdata = await DriverRegister.findById({
            //DriverId: req.body.DriverId,
            _id: req.body.DriverId,
        });

        console.log(driverdata, "++++++++++3333333999999999++++++");

        const acceptbooking = await bookamb({
            // UserId: req.body.UserId,
            //DriverId: req.body._id,
            DriverId: req.body.DriverId,
            //drivername: req.body.drivername,
            // phone: req.body.phone,
            m_otp: m_otp,
            sorclongitude: req.body.sorclongitude,
            sorclatitude: req.body.sorclatitude,
            deslongitude: req.body.deslongitude,
            deslatitude: req.body.deslatitude,
            sorcaddress: req.body.sorcaddress,
            desaddress: req.body.desaddress, 
            availabilty: req.body.availabilty,
            vehicle : req.body.vehicle
        });

        let topic2 = acceptbooking.UserId + "/booking";
        console.log(topic2,'topic2topic2topic2');
        // debugger;
        let topic3 = acceptbooking.UserId + "/ambulanceLiveLocation";
        console.log(topic3,"topic3")
        // debugger;
        let savedacceptbooking = await acceptbooking.save();
        console.log(savedacceptbooking,"savedacceptbooking")
        // debugger;

        let drivername = driverdata.drivername;
        console.log(drivername,"drivername");
        // debugger;
        let phone = driverdata.phone;
        console.log(phone,"phone")
        // debugger;
        // let latitude = driverdata.latitude;
        // let longitude = driverdata.longitude;

        // const datacron = {
        //     latitude,longitude
        // }
        const person = {
            savedacceptbooking,
        };
        console.log(person, "\n PERSON data working 767677876");
        // debugger;
        const student = {
            drivername, // 609a0709ae0a84941b1f0a95
            phone,
        };

        console.log(student, "\n STUDENT working sucess 23456789 ");
        // debugger
        // merge two objects
        const newObj = Object.assign(person, student);
        let data2 = '{ "booking":' + JSON.stringify(newObj) + "}";
        console.log(topic2);
        console.log(data2);
        client.publish(topic2, data2);

        console.log(topic2, "\n booking working successfully.............");
        console.log(data2, "\n booking working successfully.............");

        console.log(newObj, "\n newObj working  successfully  line 387.....");

        let sendLocationData = [driverdata.latitude, driverdata.longitude];

        console.log(
            sendLocationData,
            "\n sendLocationData line 385 working success....."
        );

        //console.log(driverdata.latitude);
        cron.schedule("* * * * * * * * * * * * * * * * * ", function() {
            // var doc =  DriverRegister.findOneAndUpdate({ _id: req.body.Id }, req.body.sendLocationData, { new: true });
            let data3 = '{"ambulanceLiveLocation":{ ' + `${sendLocationData}` + "}}";
            console.log(topic3);
            console.log(data3, "\n data3 working data3....... 34567890");
            client.publish(topic3, data3);
        });
        res.json({
            status: true,
            statusCode: 200,
            data: savedacceptbooking,
        });
    } catch (error) {
        console.log(error);
    }
};

exports.addbooking = async(req, res, next) => {
    try {
        console.log(req.body.sorclongitude, req.body.sorclatitude);

        let datanearambu = await DriverRegister.aggregate([{
                $geoNear: {
                    near: {
                        type: "Point",
                        coordinates: [
                            parseFloat(req.body.sorclongitude),
                            parseFloat(req.body.sorclatitude),
                        ],
                        //"coordinates": [ "-80", "25.74673" ]
                    },
                    maxDistance: 5000 * 1609,
                    spherical: true,
                    distanceField: "distance",
                    distanceMultiplier: 0.000621371,
                },
            },
            {
                $match: { status: "ONLINE" },
            },
            { $limit: 1 },
        ]);
        // let DriversTest = datanearambu.length > 0;
        console.log(datanearambu,"let Driver = datanearambu[0]._id;");


        if (datanearambu.length > 0) {
            let Driver = datanearambu[0]._id;
            console.log(Driver,"DriverId");

            var topic1 = Driver + "/request";

            console.log(topic1,"11111");
            let m_otp = getRandomPin("0123456789", 4);

            console.log(m_otp)

            const booking = await bookamb({ 
                m_otp:m_otp,
                UserId: req.body.UserId,
                DriverId: Driver,
                ambtype: req.body.ambtype,
                ambSubType: req.body.ambSubType,
                name: req.body.name,
                sorclongitude: req.body.sorclongitude,
                sorclatitude: req.body.sorclatitude,
                deslongitude: req.body.deslongitude,
                deslatitude: req.body.deslatitude,
                sorcaddress: req.body.sorcaddress,
                desaddress: req.body.desaddress,
                tripFrom: req.body.tripFrom,
                tripTo: req.body.tripTo,
                totalprice: req.body.totalprice,
                requestTime: Date.now(),
            });
            
            console.log(booking,"booking")

            let savedboking = await booking.save();
                res.json({
                statusCode: 200, 
                data: { bookingData: savedboking, driverData: datanearambu[0] },
                success: true,
                count: datanearambu.length
            });
        
            console.log(savedboking,"savedboking")

            //let data1 = '{"data":' + JSON.stringify(datanearambu[0]) + "}";
            let data1 = '{"booking":' + JSON.stringify(savedboking) + "}";
            // let data1 = "" + JSON.stringify(savedboking);
            console.log(topic1)
           
            client.publish(topic1, data1);
        } 
        else {
            return res.send({
                statusCode: 404,
                status: false,
                message: "No driver found"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            statusCode : 500,
            message : "Error Found",
            error : error.message
        })
    }
};
//___________get booking by userid_______start_______________________//

exports.getBooking = async(req, res, next) => {
    //let GetDataNearAmbu = await DriverRegister.findById({UserId: req.params.UserId});
    let { UserId } = req.params;
    let GetDataNearAmbu = await DriverRegister.findOne(UserId);
    return res.json({data : GetDataNearAmbu})
    //let GetDataNearAmbu = await DriverRegister.find();
};

exports.driverResponse = async(req, res, next) => {
    try {
        let {
            bookingId,
            cancel,
            cancelReason,
            availabilty,
            driverLat,
            driverLong,
        } = req.body;

        let getBookingData = await bookamb
            .findById(bookingId)
            .populate("UserId")
            .populate("DriverId");

            console.log(getBookingData,"getBookingData");
            

        if (!getBookingData)
            return res.status(404).send({ message: "Not Found", statusCode: 404 });

        if (cancel) {
            let updateCancelBooking = await db.findAndUpdate(
                bookamb, { _id: bookingId }, { cancelReason,canceltrip: "TRIP_CANCELLED", cancelledBy: "DRIVER", tripStatus: "cancelled" }, { new: true }
            );
            return res.send({
                message: "Driver declined your request",
                data: updateCancelBooking,
                statusCode: 406,
            });
        }
       // let m_otp = getRandomPin("0123456789", 4);
        let dataToSet = {
            // m_otp,
            tripStatus: "accepted",
            availabilty,
            starttrip : " ",
            endtrip : " ",
            canceltrip : " "
        };
        console.log(dataToSet, "dataToSet");

        let updateAcceptedBooking = await db.findAndUpdate(
            bookamb, { _id: bookingId },
            dataToSet, { new: true }
        );
        console.log(updateAcceptedBooking,"updateAcceptedBooking")
        console.log(
            "comming UserId",
            getBookingData.UserId._id,
            getBookingData.DriverId._id
        );
        //______booking topic____________//

        let topic2 = getBookingData.UserId._id + "/booking";
        console.log(topic2,"topic");
        let data2 = '{ "booking":' + JSON.stringify(getBookingData) + "}";

        //_______end _____//

        //liveRemove

        client.publish(topic2, data2);
        // debugger;

        //__liveLocation __//
        //let topic4 = getBookingData.DriverId._id + "/ambulanceLiveLocation";
        let topic3 = `${getBookingData.UserId._id} /ambulanceLiveLocation`;

        console.log(`${topic3} topic3`)
        //console.log(`${topic4} topic4`)

        // debugger;
        // const strTopic4 = JSON.stringify(topic4)
        // console.log(`${strTopic4} strTopic4`)

        // debugger;
        //__________end _____//

        let sendLocationData = [driverLat, driverLong];
        console.log(`${sendLocationData} sendLocationData`);
        // debugger;
        
       cron.schedule("* * * * * * * * * * * * * * * * *",() => {

        let data3 = '{"ambulanceLiveLocation":{ ' + `${sendLocationData}` + "}}";

        console.log(`${data3} data3data3`)
        // debugger;
        client.publish(topic3, data3);
    });
       return res.send({
              status: true,
              statusCode: 200,
              data: updateAcceptedBooking,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: error });
    }
};

exports.startTrip = async(req, res, next) => {
    try {
        let { m_otp, bookingId } = req.body;
        let rideData = await bookamb.findOne({
            _id: bookingId,
        });
        console.log(rideData, rideData.m_otp, m_otp);
        if (!rideData)
            return res.send({
                status: false,
                statusCode: 404,
                message: "Ride not fount",
            });
        if (rideData.m_otp !== m_otp)
            return res.send({
                status: false,
                statusCode: 404,
                message: "Otp not matched",
            });
        let topic = rideData.UserId + "/starttrip";
        let dataToSet = {
            tripStatus: "active",
            starttrip : "TRIP_STARTED",
            canceltrip : " ",
            endtrip : " "
        }; 
        let updateBooking = await db.findAndUpdate(
            bookamb, { _id: bookingId },
            dataToSet, { new: true }
        );
        client.publish(topic, '{"startTrip":' + JSON.stringify(updateBooking) + "}");
        return res.json({
            status: true,
            statusCode: 200,
            message : "Trip Started Successfully",
            data: updateBooking,
        });
        //res.status(400).send(returnObj);
    } catch (error) {
        console.log(error);
    }
};

exports.drivercancelTrip = async(req, res, next) => {
    try {
        let { DriverId, canceltrip, availabilty, Tripstatus } = req.body;
        //Tripstatus : getStatus()

        //let topic = DriverId + '/canceltrip'

        const canceledtrip = await bookamb.create(req.body);
        return res.json({
            status: true,
            statusCode: 200,
            data: canceledtrip,
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            status: false,
            statusCode : 404,
            message : "Error Found",
            error : error.message
        })
    }
};

exports.usercancelTrip = async(req, res, next) => {
    //post

    try {
        let { cancelReason, bookingId } = req.body;
        let findBooking = await db.findOne(bookamb, { _id: bookingId });
        //let maping = findBooking.sort(item => `${item.DriverId}`)
        console.log(`${findBooking.UserId} findBooking`)

        if (!findBooking)
            return res.status(404).send({       
                message: "Not Found",
                statusCode: 404 
            });

        let topic = findBooking.DriverId + "/cancelledTrip";
        console.log(`${topic} topicsss`)
    
        let dataToSet = {
            cancelReason,
            cancelledBy: "user",
            tripStatus: "cancelled",
        };

        let updateBooking = await db.findAndUpdate(
            bookamb, { _id: bookingId },
            dataToSet, { new : true }
        );
        console.log(updateBooking,"updateBooking")

       client.publish(topic,'{"cancelledTrip":' + JSON.stringify(updateBooking) + "}");
       return res.json({
              status: true,
              statusCode: 200,
              data: updateBooking,
        });
    } catch (error) {
        console.log(error.message);
     return res.status(409).send({
            status : false ,
            statusCode : 409 ,
            message : "Something Went Wrong" ,
            error : error.message
        });
    }
};

exports.CancelTrips_Driver = async (req, res, next) => {
  try {
      let { cancelReason, DriverId } = req.body;   
      let findDriver = db.findOne(bookamb, {DriverId: DriverId});
      if(!findDriver){
          return res.status(404).send({status: false,statusCode : 404,message: "Not Found"});
      }
      let dataToSett = {
          cancelReason ,
          cancelledBy : "Driver",
          tripStatus : "cancelled",
      };
      let updateDrivers = await db.findAndUpdate(
          bookamb, {DriverId : DriverId },
          dataToSett, { new: true }
      );
      return res.status(200).send({
             status : true,
             statusCode : 200,
             data : updateDrivers
      });
  } catch (error) {
      console.log(error.message,"error found")
      return res.status(409).send({
             status : false,
             statusCode : 409,
             message : "Something Went Wrong",
             error : error.message
      });
  }
};

exports.endTrip = async(req, res, next) => {
    try {
        let { bookingId } = req.body;
        let getRideData = await db.findOne(bookamb, { _id: bookingId });
        if (!getRideData)
            return res.send({
                status: false,
                statusCode: 404,
                message: "Ride Not found",
            });

        //dataToset for status
        let dataToSet = {
            tripStatus: "completed",
            starttrip : " ",
            endtrip : "TRIP ENDED"
        };
        let updateBooking = await db.findAndUpdate(
            bookamb, { _id: bookingId },
            dataToSet, {
                new: true,
            }
        );
        let topic = getRideData.UserId + "/endtrip";
        console.log(topic,"endtrip");
        client.publish(topic, '{"endtrip":' + JSON.stringify(updateBooking) + "}");
        return res.json({
            status: true,
            statusCode: 200,
            data: updateBooking,
        });
        //res.status(400).send(returnObj);
    } catch (error) {
        console.log(error.message);
        res.json({
                  status : false,
                  statusCode :400,
                  message : "Error Found",
                  error:error.message
        });
    }
};

exports.statusUpdate = async(req, res, next) => {
    let getStatus = await bookamb.find(({ UserId, DriverId, _id } = req.params));

    if (getStatus.length < 1)
        return res.json({
            status: true,
            statusCode: 404,
            message: "Not matched",
            data: getStatusData,
        });

    let ChangeStatus = {
        Tripstatus: req.body.Tripstatus || getStatus[0].Tripstatus,
    };

    try {
        let getStatusData = await bookamb.findOneAndUpdate({ _id: getlastride[0]._id },
            ChangeStatus, { new: true }
        );

        return res.json({
            status: true,
            statusCode: 200,
            message: "Tripstatus Success.",
            Tripstatus: getStatusData,
        });
    } catch (error) {
        res.json({ status :false, statusCode: 500,message: error.message });
        console.log(error.message)
    }
};
//_________________end work of trip__________________//

exports.allmytrip = async(req, res, next) => {
    try {
        console.log(req.query.DriverId);
        const tripData = await bookamb.findOne(req.query.DriverId);
        return res.json({
            status: true,
            statusCode: 200,
            data: [tripData],
        });
        //res.status(400).send(returnObj);
    } catch (error) {
        console.log(error.message);
        res.json({status : false,message: error.message});
    }
};

exports.userallmytrip = async(req, res, next) => {
    try {
        // console.log(req.query.DriverId);
        const tripdata = await bookamb.findOne(req.query.UserId);
        return res.json({
            status: true,
            statusCode: 200,
            data: [tripdata],
        });
        //res.status(400).send(returnObj);
    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            status: false,
            statusCode : 404,
            message : "Error Found",
            error : error.message
        })
    }
};
//____________________________lastUserRide________________start____//
exports.userlastmytrip = async (req, res, next) => {
    try {
        const lastRideData = await bookamb.findOne(req.query.UserId);
        return res.json({
            status: true,
            statusCode: 200,
            data: [lastRideData]
        });
    } catch (error) {
        res.status(404).json({
            status: false,
            statusCode : 404,
            message : "Error Found",
            error : error.message
        })
    }
};
//____________________________lastUserRide________________end______//

//______last ride user__(Support-User)_______// 

exports.feedbackUserlstRide = async(req, res, next) => {
    let getlastride = await bookamb
        .find({
            UserId: req.params.UserId,
            //_id:req.params.rideId
        })
        .sort({ UserId: -1 })
        .limit(1);

    if (getlastride.length < 1)
        return res.json({
            status: true,
            statusCode: 404,
            message: "Not matched",
            data: feedbackTripData,
        });

    let commend = { feedback: req.body.feedback || getlastride[0].feedback };

    try {
        let feedbackTripData = await bookamb.findOneAndUpdate({ _id: getlastride[0]._id },
            //let feedbackTripData = await bookamb.findOneAndUpdate({_id:req.params.rideId},
            //let feedbackTripData = await bookamb.findOneAndUpdate({UserId:req.params.UserId,_id:req.params.rideId},
            commend, { new: true }
        );

        return res.json({
            status: true,
            statusCode: 200,
            message: "feedback success.",
            feedback: feedbackTripData,
        });
    } catch (error) {
        res.json({ 
            status : false,
            statusCode: 409,
            message : "something went wrong",
            error: error.message
        });
    }
};

//______last ride user________//

//___________________________________________________________________//

//_start_____Payment flow api________//

exports.AddPayment = async(req, res, next) => {
    try {
        let objectInfos = {
            paymentType: req.body.paymentType,
            status: req.body.status,
            Amount: req.body.Amount,
        };

        if (req.body) {
            //objectInfos.TransactionId = req.body.TransactionId;
            objectInfos.DriverId = req.body.DriverId;
            objectInfos.bookingId = req.body.bookingId;
            objectInfos.UserId = req.body.UserId;
        }

        let detailsPayment = await Payment.create(objectInfos);
        if (!detailsPayment)
            return res.json({
                status: false,
                statusCode: 400,
                message: "SOMETHING WENT WRONG",
            });

        let data_1 = '{ "paymentByCash":' + JSON.stringify(detailsPayment) + "}";
        let topic_1 = detailsPayment.DriverId + "/payment";
        console.log(topic_1,"3457890")

        client.publish(topic_1,data_1);

       return res.status(200).send({
                status: true,
                statusCode: 200,
                message: "Payment Successfully",
                data: {
                    detailsPayment,
                },
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

exports.ConfirmPaymentByDriverSide = async(req, res, next) => {
    try {
        let objectInfoz = {
            paymentType: req.body.paymentType,
            status: req.body.status,
            Amount: req.body.Amount,
        };
        console.log(objectInfoz,"objectInfoz")

        if (req.body) {
            //objectInfos.TransactionId = req.body.TransactionId;
            objectInfoz.DriverId = req.body.DriverId;
            objectInfoz.bookingId = req.body.bookingId;
            objectInfoz.UserId = req.body.UserId;
        }

        let detailsPaymentConfirm = await Payment.create(objectInfoz);
        if (!detailsPaymentConfirm)
            return res.json({
                status: false,
                statusCode: 400,
                message: "SOMETHING WENT WRONG",
            });

        let data_1 = '{ "paymentConfirmed":' + JSON.stringify(detailsPaymentConfirm) + "}";
        let topic_1 = detailsPaymentConfirm.UserId + "/paymentConfirmed";
        console.log(topic_1,"response of mqttttt")

        client.publish(topic_1,data_1);

        return res.status(200).send({
            status: true,
            statusCode: 200,
            message: "Payment Confirmed Successfully",
            data: {
                detailsPaymentConfirm,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

exports.PaymentViewById = async(req, res, next) => {
    //let usersGetPayment = await Payment.find({DriverId:req.params.DriverId}).limit(1);
    let usersGetPayment = await Payment.find(req.query).limit(1);

    if (!usersGetPayment)
        return res.json({
            status: false,
            statusCode: 400,
            message: "SOMETHING WENT WRONG",
        });
     return res.json({
            success: true,
            count: usersGetPayment.length,
            message: "ALL",
            data: usersGetPayment,
    });
};

exports.ViewAllPayment = async(req, res, next) => {
    try {
        const limit = parseInt(req.query.limit); // Make sure to parse the limit to number
        const skip = parseInt(req.query.skip); // Make sure to parse the skip to number
        let searchObj = {};
        if (req.query.search) {
            searchObj = {
                $or: [
                    { PaymentCateg: { $regex: req.query.search, $options: "i" } },
                    { paymentType: req.query.search },
                    { status: req.query.search },
                ],
            };
        }
        let count = await Payment.countDocuments(searchObj);
        let users = await Payment.find(searchObj).skip(skip).limit(limit);
        res.json({
            success: true,
            message: "view all payment",
            data: users,
            total: count,
        });
        // };
        //__limit___//

        //  const ViewBylist = await payment.find();

        // res.json({
        //     statusCode: 200,
        //     status: true,
        //     count:ViewBylist.length,
        //     message: "view all payment data",
        //     data: ViewBylist
        // });
    } catch (error) {
        res.json({ message: error });
    }
};

exports.PaymentStatus = async(req, res, next) => {

//     try {
//         let {
//             StatusPayment,
//             DriverId
//         } = req.body;

//         let getPaymentData = await Payment.findById({DriverId:DriverId})
//         .populate("DriverId")
//         console.log(getPaymentData,"getPaymentData");
//         debugger;
//         if(!getPaymentData) {
//             return res.status(404).send({
//             statusCode: 404,
//             message: "Something Went Wrong",
//             })
//         }
//         // console.log(!getPaymentData,"NotgetPaymentData")
//         // debugger;

//         if(StatusPayment){
//             let updateStatusPayment = await db.findAndUpdate(
//                 Payment, { DriverId : DriverId}, {paymentStatus: "Success!" }, { new: true }
//             );
//             return res.send({
//                 message: "Payment Success!!!",
//                 data: updateStatusPayment,
//                 statusCode: 406,
//             });
//         };

//         let dataToSet = {
//             paymentStatus: "Payment Failed"
//         }

//         let updateAcceptedPayment = await db.findAndUpdate(
//             Payment, { DriverId: req.body.DriverId},
//             dataToSet, { new: true }
//         );
//         if(updateAcceptedPayment){
//             return res.status(400).send({
//                 statusCode : 400,
//                 data : updateAcceptedPayment
//             })
//         }
//         console.log(
//             "updateAcceptedPayment coming data",
//             updateAcceptedPayment
//         );

//     } catch (error) {
//         res.json({ error: error.message, statusCode: 500 });
//     }
// };

try {
let PmtStatusUpdData = await Payment.findOneAndUpdate({ DriverId: req.params.DriverId },
     req.body,
    { new: true }
);
console.log(PmtStatusUpdData,"PmtStatusUpdData");

 if(PmtStatusUpdData.StatusPayment){
    return res.json({
        status: true,
        statusCode: 200,
        message: "Payment Success!",
        statusPayment: [PmtStatusUpdData],
    });
 }else{
    return res.json({
        status: false,
        statusCode: 201,
        message: "Payment Failed!",
        statusPayment: null,
    });
 }
} catch (error) {
    res.json({ error: error.message, statusCode: 500 });
}
};


//______Payment flow api__end________//

//__________________________________________________________________//

//setup the callbacks

client.on("connect", function() {
    console.log("Connected");
});

client.on("error", function(error) {
    console.log(error);
});

client.on("msg", function(topic, msg) {
    //Called each time a message is received
    console.log("Received msg:", topic, msg.toString());
});

// try {
//     //client.subscribe('UserID/booking');
//     //client.publish('UserID/booking', 'hiii');
// } catch (error) {
//     console.log(error, "error found");
// }

//_______start____________User SortedTrip_________________//

exports.User_SingleSortedTrip = async (req ,res , next) => {
  let { userId } = req.params;
  let { tripStatus } = req.query;
  let { limit , skip} = req.query;

  try {
      let userCriteria = { 
          tripStatus,
          UserId : userId,
       };
       console.log(userCriteria.UserId,"user@#$%^&*")
       let userCounts = await bookamb.countDocuments(userCriteria);
       let getByUserIdSortedTrip = await bookamb
       .find(userCriteria)
       .skip(parseInt(skip))
       .limit(parseInt(limit))
       .sort({ createdAt: -1 })
       .populate('UserId')
       .populate('DriverId')

       return res.status(200).send({
               status : true,
               statusCode : 200,
               message : " OK",
               data : getByUserIdSortedTrip,
               total : userCounts
       });
  } catch (error) {
      return res.status(404).send({
           status : false,
           statusCode : 404,
           message : "Something Went Wrong",
           error : error.message
      });
    }
};

//_____________________User SortedTrip_________end________//

exports.Single_SortedTrip = async( req, res, next) => {
    let { tripStatus } = req.query;
    let { limit , skip } = req.query;
    let { driverId } = req.params;
    try {
        let criterias = {
            tripStatus,
            DriverId: driverId,
        };
        let counts = await bookamb.countDocuments(criterias);
        let getByIdSortedTrips = await bookamb
        .find(criterias)
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .sort( {createdAt: -1})
        .populate("UserId")
        .populate("DriverId")

        return res.status(200).send({
           status : true,
           statusCode : 200,
           message : "OK",
           data : getByIdSortedTrips,
           total : counts
        });
    } catch (error) {
        return res.status(404).send({
         status : false ,
         statusCode : 404,
         message : "Something went wrong",
         error : error.message
        });
    }
};


exports.sortedTrip = async(req, res, next) => {
    let { tripStatus } = req.params;
    let { limit, skip } = req.query;
    try {
        let criteria = {
            tripStatus,
        };
        let count = await bookamb.countDocuments(criteria);
        let getSortedTrips = await bookamb
            .find(criteria)
            .skip(parseInt(skip))
            .limit(parseInt(limit))
            .populate("UserId")
            .populate("DriverId");
        return res.send({
            status : true,
            message: "OK",
            statusCode: 200,
            data: getSortedTrips,
            total: count,
        });
    } catch (error) {
        res.status(400).send({
            status : false,
            statusCode: 400,
            message: "Something went wrong",
            error : error.message
        });
    }
};

exports.allDriverTrips = async (req, res, next) => {
  let { driverId } = req.params;
  let { limit, skip } = req.query;
  try {
    let criteria = {
      DriverId: driverId,
    };
    let getSortedTrips = await bookamb
      .find(criteria)
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate("UserId")
      .populate("DriverId");
    let count = await bookamb.countDocuments(criteria);

    return res.send({
      status : true,
      message: "OK",
      statusCode: 200,
      data: getSortedTrips,
      total:count
    });
  } catch (error) {
    res.status(400).send({
      status : false,
      statusCode: 400,
      message: "Something went wrong",
      error : error.message
    });
  }
};

exports.driverSingleTrip = async(req, res, next) => {
    let { driverId, bookingId } = req.params;
    try {
        let criteria = {
            DriverId: driverId,
            _id: bookingId,
        };
        let getSortedTrips = await bookamb
            .findOne(criteria)
            .populate("UserId")
            .populate("DriverId");
         return res.send({
                message: "OK",
                statusCode: 200,
                data: getSortedTrips,
        });
    } catch (error) {
         return res.status(400).send({
                status : false,
                statusCode: 400,
                message: "Something went wrong",
                error : error.message
        });
    }
};

exports.allUserTrips = async (req, res, next) => {
  let { userId } = req.params;
  let { limit, skip } = req.query;
  try {
    let criteria = {
      UserId: userId,
    };

    let getSortedTrips = await bookamb
      .find(criteria)
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate("UserId")
      .populate("DriverId");
    let count = await bookamb.countDocuments(criteria);

    return res.send({
      message: "OK",
      statusCode: 200,
      data: getSortedTrips,
      total: count,
    });
  } catch (error) {
    res.status(400).send({
      status : false,
      statusCode: 400,
      message: "Something went wrong",
      error : error.message
    });
  }
};

exports.userSingleTrip = async(req, res, next) => {
    let { userId, bookingId } = req.params;
    try {
        let criteria = {
            UserId: userId,
            _id: bookingId,
        };
        let getSortedTrips = await bookamb
            .findOne(criteria)
            .populate("UserId")
            .populate("DriverId");
        return res.send({
            status : true,
            message: "OK",
            statusCode: 200,
            data: getSortedTrips,
        });
    } catch (error) {
            res.status(400).send({
            status : false,
            statusCode: 400,
            message: "Something went wrong",
            error : error.message
        });
    }
};

exports.userlasttrip = async(req, res, next) => {
    try {
        const lastTripData = await bookamb
            .find({
                UserId: req.params.userId,
            })
            .sort ({ updatedAt: -1 })
            .limit(1)
            .populate("UserId")
            .populate("DriverId");

            let SomeTripStatus = lastTripData.some((character) => {
                return `${character.tripStatus}` === "completed" 
            });
            
            console.log(SomeTripStatus,"SomeTripStatus")

            if(SomeTripStatus){
                return res.json({
                    status: true,
                    statusCode: 200,
                    message: "LAST TRIP",
                    data: lastTripData,
                });
            }
            else if( SomeTripStatus == "" || SomeTripStatus == 0 || SomeTripStatus == null){
                return res.json({
                    status: true,
                    statusCode: 409,
                    message: "Something Went Wrong || tripStatus = 409",
                    data: null,
                });
            }else {
                return res.json({
                    status : false,
                    statusCode : 404,
                    message : "tripStatus Is Not Matched",
                    data : null,
                });
            }
        
    } catch (error) {
        console.log(error.message);
        res.json({ 
            status:false ,
            statusCode:400,
            message:"Error Found!",
            data : null,
            error : error.message
         })
    }
};

exports.driverlasttrip = async(req, res, next) => {
    try {
        const lastTripData = await bookamb
            .find({
                DriverId: req.params.driverId,
            })
            .sort({ DriverId: -1 })
            .limit(1)
            .populate("UserId")
            .populate("DriverId");
        return res.json({
            status: true,
            statusCode: 200, 
            message: "last trip",
            data: lastTripData,
        });
    } catch (error) {
        return res.json({ 
                   status:false,
                   statusCode:400,
                   message:"Error Found!",
                   data : null,
                   error : error.message
                })
    }
};

exports.singleTrip = async(req, res, next) => {
    let { bookingId } = req.params;
    try {
        let criteria = {
            _id: bookingId,
        };
        let getSortedTrips = await bookamb
            .findOne(criteria)
            .populate("UserId")
            .populate("DriverId");
        return res.send({
            message: "OK",
            statusCode: 200,
            data: getSortedTrips,
        });
    } catch (error) {
        res.status(400).send({
            status : false,
            statusCode: 400,
            message: "Something went wrong",
            error : error.message
        });
    }
};

exports.bookingPayment = async(req, res, next) => {
    let { bookingId, transactionId } = req.body;
    try {
        let criteria = {
            _id: bookingId,
        };
        console.log(criteria,"criteria running")
        let updateTrips = await db.findAndUpdate(
            bookamb,
            criteria, {
                isPaymentDone: true,
                transactionId,
            }, { new: true, upsert: true }
        );
        console.log(updateTrips,'updateTrips riunnign')
        let data = '{ "paymentOnline":' + JSON.stringify(updateTrips) + "}";
        let topic = updateTrips.DriverId + "/payment";
        console.log(data,"data");
        console.log(topic,"topic");
        //let topic1 = updateTrips.DriverId + '/paymentStatus';
        client.publish(topic, data);
        return res.send({
            message: "OK",
            statusCode: 200,
            data: updateTrips,
        });
    } catch (error) {
        console.log(error.message)
        return res.status(400).send({
                status : false,
                statusCode: 400,
                message: "Something went wrong",
                error : error.message
        });
    }
};
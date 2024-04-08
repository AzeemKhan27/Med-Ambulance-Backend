"use strict";

const { ambulanceinfos } = require("../model");
const db = require("../services/dboperations")
//const expressAsyncHandler = require("express-async-handler");
//const jwt = require("jsonwebtoken");


exports.AdminAddAmb = async(req, res, next) => {
    try {
        let pathToSave = `/uploads/AM/${req.file.filename}`
        let objInfo = {
          image: pathToSave,
          Path: req.body.Link,
          DriverId: req.body.DriverId,
          AmbulanceCategory: req.body.AmbulanceCategory,
          AmbulanceType: req.body.AmbulanceType,
          AmbulanceModel: req.body.AmbulanceModel,
          RegistrationNumber: req.body.RegistrationNumber,
          FuelType: req.body.FuelType,
          ManufacturedDate: req.body.ManufacturedDate,
          RegistrationDate: req.body.RegistrationDate,
        };
        if (req.body.hospitalId) {
            objInfo.hospitalId = req.body.hospitalId;
        }

        let AdminDetails = await ambulanceinfos.create(objInfo);

        res.status(200).send({
            status: true,
            statusCode: 200,
            message: "Data Uploaded Successfully",
            data: {
                details: { AdminDetails },
            },
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: false,
            statusCode : 404,
            message : "Error Found",
            error : error.message
        })
    }
};

//____________________Fetch ALL DATA_______________________________//

exports.Admin_AmbgetALLData = async(req, res, next) => {

    const limit = parseInt(req.query.limit); // Make sure to parse the limit to number
    const skip = parseInt(req.query.skip);   // Make sure to parse the skip to number
    let searchObj = {};
    if(req.query.search) {
        searchObj = {
            $or:[
                {"AmbulanceCategory":{$regex:req.query.search,$options:'i'}},
                {AmbulanceType: req.query.search},
                {RegistrationNumber: req.query.search}
            ]
        }; 
    }
    let count = await ambulanceinfos.countDocuments(searchObj);
    let users = await ambulanceinfos.find(searchObj).skip(skip).limit(limit);
    res.json({success: true, message: 'ALL', data: users, total:count});
};
//     try {
//         debugger;
//         // let page = req.query.page;
//         // let limit = req.query;
//         const   {page = 1,limit = 10} = req.query;
//         //const {page = 1,limit = 10} = req.query;
//         var logss = console.log;
//         // logss("top level console GET_ALL 55",Admin_AmbgetALLData);
//         let ambulanceData = await ambulanceinfos.find()
//                                                 .limit(limit *1)
//                                                 .skip((page - 1) * limit);
//                                                 //.select('image imagePath');
//         debugger;
//         logss(ambulanceData, "Itermediate Level GET_ALL 59");

//         res.json({
//             status: true,
//             statusCode: 200,
//             message: "View data",
//             totalCount: ambulanceData.length,
//             data: ambulanceData,
//         });
//         logss("Middle ware GET ALL 66-70");
//     } catch (error) {
//         debugger;
//         res.json({ message: error });
//         console.log("else level");
//     }
// };

//_________START____________Admin GETBYLISTING____________________//

exports.Admin_GetByID = async(req, res, next) => {
    // try{
    //     let id = req.params.id;
    //     let updates = req.body;
    //     let options = { new: true };
    //     let loggs = console.log;

    //     const getBylist = await ambulanceinfos.findById(id,updates,options);
    //     loggs(getBylist,"debugging 80-100");
    //     res.json(getBylist);
    // } catch(error){
    //     res.json({ message: error });
    // }
//,{},{limit:10,skip:1}
    try {
        const getBylist = await ambulanceinfos
            .findById(req.params.id);
            // .limit()
            // .skip();
        res.json({
            statusCode: 200,
            status: true,
            message: "view data",
            data: getBylist
        });
    } catch (error) {
        res.json({ message: error });
    }
};

//_____________________Admin GETBYLISTING___________end_________//

//___Driver___Profile___Update____//

exports.Admin_UpdateAdminData = async(req, res, next) => {
    try {
        let getAmb = await ambulanceinfos.findOne({
          _id: req.params.id,
        });
        if (!getAmb) return res.json({
          status: true,
          statusCode: 404,
          message: "Ambulance not fount",
          data: updatedListing,
        });
        console.log(res.body);
        if (req.file) {
            var pathToSave = `/uploads/AM/${req.file.filename}`;
        }
        
        const listing = {
            AmbulanceCategory: req.body.AmbulanceCategory ||getAmb.AmbulanceCategory ,
            AmbulanceType: req.body.AmbulanceType||getAmb.AmbulanceType,
            AmbulanceModel: req.body.AmbulanceModel||getAmb.AmbulanceModel,
            RegistrationNumber: req.body.RegistrationNumber||getAmb.RegistrationNumber,
            FuelType: req.body.FuelType||getAmb.FuelType,
            ManufacturedDate: req.body.ManufacturedDate||getAmb.ManufacturedDate,
            RegistrationDate: req.body.RegistrationDate||getAmb.RegistrationDate,
            image:pathToSave || getAmb.image
        };
        const updatedListing = await ambulanceinfos.findByIdAndUpdate({ _id: req.params.id },
            listing ,{new:true}
        );
        console.log(updatedListing);
        res.json({ status: true, statusCode: 200, message: "update successfully", data: updatedListing });
    } catch (error) {
        res.json({ message: error, statusCode: 500 });
    }
};

//________Admin Delete ____________//

exports.Admin_DeleteAdminData = async(req, res, next) => {
    // try {
    //     var loggs = console.log;
    //     loggs("top level loggs part",Admin_DeleteAdminData);
    //     let id = req.params.id;
    //     let updates = req.body;
    //     let options = { new: true };

    //     //var doc = await ambulanceinfos.findOneAndUpdate({ _id: req.params.Id }, req.body, { new: true });
    //     var doc = await ambulanceinfos.findByIdAndDelete(id,updates,options);
    //     loggs(doc,"debugging Delete section");

    //     const returnObj = res.json({
    //         status: true,
    //         statusCode: 200,
    //         message: "delete successfully",
    //         data: {
    //             doc,returnObj
    //         }
    //     });
    // } catch (error) {
    //     res.json({ message: error });
    //     loggs(error,"debugging Delete section else part");
    // }
    try {
        let removeListing = await ambulanceinfos.findByIdAndDelete(req.params.id);
        // res.json(removeListing);
        const returnObj = res.json({
            status: true,
            statusCode: 200,
            message: "delete successfully",
            data: {
                removeListing
            }
            // doc
        });
    } catch (error) {
        res.json({ message: error });
    }
    //   console.log(removeListing,"188-200 removeListing");
};
// 'use strict';
// "--unhandled-rejections=strict";

// const mongoose = require("mongoose");
// const AdminSchema_2 = new mongoose.Schema({

//     hospitalId: {
//         type: mongoose.Schema.Types.ObjectId
//         // ref: 'hospitalRegister'
//     },
//     image: {
//         type: String
            
//     },
//     imagePath: {
//         type: String
          
//     },
//     AmbulanceCategory: {
//         type: String,
//         trim: true,
//         required: true
//     },
//     AmbulanceType: {
//         type: String,
//         trim: true,
//         required: true
//     },

//     AmbulanceModel: {
//         type: String,
//         trim: true,
//         required: true
//     },

//     RegistrationNumber: {
//         type: String,
//         trim: true,
//         required: true
//     },

//     FuelType: {
//         type: String,
//         trim: true,
//         required: true
//     },

//     ManufacturedDate: {
//         type: String,
//         trim: true,
//         required: true
//     },

//     RegistrationDate: {
//         type: String,
//         trim: true,
//         required: true
//     }
// }, {
//     timestamps: true,

// });

// module.exports = mongoose.model("AdminSchemas", AdminSchema_2);
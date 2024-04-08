'use strict';
"--unhandled-rejections=strict";

const mongoose = require("mongoose");
const userCancelMsg = new mongoose.Schema({

   
    cancelReason: []
//    TotalFare : {
//        type: String,
    
//    },
//    ExtraCharges : {
//        type: String,
//    },
//    desc:{ type: String},
//    descs:{ type: String},
}, {
    timestamps: true,

});
module.exports = mongoose.model("UserCanMsg", userCancelMsg);
'use strict';
"--unhandled-rejections=strict";

const mongoose = require("mongoose");
// const validator = require('validator');

const LiecenseSchema = new mongoose.Schema({

    DriverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DriverRegister'
    },

    licensenumber: {
        type: String,
        required: true
        // default : null
    },
    isVerifyLicense: { type: Boolean, default: false },

    images: [{
        type: String,
        //required:true
        // trim: true
    }],
    // image :[{ 
    //      type : String,
    //      required:true,
    //      trim:true
    //     }],

    imagePath: {
        type: String,
    },
    
    frontImage:String,
    backImage:String

}, {
    timestamps: true
});

module.exports = mongoose.model("license", LiecenseSchema);
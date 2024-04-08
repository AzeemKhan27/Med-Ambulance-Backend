'use strict';
"--unhandled-rejections=strict";

const mongoose = require("mongoose");
const ambulanceSchema = new mongoose.Schema({

    DriverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DriverRegister'
    },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hospitalRegister'
    },
    image: {
        type: String
            // trim : true,
            // required:true
    },
    imagePath: {
        type: String
            // trim : true,
            // required:true
    },
    Path : { type:String},
    //isVerifyAmbulance: { type: Boolean, default: false ,ref: 'ambulanceinfos' },
    //isVerifyAmbulance: { type: Boolean, default: false },

    AmbulanceCategory: {
        type: String,
        trim: true,
        required: true
    },
    AmbulanceType: {
        type: String,
        trim: true,
        required: true
    },

    AmbulanceModel: {
        type: String,
        trim: true,
        required: true
    },

    RegistrationNumber: {
        type: String,
        trim: true,
        required: true
    },

    FuelType: {
        type: String,
        trim: true,
        required: true
    },

    ManufacturedDate: {
        type: String,
        trim: true,
        required: true
    },

    RegistrationDate: {
        type: String,
        trim: true,
        required: true
    }
}, {
    timestamps: true,

});

module.exports = mongoose.model("ambulanceinfos", ambulanceSchema);
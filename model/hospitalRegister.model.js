'use strict';
"--unhandled-rejections=strict";

const mongoose = require("mongoose");
const hospitalRegsiterSchema = new mongoose.Schema({

    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hospitalUser'
    },

    hospitalName: {
        type: String,
        required: true,
        //default: ""
    },
    Address: {
        type: String,
        trim: true,
        required: true
    },
    pincode: {
        type: String,
        trim: true,
        required: true
    },
    city: {
        type: String,
        trim: true,
        required: true
    },
    phoneNo: {
        type: String,
        trim: true,
        required: true,
        minlength: 10,
        match: (/^\d{10}$/g)
    },
    emailaddress: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
        required: true,
        validate: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],

    },
    registrationNumber: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    
});

module.exports = mongoose.model("hospitalRegister", hospitalRegsiterSchema);
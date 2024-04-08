'use strict';
"--unhandled-rejections=strict";

const mongoose = require("mongoose");
const hospitalUserSchema = new mongoose.Schema({

    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hospitalRegister'
    },

    DriverId : {type: mongoose.Schema.Types.ObjectId, ref: 'DriverRegister'},
    UserId : {type: mongoose.Schema.Types.ObjectId, ref: 'UserRegister'},

    latitude : { type: String },
    longitude : { type: String },
    address : { type:String},
    userName: {
        type: String,
        required: true
    },
    //status: { type: String, default: "OFFLINE" },

    userPassword: {
        type: String,
        minlength: 6,
        // maxlength :20,
        match: (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/),
        trim: true,
        required: true
    },
    userPhone: {
        type: String,
        trim: true,
        required: true,
        minlength: 10,
        match: (/^\d{10}$/g)
    },
    userEmail: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
        required: true,
        validate: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],

    },
    userType: {
        type: String,
        default: "OPERATION"
    },
    role: {
        type: String,
        default: "HOSPITAL"
    },
    userAddress: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("hospitalUser", hospitalUserSchema);
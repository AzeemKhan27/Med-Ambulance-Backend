'use strict';
"--unhandled-rejections=strict";

const mongoose = require("mongoose");

const validator = require('validator');

//liecenseId,

const driverSchema = new mongoose.Schema(
  {
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "bookingtab" },
    liecenseId: { type: mongoose.Schema.Types.ObjectId, ref: "license"},
    ambulanceinfosId: {type: mongoose.Schema.Types.ObjectId, ref: "ambulanceinfos"},
    personalId : {type : mongoose.Schema.Types.ObjectId, ref: "Personal_Id"},

    // UserId : { type: mongoose.Schema.Types.ObjectId, ref : "UserRegister"},
    // DriverId : { type: mongoose.Schema.Types.ObjectId, ref : "DriverRegister"},

    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hospitalRegister",
    },

    status: { type: String, default: "OFFLINE" },

    isVerify: { type: Boolean, default: false },

    isVerifyForget : {type: Boolean, default: false},

    // isVerifyAmbulance: { type: Boolean, default: false ,ref: 'ambulanceinfos'},

    // isVerifyPersonalId: { type: Boolean, default: false ,ref: 'Personal_Id' },
 
      isVerifyLicense: { type: Boolean, default: false  },
      isVerifyPersonalDetails: { type: Boolean, default: false  },
      isVerifyAmbulance: { type: Boolean , default: false },
    // isVerifyLicense: { type: Boolean, default: false},

    availabilty: { type: String, default: "AVAILABLE" },

    latitude: { type: String },
    longitude: { type: String },
    location: { type: [Number], index: true /* index: '2dsphere' */ },

    
    // forgetPassword : { type: Boolean, default: false },

    phone: {
      type: String,
      trim: true,
      required: true,
      minlength: 10,
      match: /^\d{10}$/g,
    },
    
    driverImage: { type: String },
    licenseImage: { type: String },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
      required: true,
      validate: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    },
    m_otp: {
      type: String,
      trim: true,
      // required: true
    },
    image : {
      type : String, 
      trim: true
    },

    drivername: {
      type: String,
      trim: true,
      //required : true
    },
    DriverProfileImage : { type : String},

    deviceType: {
      type: String,
      trim: true,
      // required: true,
    },
    driverLat: { type : String, trim : true},
    driverLong: { type : String, trim : true},

    // sorclatitude: {type: String},
    // sorclongitude : { type: String},

    password: {
      type: String,
      minlength: 6,
      // maxlength :20,
      match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/,
      trim: true,
      required: true,
    },
  },
  { timestamps: true },
  {
    toObject: { getters: true },
    toJSON: { getters: true },
    autoCreate: true,
  }
);
//console.log(driverSchema,"86-90")
driverSchema.index({ location: '2dsphere' });

module.exports = mongoose.model("DriverRegister", driverSchema);

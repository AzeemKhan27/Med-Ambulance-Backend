"use strict";
"--unhandled-rejections=strict";

const mongoose = require("mongoose");
const GeoSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "Point",
  },
  feedback: { type: String },
  sourcord: {
    //type : [Number],
    lat: { type: String },
    lng: { type: String },
    address: { type: String },
    //index: true
  },
  descord: {
    //type : [Number],
    lat: { type: String },
    lng: { type: String },
    address: { type: String },
    //index: true
  },
});

const bookingtSchema = new mongoose.Schema(
  {
    // rideId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     //ref: 'UserRegister'
    // },

    DriverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DriverRegister",
    },

    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserRegister",
    },
    vehicle : { type: String},
    feedback: { type: String },
    ambtype: { type: String },
    ambSubType: { type: String },
    name: { type: String },
    latitude: { type: String },
    longitude: { type: String },
    location: { type: { type: String }, coordinates: [] },
    location: GeoSchema,

    sorclongitude: { type: String },
    sorclatitude: { type: String },
    deslongitude: { type: String },
    deslatitude: { type: String },
    sorcaddress: { type: String },
    desaddress: { type: String },
    tripFrom: { type: String },
    tripTo: { type: String },
    totalprice: { type: Number, default: 0 },
    //availabilty: { type: String },
    availabilty: { type: String, default: "ENGAGE" },
    tripStatus: {
      type: String,
      enum: ["request", "cancelled", "accepted", "active", "completed"],
      default: "request",
    },
    // phone: { type: String },
    // drivername: { type: String },
    // tripStat
    starttrip: { type: String, default: "null" },
    endtrip: { type: String, default: "null" },
    canceltrip: { type: String, default: "null" },
    requestTime: { type: Date },
    cancelTime: { type: Date },
    acceptTime: { type: Date },
    endTime: { type: Date },
    cancelledBy: { type: String },
    cancelReason: { type: String },
    isPaymentDone: { type: Boolean, default: false },
    transactionId: { type: String },
    m_otp: {
      type: String,
      trim: true,
      // required: true
    },
  },
  {
    timestamps: true,
  }
);
//createIndexes({geometry: "2dsphere"})

module.exports = mongoose.model("bookingtab", bookingtSchema);

"use strict";
"--unhandled-rejections=strict";

const mongoose = require("mongoose");

const Notification = new mongoose.Schema(
  {
   

    driverId: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "DriverRegister",
    }],

    userId: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserRegister",
    }],

    title: { type: String },
    mesaage: { type: String },
    body: { type: String },
},  {
    timestamps: true,
  }
);
//createIndexes({geometry: "2dsphere"})

module.exports = mongoose.model("Notification", Notification);

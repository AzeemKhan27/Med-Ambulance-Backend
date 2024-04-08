'use strict';
"--unhandled-rejections=strict";

const mongoose = require("mongoose");

const persId = new mongoose.Schema(
  {
    DriverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DriverRegister",
      required :true,
      trim: true
    },

    driverId :{ type: String},

    idType: {
      type: String
    },
    personal_Id: {
      type: String
    },
    images: [{
      type: String,
      trim: true,
      required : true
    }],
    imagePath: {
      type: String
    },
    frontImage: String,
    backImage: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Personal_Id", persId);

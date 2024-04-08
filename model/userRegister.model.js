"use strict";
"--unhandled-rejections=strict";

const mongoose = require("mongoose");
const userRegSchema = new mongoose.Schema(
  {
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "bookingtab" },

    //UserId: { type: mongoose.Schema.Types.ObjectId, },
    status: { type: String, default: false },
    email: { type: String},
    name: { type: String},
    phone: {
        type: String,
        trim: true,
        required: true,
        maxlength: 10,
        match: /^\d{10}$/g,
    },
    email: {
      type: String,
    },
    image : {
      type : String
    },
    //UserProfileImage : { type: String},
    // Path : { type:String },

    username : { type: String},
    m_otp: {
      type: String,
      //required: true
    },

    name: {
      type: String,
    },
    deviceToken: {
      type: String,
    },
    deviceType: {
      type: String,
    },

    password: {
      type: String,
    },
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserRegister", userRegSchema);

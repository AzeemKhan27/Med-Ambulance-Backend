'use strict';
"--unhandled-rejections=strict";

const mongoose = require("mongoose");
// const Joi = require('@hapi/joi');
//const { string } = require("@hapi/joi");
const validator = require('validator');

const adminSchema = new mongoose.Schema({

  // DriverId: { type: mongoose.Schema.Types.ObjectId, },

  email: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true,
    required: true,
    validate: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },

  password: {
    type: String,
    minlength: 6,
    // maxlength :20,
    match: (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/),
    trim: true,
    required: true
  },

  role: {
    type: String, default: "ADMIN",
    //trim: true,
    // required: true
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model("adminl", adminSchema);


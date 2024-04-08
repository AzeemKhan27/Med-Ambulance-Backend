'use strict';
"--unhandled-rejections=strict";

const mongoose = require("mongoose");
const ambtypeSchema = new mongoose.Schema({

  //DriverId: { type: mongoose.Schema.Types.ObjectId },
  ambtype: { type: String },
  name: { type: String },
  price: { type: Number, default: 0 },
  services: [{ type: String }],
  sorclongitude: { type: String },
  sorclatitude: { type: String },
  deslongitude: { type: String },
  deslatitude: { type: String },
  sorcaddress: { type: String },
  desaddress: { type: String },
  fareperkm: {
    type: Number,
    trim: true,
    required: true
  },

  waitingfare: {
    type: Number,
    trim: true,
    required: true
  },

  minimumfare: {
    type: Number,
    trim: true,
    required: true
  },
}, {
  timestamps: true,
});

ambtypeSchema.index({ location : '2dsphere' });
module.exports = mongoose.model("ambulancetype", ambtypeSchema);
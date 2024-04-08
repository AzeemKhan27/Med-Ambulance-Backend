'use strict';
"--unhandled-rejections=strict";

const mongoose = require("mongoose");
const userCardSchema = new mongoose.Schema({

    // hospitalId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'hospitalRegister'
    // },

    // _id: {
    //     type: mongoose.Schema.Types.ObjectId
    // },
    
   selectCategory: {
        type: String,
        required: true,
        trim: true
   },
   TotalFare : {
       type: String,
   },
   ExtraCharges : {
       type: String,
   },
   AboutUs : {
       type: String
    },
   desc:{ type: String},
   descs:{ type: String}
}, {
    timestamps: true,
});
module.exports = mongoose.model("userCard", userCardSchema);
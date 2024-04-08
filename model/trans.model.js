'use strict';
"--unhandled-rejections=strict";

const mongoose = require("mongoose");
const userTransSchema = new mongoose.Schema({

    // _id: {
    //     type: mongoose.Schema.Types.ObjectId
    //     ref :'hospitalRegister'
    // },
    UserId : {type: mongoose.Schema.Types.ObjectId},
    DriverId : {type: mongoose.Schema.Types.ObjectId},
    bookingId:{type: mongoose.Schema.Types.ObjectId},
   // transactionId:{type: mongoose.Schema.Types.ObjectId,ref:"bookingtab"},
   //bookingId : {type: String,required: true,trim: true},
   AmmountAdd : {type:String,required:true,trim:true},
   AmmountUpdate : {type:String},
   AmmountStatus : {type:String},
   TotalPaidAmmount : {type:String,required:true,trim:true}
}, {
    timestamps: true,
});
module.exports = mongoose.model("userTrans", userTransSchema);


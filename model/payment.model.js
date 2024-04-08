'use strict';
"--unhandled-rejections=strict";

const mongoose = require("mongoose");
const PaymentSchema = new mongoose.Schema({

    // _id: {
    //     type: mongoose.Schema.Types.ObjectId
    //     ref :'hospitalRegister'
    // },
    // _id:{ type: mongoose.Schema.Types.ObjectId,ref:'payment'},
    
    UserId : {type: mongoose.Schema.Types.ObjectId, ref:"UserId"},
    DriverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DriverRegister",
      },
    bookingId:{type: mongoose.Schema.Types.ObjectId, ref: "bookingtab"},
    transactionId : {type: mongoose.Schema.Types.ObjectId,ref:"bookingtab"},

   paymentType : {type:String,required:true,trim:true},
   Amount : {type:String,required:true,trim:true},
   status : {type:String, default:'PENDING'},
   StatusPayment : {type:Boolean}
}, {
    timestamps: true,
});

module.exports = mongoose.model("payment", PaymentSchema);


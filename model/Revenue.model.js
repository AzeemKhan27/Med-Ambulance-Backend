'use strict';
"--unhandled-rejections=strict";

const mongoose = require("mongoose");
const revenue = new mongoose.Schema(
    {
        cash : { 
            type:Number,
            required:true,
            trim:true
        },
        credit : { 
            type:Number,
            required:true,
            trim:true
        },
        commision : { 
            type:Number,
            required:true,
            trim:true
        },
        // today: {
        //      type:Date
        //     },
        // week: { 
        //     type:Date
        // },
        // month: {
        //      type:Date
        //     },
        
        // userId: {
        //     type: String,
        //     required: 'Kindly enter your Report'
        // },data: {
        //     type: String,
        //     required: 'Kindly enter your Report'
        // },
        // created:{
        //     type:Date,
        //     default:Date.now
        // }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Revenue", revenue);


// const mongoose = require("mongoose");
// const revenue = new mongoose.Schema(
//     {
//         cash : { type:String,required:true,trim:true},
//         credit : { type:String,required:true,trim:true},
//         commision : { type:String,required:true,trim:true},
//         today: { type:String},
//         week: { type:String},
//         month: { type:String},
//     },
//     {
//         timestamps: true,
//     }
// );

// module.exports = mongoose.model("Revenue", revenue);

'use strict';
"--unhandled-rejections=strict";

const mongoose = require("mongoose");

// const GeoSchema = new Schema({
//    type:{ type:String,default:"Point"},
//    coordinates : { type:[Number],index:"2dsphere"}
// });
// const GeoSchema = new mongoose.Schema({
//     type: {
//       type: String,
//       default: "Point",
//     },
//     feedback: { type: String },
  
//     sourcord: {
//       //type : [Number],
//       lat: { type: String },
//       lng: { type: String },
//       address: { type: String },
//       //index: true
//     },
//     descord: {
//       //type : [Number],
//       lat: { type: String },
//       lng: { type: String },
//       address: { type: String },
//       //index: true
//     },
//   });
  
const hospitalDetailSchema = new mongoose.Schema({

    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hospitalUser'
    },

    hospitalName: {
        type: String,
        required: true,
        //default: ""
    },
    address: {
        type: String,
        trim: true,
        required: true
    },
    location: {type: Object},
    latitude: { type: String,required:true,trim:true },

    longitude:{ type: String,required:true,trim:true},
    
    //location: { type: [Number], index: true },
   
    //location: { type: { type: String }, coordinates: [] },
    // title: {type: String, required: true},
    // location: { type: { type: String }, coordinates: [] },//
    // location: GeoSchema,//
    //location:GeoSchema,
}, {
    timestamps: true,
    
});
hospitalDetailSchema.index({ location: '2dsphere' });
module.exports = mongoose.model("hospital_details", hospitalDetailSchema);
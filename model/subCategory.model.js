'use strict';
"--unhandled-rejections=strict";

const mongoose = require("mongoose");
const subCategorySchema = new mongoose.Schema({
   fareCharges : {
   type : String,
   trim : true,
   required:true
},
extraFareCharges:{
    type : String,
    trim : true,
    required:true
},
categoryId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'category'
 },
}, {timestamps : true});

module.exports = mongoose.model("subCategory", subCategorySchema);
'use strict';
"--unhandled-rejections=strict";

const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
   name : {
   type : String,
   trim : true,
   required:true
},
}, {timestamps : true});

module.exports = mongoose.model("category", categorySchema);
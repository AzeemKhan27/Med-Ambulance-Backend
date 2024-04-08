'use strict';
'--unhandled-rejections=strict';

const mongoose = require("mongoose");
const appAboutSchema = new mongoose.Schema({
   data : {type : String},
   aboutUs : {
                type : String,
                required:true,
                trim:true
            }
}, {
    timestamps: true,
});

module.exports = mongoose.model("appAboutSchema",appAboutSchema );
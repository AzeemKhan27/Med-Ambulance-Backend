'use strict';
"--unhandled-rejections=strict";

const mongoose = require("mongoose");
const cardSchema = new mongoose.Schema({
     cardNumber: { 
        type:String, 
        allowNull: true,
        defaultValue: null
    },
    cardType: { 
        type: String, 
        allowNull: true,
        defaultValue: null
    },
    name: {
        type: String,
        allowNull: true,
        defaultValue: null
    },
    expMonth: {
        type: String,
        allowNull: true,
        defaultValue: null
    },
    expYear: {
        type: String,
        allowNull: true,
        defaultValue: null
    },
    feedback:{type: String}
}, 
{
    timestamps : true
});

module.exports = mongoose.model("Card", cardSchema);
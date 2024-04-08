"use strict";

const { json } = require('body-parser');
let mqtt = require('mqtt');
require('dotenv').config()

let options = {
    host: process.env.MQTT_HOST,
    port: process.env.MQTT_PORT,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD
}

let jsonObj = {key:'value'};
//initialize the MQTT client
let client = mqtt.connect(options);

//setup the callbacks
client.on('connect', function () {
    console.log('Connected');
});

client.on('error', function (error) {
    console.log(error);
});

client.on('message', function (topic, message) {
    //Called each time a message is received
    console.log('Received message:', topic, message.toString());
});
try {
    client.subscribe('Swift');
    client.subscribe("123456/booking");
    //client.subscribe('609a0709ae0a84941b1f0a95/booking');
    client.publish('Swift', 'Hiii This is Azeem Pathan');
    //client.publish('609a0709ae0a84941b1f0a95/booking', (jsonObj));
} catch (error) {
    console.log(error, "error found");
}

module.exports = { client };
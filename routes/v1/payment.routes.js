'use strict';
"--unhandled-rejections=strict";
const router = require("express").Router();

const {AddPayment,PaymentViewById,PaymentStatus,ConfirmPaymentByDriverSide} = require("../../controllers/booking.controller");

router.post("/add",  AddPayment);

router.post("/paymentConfirm",ConfirmPaymentByDriverSide)

//router.get("/single/listing/:DriverId", PaymentViewById);
router.get("/single/listing", PaymentViewById);

//router.patch("/statusUpdate/:DriverId",  PaymentStatus);
router.patch("/statusUpdate/:DriverId",  PaymentStatus);

module.exports = router;
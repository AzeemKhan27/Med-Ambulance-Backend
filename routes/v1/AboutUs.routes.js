'use strict';
"--unhandled-rejections=strict";
const router = require("express").Router();

const { AboutUs, getAboutUsData } = require("../../controllers/AboutUs.controller");

//____________About Us ____________start____________//

router.post('/AboutUs',AboutUs);
router.get('/AboutUs',getAboutUsData);

//____________About Us ____________end______________//

module.exports = router;
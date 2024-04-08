'use strict';
"--unhandled-rejections=strict";

const router = require("express").Router();
const {registerHospitalUser,
    loginHospitalUser,
    getAllHospital,
    Add_Hospital_Data,
    GET_Hosp_Data
}=require('../../controllers/hospitalUser.controller')



router.post("/register/hospital",registerHospitalUser);
router.post("/userlogin",loginHospitalUser);

//__________hospital get all________________//
router.get("/getAllHosp",getAllHospital);
//____________________________________________//

//______________getHospitalNear______start_____________//
router.post("/addHospitalNear",Add_Hospital_Data);
router.get("/ViewHospitalNear",GET_Hosp_Data);
//______________getHospitalNear______end_______________//


module.exports = router;
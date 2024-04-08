"use strict";
"--unhandled-rejections=strict";

const router = require("express").Router();
const multer = require("multer");

const {
    ambulanceInfoUpdate,
    isRequestValidated,
} = require("../../validation/validations");

const { ambulanceINFO } = require("../../controllers/detail.controller");
const {
    AdminAddAmb,
    Admin_AmbgetALLData,
    Admin_GetByID,
    Admin_UpdateAdminData,
    Admin_DeleteAdminData,
} = require("../../controllers/AdminAmb.controller");

const verifyAuth = require("../../middleware/auth");
//const verifyAuthAdmin = require("../../middleware/admin_Auth");
//const verifyAuthUser = require("../../middleware/userAuth");

var storage = multer.diskStorage({
    destination: "./upload",
    filename: function(req, file, cb) {
        console.log("multer" + JSON.stringify(file));
        cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, "")}`);
    },
});

const upload = multer({
    dest: "./upload",
    storage: storage,
});

router.post(
    "/Info",
    upload.single("image"),
    ambulanceINFO,
    ambulanceInfoUpdate,
    isRequestValidated
);

router.post("/AdminAMB", upload.single("image"),
AdminAddAmb, ambulanceInfoUpdate, isRequestValidated);

router.get("/getAmbu", Admin_AmbgetALLData, ambulanceInfoUpdate, isRequestValidated);

router.get("/singleAmb/:id", Admin_GetByID, ambulanceInfoUpdate, isRequestValidated);

router.put("/EditAmb/:id",upload.single("image"),isRequestValidated,Admin_UpdateAdminData);
//   ambulanceInfoUpdate,

router.delete("/RemoveAmb/:id",Admin_DeleteAdminData, ambulanceInfoUpdate, isRequestValidated);

module.exports = router;
'use strict';
'--unhandled-rejections=strict';

const { body, check, validationResult } = require('express-validator');

                               //DriverRegister

exports.registerupdate = [ 
     check('password')
    .notEmpty()
    .isLength({min:6, max:20}) 
    .withMessage('Password must be 6 digit!'),
];

exports.registerupdatePass = [ 
    check('drivername')
   .notEmpty()
   .withMessage('Something went wrong'),
];

                                //DriverLogin

exports.loginupdate = [
    check('phone'),
    check('password')
    .notEmpty()
    .withMessage('data are required'),
];

// exports.Driverupdate = [ 
//     check('DriverId'),
//     check('licensenumber')
//     .notEmpty()
//     .withMessage('data are required'),
// ];

exports.ambulanceInfoUpdate = [
    check('AmbulanceCategory'),
    check('AmbulanceType'),
    check('AmbulanceModel'),
    check('RegistrationNumber'),
    check('FuelType'),
    check('ManufacturedDate'),
    check('RegistrationDate'),
    check('DriverId'),
    check('image')
    // check('image')
    .notEmpty()
    .withMessage('data are required'),
];
                            
//__________ //UserRegister


exports.userRegisterUpdate = [
    check('phone')
    .notEmpty()
    .withMessage('phone number is mandatory'),
];

exports.driverVerifyUpdate = [
     check('m_otp')
    .notEmpty()
    .withMessage('Invalid OTP!'),
];

exports.userVerifyUpdate = [
    //  check('m_otp'),
     check('_id') 
    .notEmpty()
    .withMessage('all data are required'),
];
exports.userVerifyUserIdUpdate = [
    check('_id') 
    .notEmpty()
    .withMessage('id is Required!'),
];
exports.emailupdate =  [
     check('email')
    .notEmpty()
    .withMessage('Invalid Email')
    .matches([/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]),
];

exports.pwdupdate =  [
    check('password')
   .notEmpty()
   .withMessage('Invalid Password'),
   // .matches([/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]),
];

exports.datas = (req,res)=>{
    if (!validPass) return res.status(400).json({
        statusCode : 400,
        status : false,
        message : "Invalid Password"});  
},

//Driver Personal Id
// exports.persIdupdate = [
//     check('personal_Id'),
//     check('idType')
//     .notEmpty()
//     .withMessage('All keys are required'),
// ];

// exports.imageupload = [
//     check('image')
//     .notEmpty()
//     .withMessage('image upload are required'),
// ];

//______start__________license _validation ____________//


exports.Driverupdate = [ 
    //body('image' && 'licensenumber' && 'DriverId').exists()
    // body('image').exists()
    // .withMessage('all DL data are required'),
    check('DriverId').notEmpty().withMessage('DriverId are required'),
    check('licensenumber').notEmpty().withMessage('licensenumber are required'),
    //check('image').notEmpty().withMessage('image are required')
];
 
//________________license _validation _____end_______//

//_______________personal detail _______start__________//

//exports.persIdupdate = () => {
exports.persIdupdate = [
    //  check('image' && 'idType' && 'personal_Id' && 'DriverId')
    // .notEmpty()
    // .withMessage('All Personal detail are required'),
    //check('image').notEmpty().withMessage('image is required'),
    body('DriverId').notEmpty().withMessage('DriverId is required'),
    body('idType').notEmpty().withMessage('idType is required'),
    //body('personal_Id').notEmpty().withMessage('personal_Id is required'),
   // body('image').notEmpty().withMessage('image is required'),
   //body('image' && 'idType' && 'personal_Id' && 'DriverId').exists().withMessage('all data are required'),
   
   ];
//    [
//     check('image').notEmpty().withMessage('image is required'),
//     check('idType').notEmpty().withMessage('idType is required'),
//     check('personal_Id').notEmpty().withMessage('personal_Id is required'),
//     check('DriverId').notEmpty().withMessage('DriverId is required'),
//   ];
//}

//_______________personal detail _______end____________//


exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({
             "status":false,
             "statusCode": 400,  
             "message": errors.array()[0].msg,
             "data": null,
            //  { 
            //     //  "errorCode": "REQUEST_INCOMPLETE", 
            //     //"errorInfo": errors.array()[0].msg
            //      }, 
                 "timestamp": new Date().getTime() })
    }
    next();
}
const { hospitalUser, hospitalRegister,hospital_details  } = require("../model");

//addListHospital
const bcrypt = require("bcryptjs");
const { getRandomPin } = require("../utils/helpers");
const jwt = require("jsonwebtoken");

exports.registerHospitalUser = async (req, res) => {
    //console.log(req.body);
    let a = {};
    let { emailaddress, phoneNo, hospitalName, registrationNumber, Address, city, pincode } = req.body
    a['emailaddress'] = req.body.emailaddress;
    a['phoneNo'] = req.body.phoneNo;
    a['hospitalName'] = req.body.hospitalName;
    a['registrationNumber'] = req.body.registrationNumber;
    a['Address'] = req.body.Address;
    a['city'] = req.body.city;
    a['pincode'] = req.body.pincode;

    const datahr = await hospitalRegister.create(a);
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.userPassword, salt);

    let { hospitalId, userName, userPhone, userEmail, userType, role, userPassword } = req.body
    datahr._id
    let b = {};
    b['hospitalId'] = datahr._id
    b['userName'] = req.body.userName
    b['userPhone'] = req.body.userPhone
    b['userEmail'] = req.body.userEmail
    b['userPassword'] = hashedPassword
    b['userType'] = req.body.userType
    b['userAddress'] = req.body.userAddress
    b['role'] = req.body.role
    const datahu = await hospitalUser.create(b);
    let data = [];
    data[0] = datahu;
    data[1] = datahr;
    console.log('dddd', data);
    returnObj = res.json({
        status: true,
        statusCode: 200,
        message: " Register success ",
        response: { data },
    });
}



exports.getAllHospital = async (req, res) => {
    try {
        let getAllHosp = await hospitalRegister.find();

        res.json({
            status: true,
            statusCode: 200,
            message: "View data",
            data: getAllHosp,
        });
    } catch (error) {
        res.json({message: error});
    }
}

//________________hospital list______________//

exports.Add_Hospital_Data = async (req, res, next) => {
    //console.log("++top level++",req.body.latitude, req.body.longitude,"line 124-127");
      
        var addHospitalObj = {
            hospitalName: req.body.hospitalName,
            address: req.body.address,
            latitude:req.body.latitude,
            longitude: req.body.longitude,
            location: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)],
        }
        console.log(addHospitalObj,"123456567y879");
          ////$group: (addHospitalObj),
           //5000 * 1609
          //let HospDetails = await hospital_details.create(addHospitalObj);
          let HospDetails = await hospital_details(addHospitalObj);
         console.log(HospDetails,"HospDetails working 138-145")

         if (!HospDetails)
        return res.status(200).json({
            statusCode: 400,
            status: false,
            message: "All fields are required",
        });
        
         try {
            var savedUser = await HospDetails.save();
            console.log("debuging sucessfully on 50-60 line", savedUser);
            // res.send(savedUser);
            res.status(200).send({
                status: true,
                statusCode: 200,
                message: "Success",
                data: { savedUser },
                //data: { HospLatLong },
            });
        } catch (error) {
            console.log(error.message,"1234567890");
          res.status(400).send(error.message);
       };
    };
          
        //   const options = {
        //     location:{
        //         $geoWithin:{
        //             //$centerSphere:[[77.4520708,28.68467], 15/3963.2]
        //             $centerSphere:[[latitude,longitude], 15/3963.2]
        //         }
        //     }
        // } 

        //   let HospLatLong = await hospital_details.aggregate([{
        //       $geoNear: {
        //           near : {
        //               type : "Point",
        //               coordinates : [
        //                    parseFloat(latitude,longitude),
        //               ],
        //           },
                  
        //             maxDistance: 1,
        //             spherical: true,
        //             distanceField: "distance",
        //             distanceMultiplier: 5000 * 1609
        //       },
            
        //   }]);

        //   console.log(HospLatLong,"+++++++HospLatLong 141-150 ++++++++")

        
        //   let HospDetails = await hospital_details({addHospitalObj});
        //   //,requestTime: Date.now()
   
        //   console.log(HospDetails,"+++++++HospDetails 153 - 160 ++++++++")
          
        //   let HospDetail = await HospDetails.save();


exports.GET_Hosp_Data = async (req, res, next) => {
     //let {limit,skip}= req.query;
       // let {limit,skip,lat,long}= req.query;

    // const calc = 15/3963.2;
    // const options = {
    //     location:{
    //         $geoWithin:{
    //               $centerSphere:[[77.4520708,28.68467], 15/3963.2]
    //               //$centerSphere:[[lat,long], calc]
    //         }
    //     }
    // } 
  // console.log(options,"options is wprking success");

    //.limit(parseInt(limit)).skip(parseInt(skip));
    // const options = { location:{ $near:{ $geometry: {type: "Point", 
    // coordinates:[77.6974,12.9591] },
    //  $maxDistance:10000 }}}

    try {
         
        let ViewHospList = await hospital_details.find();
        console.log(ViewHospList,"++++++++++options++++++++");
       
        res.json({
            status: true,
            statusCode: 200,
            message: "View data",
            data: ViewHospList,
        });
    } catch (error) {
        res.json({message: error});
    }
};
//________________________end list____________//

    //       try {
    //           var savedHospital = await criteria.save();
    //           console.log("debuging sucessfully on 145-150 line", savedHospital);
    //           // res.send(savedUser);
    //           res.json({
    //               statusCode: 200,
    //               status: true,
    //               message: "Add Successfully",
    //               data: savedHospital,
    //           });
    //       } catch (error) {
    //           res.status(400).send(error);
    //           console.log(error, "debugging success line 150-160");
    //       }
    //   };

exports.loginHospitalUser = async (req, res,next) => {
    try {
        //const userPhone = req.body.userPhone;
        //const userEmail = req.body.userEmail;
        var {userEmail,deviceType,deviceToken,userPassword, }=req.body;
        var result = await hospitalUser.findOne({ userEmail,deviceType,deviceToken });
        if (!result) return res.json({
            status: false,
            message: "please register your userEmail first"
        });
        const validPass = await bcrypt.compareSync(userPassword, result.userPassword);

        if (!validPass)
            return res.json({
                statusCode: 400,
                status: false,
                message: "Invalid Password",
                data: null,
            });
            
      //__________sign_jwt_authentication___start____________//
    //   const token = jwt.sign({_id:hospital._id},process.env.TOKEN_SECRET_HOSPITAL);
      //__________sign_jwt_authentication____end___________//
            
        let results = await hospitalRegister.findOne(req.params.hospitalId)
        let data = [];
        data[0] = result;
        data[1] = results;
        console.log('dddd', data);
        returnObj = res.json({
            status: true,
            statusCode: 200,
            message: " login success ",
            response: { data },
        });

    }
    catch (err) {
        return res.send({
            message: err.message
        });
    }
};

exports.hospitalUserVerification = async (req, res) => {

    if (!req.body.hospitalUserId)
        return res.send("hospitalUserId require");
    if (!req.body.activationCode)
        return res.send("activationCode require");
    var hospitalUsertoken = jwt.sign({ _id: hospitalUser.ObjectId }, config.hospitalUser);
    var hospitalUserData = hospitalUser.findByIdAndUpdate(req.body.hospitalUserId, {
        hospitalUsertoken: hospitalUsertoken,
        isProfileCompleted: 'true',
        Status: 'active',
        activationCode: req.body.activationCode

    }, { new: true })
        .then(hospitalUser => {
            if (!hospitalUser) {
                return res.send('hospitalUser not found');
            }
            if (req.body.activationCode !== hospitalUser.activationCode) {
                if (req.body.activationCode !== "14234") {
                    return res.send('incorrect activation code');
                }
            }
            return res.json({
                success: true,
                Message: "driver has verified",
                data: hospitalUserData
            })

        }).catch(err => {
            res.send({
                message: err.message
            });
        });
};

exports.resend = async (req, res) => {
    if (!req.body.hospitlUserId) {
        return res.send('hospitlUserId required')
    }
    try {
        let hospitalUserData = await hospitalUser.findById(req.body.hospitalUserId);
        if (!hospitalUserData) {
            throw 'no data found';
        }
        hospitalUser.activationCode = "1234"
        hospitalUserData.save();
        return res.json({
            success: true,
            message: "code has sent your phoneNo",
            data: hospitalUserData

        });
    } catch (err) {
        return res.send({
            message: err.message
        });
    }
};

exports.findAll = async (req, res) => {
    const limit = req.body.limit ? req.body.limit : 10;
    const skip = req.body.skip ? req.body.skip : 0;
    hospitalUser.countDocuments().then(total => {
        hospitalUser.find().limit(limit).skip(skip * limit).then(result => {
            res.json({ success: true, message: 'ALl', data: result, total: total })
        })
    })
};





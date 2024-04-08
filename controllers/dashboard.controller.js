'use strict';
"--unhandled-rejections=strict";

const bcrypt = require("bcryptjs");
const { Timestamp } = require("bson");
const {
    ambulanceinfos,
    DriverRegister,
    adminl,
    bookamb,
    UserRegister,
    ambutype
} = require("../model");
const RevenueModel = require("../model/Revenue.model");
//const jwt = require("jsonwebtoken");

//____________________________Dashboard___________________________//

//___adminl____model_start_____//

exports.loginadmin = async(req, res, next) => {
    var {email,deviceType,deviceToken} = req.body;
    const admin = await adminl.findOne({
            $or: [{
                email,deviceType,deviceToken
            }]
        })
        .exec();
    if (!admin)
        return res.status(200).json({
            statusCode: 400,
            status: false,
            message: "email is invalid",
        });
    const validPass = await bcrypt.compareSync(req.body.password, admin.password);

    if (!validPass)
        return res.json({
            statusCode: 400,
            status: false,
            message: "Invalid Password",
            data: null
        });
//__________sign_jwt_authentication___start____________//
//const token = jwt.sign({_id:admin._id},process.env.TOKEN_SECRET_ADMIN);
//__________sign_jwt_authentication____end___________//
    res.json({
        statusCode: 200,
        status: true,
        message: ' Login success',
        response: {
            id: admin._id,
            role: admin.role,
            email: req.body.email,
           // token: token
        },
    });
}

//______________________AllData____________________________________//

//___DriverRegister____model_start_____//

exports.getalldata = async(req, res, next) => {
    try {
        const driverRegister = await DriverRegister.find(req.query.DriverId);
        res.json(driverRegister);
    } catch (error) {
        res.json({ message: error });
    }
}

//__________________________View data__________________________________//

exports.viewdata = async(req, res, next) => {

    try {
        const admindata = await DriverRegister.findById(req.query.id);
        res.json({
            status: true,
            statusCode: 200,
            message: 'View data',
            data: {
                admindata
            },
        });

    } catch (error) {
        res.json({ message: error });
    }
}

//___DriverRegister____model_end_____//

//_________________________________________Ambulance Api __________________________//

//___ambulanceinfos____model_start_____//

exports.getallambulance = async(req, res, next) => {

    try {
        const results2 = await ambulanceinfos.find(req.query.DriverId);
        console.log("results2");
        res.json(results2);
    } catch (error) {
        res.json({ message: error });
    }
}

//____________________________________//

//_____________________________Fare Management ____________________//

//___ambutype____model_start_//____/

exports.ambtype = async(req, res, next) => {

    try {
        const addtype = await ambutype({
            ambtype: req.body.ambtype,
            name: req.body.name,
            price: req.body.price,
            services: req.body.services,
            fareperkm: req.body.fareperkm,
            minimumfare: req.body.minimumfare,
            waitingfare: req.body.waitingfare,
            // sorclongitude: req.body.sorclongitude,
            // sorclatitude: req.body.sorclatitude,
            // deslongitude: req.body.deslongitude,
            // deslatitude: req.body.deslatitude,
        })
        var savedaddtype = await addtype.save();
        res.json({
            statusCode: 200,
            status: true,
            message: 'Registered Successfully',
            data:[ 
            {
                id: savedaddtype._id,
                ambtype: req.body.ambtype,
                name: req.body.name,
                price: req.body.price,
                services: req.body.services,
                fareperkm: req.body.fareperkm,
                minimumfare: req.body.minimumfare,
                waitingfare: req.body.waitingfare,
                status: req.body.status
            }
        ],
        });
    } catch (error) {
        console.log(error);
    }
}

exports.Ambsearch = async(req, res, next) => {

    try {
        let searchrdfield = req.query.ambtype;
        const { skip , limit } = req.query;
        let data = await ambutype.find({ ambtype: { $regex: searchrdfield, $options: '$i' } }).limit(parseInt(limit)).skip(parseInt(skip));
        //then(data=>{
        // res.send(data);
        res.send({
            statusCode: 200,
            status: true,
            message: 'Search Successfully',
            data 
        })

    } catch (error) {
        console.log(error);
    }
}

exports.AmbbyID = async(req, res, next) => {
    //console.log("hhhhhhh", req.params.Id);
    // const searchrdfield = req.query.id;
        //then(data=>{
        // res.send(data);
        // let data = await ambutype.findById(req.params.Id).exec();
    try {
    var id = req.params.Id;
    const data = await ambutype.findById(id, function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
        console.log("Result : ", docs);
    }
});
        res.send({
            statusCode: 200,
            status: true,
            message: 'Search successfully',
            data : {data}
        })

    } catch (error) {
        console.log(error.message);
    }
}

//____________________list fare end__________________//

exports.faredataupdate = async(req, res, next) => {


//     try {
//         //var editfare = await ambutype.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true });
//         var editfare =  ambutype.findOneAndUpdate( { _id: req.params.id }, req.body, 
//             { new: true }
//             , null, function (err, docs) {
//             if (err){
//                 console.log(err)
//             }
//             else{
//                 console.log("Original Doc : ",docs);
//             }
//         });
//         return res.json({
//             statusCode: 200,
//             status: true,
//             //message: newResponseMessage.objectUpdation,
//             message : "update successfully",
//             data: editfare,
//             // success: true,
//         });

//     } catch (error) {
//         res.json({ message: error });
//     }
// }

//_____________________________________________________//

try {
let getAT = await ambutype.findOne({
    _id: req.params.id,
  });
  if (!getAT) return res.json({
    status: true,
    statusCode: 404,
    message: "not found",
    data: updatedListing,
  });
  console.log(req.body);
  
  const updatedListing = await ambutype.findByIdAndUpdate({ _id: req.params.id },
    req.body||getAT ,{new:true}
);
console.log(updatedListing);
res.json({ status: true, statusCode: 200, message: "update successfully", data: updatedListing });
} catch (error) {
    res.json({ message: error, statusCode: 500 });
}
};

//_____________________________________________________//

exports.faredatadelete = async(req, res, next) => {

    try {
        const faredata = await ambutype.findOne({ _id: req.params.ID });
        await faredata.remove();
        // await faredata.remove();
        return res.json({
            statusCode: 200,
            status: true,
            message: "Deleted Successfully.",
            //success: true,
        });
    } catch (error) {
        console.log(error.message);
        res.json({ message: error });
    }
}

//let storeId = req.query.storeId
exports.totalprice = async(req, res, next) => {

    // let Distance_ = req.body.Distance_;
    // let Service = await ambutype.find({ ambtype: req.body.ambtype, name: req.body.name });

    try {
        var  { ambtype,name } = req.body;
       // const { skip , limit } = req.body;
        let Distance_ = req.body.Distance_;
        let Service = await ambutype.find({ ambtype,name });
        let Data_1 = Service.price;
        let Data_2 = Service.fareperkm;
        //console.log("hhhhh",Data1,Data2);

        let Total = Data_1 + (Data_2 * Distance_);
        
        const _student = {
            Service
        }

        //object 2
        const _person = {
            Total
            }
            // merge three objects
        const newObject = Object.assign(_person, _student);
        return res.json({
                count : Service.length,
                status: true,
                statusCode: 200,
                data: newObject
            });
            // }
    } catch (error) {
        console.log(error)
    }finally { console.log("working_",error.message)}
}
//___ambutype____model____end_____/

//*****************************************************************//

//___ambucateg____model_start_____/

exports.viewcateg = async(req, res, next) => {

    try {
        const catdata = await ambucateg.find(req.params.id);
        res.json({ catdata });

    } catch (error) {
        res.json({ message: error });
    }
}
//________________________________//

//___bookamb____model_start_____/

exports.Activetrip = async(req, res,next) => {

    try {

        const { page = 1, limit = 0 } = req.query;
        if (req.query.search) {
            const products = await bookamb.find({
                $or: [{ "starttrip": { $regex: req.query.search, $options: 'i' } },
                    { phone: req.query.search }, { drivername: req.query.search },
                    { email: req.query.search }, { name: 1, drivername: 1 }
                ]
            }).limit(limit * 1).skip((page - 1) * limit);
            let driverdata = await DriverRegister.find(req.params.DriverId, { drivername: 1, email: 1, phone: 1 }).limit(limit * 1).skip((page - 1) * limit)
            let userdata = await UserRegister.find(req.params.UserId, { name: 1, email: 1, phone: 1 }).limit(limit * 1).skip((page - 1) * limit)
                // object 1
            const person1 = {
                driverdata
            }
            const person2 = {
                    userdata
                }
                // //object 3
            const person3 = {
                    products
                }
                // merge three objects
            const newObj = Object.assign(person1, person2, person3);
            res.send({
                    statusCode: 200,
                    status: true,
                    total: products.length,
                    message: 'Search successfully',
                    response: newObj
                })
                // res.status(200).json({total: products.length,newObj});
        }
    } catch (error) {
        console.log(error);
    }
}

exports.SingleActivetrip = async(req, res,next) => {

    try {

        if (req.query.search) {
            const products = await bookamb.findOne({
                $or: [{ "starttrip": { $regex: req.query.search, $options: 'i' } },
                    { phone: req.query.search }, { drivername: req.query.search },
                    { email: req.query.search }, { name: 1, drivername: 1 }
                ]
            });
            let driverdata = await DriverRegister.findOne(req.params.DriverId, { drivername: 1, email: 1, phone: 1 });
            let userdata = await UserRegister.findOne(req.params.UserId, { name: 1, email: 1, phone: 1 });
            // object 1
            const person1 = {
                driverdata
            }
            const person2 = {
                    userdata
                }
                // //object 3
            const person3 = {
                    products
                }
                // merge three objects
            const newObj = Object.assign(person1, person2, person3);
            res.send({
                    statusCode: 200,
                    status: true,
                    //total: products.length,
                    message: 'Search successfully',
                    response: newObj
                })
                // res.status(200).json({total: products.length,newObj});
        }
    } catch (error) {
        console.log(error);
    }
}

exports.SingleCompletetrip = async(req, res,next) => {

    try {

        const { page = 1, limit = 0 } = req.query;
        if (req.query.search) {
            const products = await bookamb.findOne({
                $or: [{ "starttrip": { $regex: req.query.search, $options: 'i' } },
                    { phone: req.query.search }, { drivername: req.query.search },
                    { email: req.query.search }, { name: 1, drivername: 1 }
                ]
            }).limit(limit * 1).skip((page - 1) * limit);
            let driverdata = await DriverRegister.findOne(req.params.DriverId, { drivername: 1, email: 1, phone: 1 }).limit(limit * 1).skip((page - 1) * limit)
            let userdata = await UserRegister.findOne(req.params.UserId, { name: 1, email: 1, phone: 1 }).limit(limit * 1).skip((page - 1) * limit)
                // object 1
            const person1 = {
                driverdata
            }
            const person2 = {
                    userdata
                }
                // //object 3
            const person3 = {
                    products
                }
                // merge three objects
            const newObj = Object.assign(person1, person2, person3);
            res.send({
                    statusCode: 200,
                    status: true,
                    //total: products.length,
                    message: 'Search successfully',
                    response: newObj
                })
                // res.status(200).json({total: products.length,newObj});
        }
    } catch (error) {
        console.log(error);
    }
}

exports.Completetrip = async(req, res,next) => {

    try {
        const { skip , limit } = req.query
        if (req.query.search) {
            const products = await bookamb
              .find({  endtrip: { $regex: req.query.search, $options: "i" }})
              .sort({ "_id": -1 })
              .limit(parseInt(limit))
            //   .skip(skip)
            //   .populate("DriverId")
            //   .populate("UserId");
            // let driverdata = await DriverRegister.find().limit(limit).skip(skip)
            // let userdata = await UserRegister.find().limit(limit).skip(skip)

            // const person = {
            //     driverdata
            // }

            // // object 2
            // const student = {
            //     userdata
            // }

            // //object 3
            // const person2 = {
            //         products
            //     }
            //     //merge three objects
            // const newObj = Object.assign(person, student, person2);
            res.send({
              statusCode: 200,
              status: true,
            //   total: products.length,
              message: "Search successfully",
              response: products,
            });
                // res.status(200).json({total: products.length,newObj});
        }

    } catch (error) {
        console.log(error);
    }
}

exports.Drivertrip = async(req, res,next) => {

    try {
        //console.log(req.query.DriverId);
        const limit = req.query.limit ? req.query.limit : 10;
        const skip = req.query.skip ? req.query.skip : 0;
        const tripData = await bookamb.findOne(req.query.DriverId).limit(limit).skip(skip * limit);
        return res.json({
            status: true,
            statusCode: 200,
            response: [tripData]
        });
        //res.status(400).send(returnObj);
    } catch (error) {
        console.log(error);
    }
}

exports.Usertrip = async(req, res,next) => {

    try {
        const limit = req.query.limit ? req.query.limit : 10;
        const skip = req.query.skip ? req.query.skip : 0;
        //console.log(req.query.UserId);
        const tripData = await bookamb.findOne(req.query.UserId).limit(limit).skip(skip * limit);
        return res.json({
            status: true,
            statusCode: 200,
            response: [tripData]
        });
        //res.status(400).send(returnObj);

    } catch (error) {
        console.log(error);
    }
}

exports.Tripcount = async(req, res,next) => {

    //let searchQuery = {};
    let data = await bookamb.find().countDocuments()
    return res.json({
        code: 200,
        //message: newResponseMessage.objectFound,
        //data: foundTestimonials,
        success: true,
        count: data
    });

}

exports.DriverCanceltrip = async(req, res,next) => {

    try {
        //const { page = 1, limit = 0 } = req.query;
        if (req.query.search) {
            const products = await bookamb.findOne({
                $or: [{ "canceltrip": { $regex: req.query.search, $options: 'i' } },
                    { phone: req.query.search }, { drivername: req.query.search },
                    { email: req.query.search }, { name: 1, drivername: 1 }
                ]
            });
            let driverdata = await DriverRegister.findOne(req.params.DriverId, { drivername: 1, email: 1, phone: 1 });
            // object 1
            const person1 = {
                driverdata
            }

            // //object 3
            const person3 = {
                    products
                }
                // merge three objects
         const newObj = Object.assign(person1, person3);
         return res.send({
                    statusCode: 200,
                    status: true,
                    //total: products.length,
                    message: 'Search successfully',
                    response: newObj
                })
                // res.status(200).json({total: products.length,newObj});
        }
    } catch (error) {
        console.log(error.message);
        return res.json({
            status : true,
            statusCode : 500,
            message : "something went wrong",
            error: error.message
        });
    }
}

exports.AllDriverCanceltrip = async(req, res,next) => {

    try {
        const { page = 1, limit = 0 } = req.query;
        if (req.query.search) {
            const products = await bookamb.find({
                $or: [{ "canceltrip": { $regex: req.query.search, $options: 'i' } },
                    { phone: req.query.search }, { drivername: req.query.search },
                    { email: req.query.search }, { name: 1, drivername: 1 }
                ]
            }).limit(limit * 1).skip((page - 1) * limit);
            let driverdata = await DriverRegister.find(req.params.DriverId, { drivername: 1, email: 1, phone: 1 }).limit(limit * 1).skip((page - 1) * limit)
                // object 1
            const person1 = {
                    driverdata
                }
                // //object 3
            const person3 = {
                    products
                }
                // merge three objects
            const newObj = Object.assign(person1, person3);
            res.send({
                    statusCode: 200,
                    status: true,
                    total: products.length,
                    message: 'Search successfully',
                    response: newObj
                })
                // res.status(200).json({total: products.length,newObj});
        }
    } catch (error) {
        console.log(error.message);
        return res.json({
            status : true,
            statusCode : 500,
            message : "something went wrong",
            error: error.message
        });
    }
}

exports.UserCanceltrip = async(req, res,next) => {

    try {
        if (req.query.search) {
            const products = await bookamb.findOne({
                $or: [{ "canceltrip": { $regex: req.query.search, $options: 'i' } },
                    { phone: req.query.search }, { name: req.query.search },
                    { email: req.query.search }, { name: 1, rname: 1 }
                ]
            });
            let userdata = await UserRegister.findOne(req.params.UserId, { name: 1, email: 1, phone: 1 })

            const person2 = {
                    userdata
                }
                // //object 3
            const person3 = {
                    products
                }
                // merge three objects
            const newObj = Object.assign(person2, person3);
            res.send({
                    statusCode: 200,
                    status: true,
                    //total: products.length,
                    message: 'Search successfully',
                    response: newObj
                })
                // res.status(200).json({total: products.length,newObj});
        }
    } catch (error) {
        console.log(error.message);
        return res.json({
            status : true,
            statusCode : 500,
            message : "something went wrong",
            error: error.message
        });
    }
}

exports.AllUserCanceltrip = async(req, res,next) => {
    
    try {
        const { page = 1, limit = 0 } = req.query;
        if (req.query.search) {
            const products = await bookamb.find({
                $or: [{ "canceltrip": { $regex: req.query.search, $options: 'i' } },
                    { phone: req.query.search }, { name: req.query.search },
                    { email: req.query.search }, { name: 1, drivername: 1 }
                ]
            }).limit(limit * 1).skip((page - 1) * limit);
            let userdata = await UserRegister.find(req.params.UserId, { name: 1, email: 1, phone: 1 }).limit(limit * 1).skip((page - 1) * limit)
                // object 1
            const person2 = {
                    userdata
                }
                // //object 3
            const person3 = {
                    products
                }
                // merge three objects
            const newObj = Object.assign(person2, person3);
            res.send({
                    statusCode: 200,
                    status: true,
                    total: products.length,
                    message: 'Search successfully',
                    response: newObj
                })
                // res.status(200).json({total: products.length,newObj});
        }
    } catch (error) {
        console.log(error.message);
        return res.json({
            status : true,
            statusCode : 500,
            message : "something went wrong",
            error: error.message
        });
    }
}

exports.countDriverCanceltrip = async(req, res,next) => {

    try {
        if (req.query.search) {
            const products = await bookamb.find({
                    $or: [{ "canceltrip": { $regex: req.query.search, $options: 'i' } }, ]
                }).countDocuments()
                // object 1

            const person3 = {
                    products
                }
                // merge three objects
            const newObj = Object.assign(person3);
            res.send({
                    statusCode: 200,
                    status: true,
                    //total: products.length,
                    message: 'Search successfully',
                    response: newObj
                })
                // res.status(200).json({total: products.length,newObj});
        }
    } catch (error) {
        console.log(error.message);
        return res.json({
            status : true,
            statusCode : 404,
            message : "something went wrong",
            error: error.message
        });
    }
}
//___bookamb____model_end_____/
exports.totalusers = async(req, res,next ) => {
 //let searchQuery = {};
   try{
    let data = await UserRegister.find().countDocuments()
    if (!data){
        return res.json({
            status: false,
            statusCode: 400,
            message : "something went wrong",
            count: null
        });
    }else{
        return res.json({
            status: true,
            statusCode: 200,
            message : "total user",
            count: data
        });
    }
   }catch(error){
       res.json({
                status:false ,
                statusCode : 500,
                message : "Internal probelem and error found!",
                error : error.message
    })
   }
}

//____start_______________Revenue ____________________//


exports.addrevenue =  async (req,res,next) => {
    try {
        let {cash,credit,commision} = req.body;
        let addRevenue = await RevenueModel.create({cash,credit,commision});
        console.log(addRevenue,"749-760");
        if(!addRevenue)
        return res.json({message:"Data Are Required"});
        else{
        res.status(200).send({
            status: true,
            statusCode: 200,
            message: "Added",
            data: addRevenue 
        });
    }  //else close
    } catch (error) {
        console.log(error.message);
        return res.json({
            status : true,
            statusCode : 404,
            message : "something went wrong",
            error: error.message
        });
    }finally{ console.log("addrevenue")
}
};

exports.getrevenue = async (req,res,next) => {
   try {
       let totalcash = 0;
       let totalcredit = 0;
       let totalCommision = 0;

       let getRevenue = await RevenueModel.find()
       //.countDocuments();
       console.log(getRevenue);

      const itemss= getRevenue.forEach(g=>{
          totalcash += parseInt(g.cash)
          totalcredit += parseInt(g.credit)
          totalCommision += parseInt(g.commision)
      });
      console.log(itemss,totalcash,totalcredit,totalCommision);
    
       if(!getRevenue)
       return res.json({message:"Something Went Wrong"});
       else{
       res.status(200).send({
           status: true,
           statusCode: 200,
           message: "View All",
           data: {totalcash,totalcredit,totalCommision},
       });
   }  
   } catch (error) {
    console.log(error.message);
    return res.json({
        status : true,
        statusCode : 500,
        message : "Something Went Wrong",
        error: error.message
    });
   }
};

exports.get_DWM_revenue = async (req,res,next) => {
    //let week = today.setDate(today.getDate()
    var today = new Date()
    var first = (today.getDate() - today.getDay());
    // console.log(first ,"today and first");
    // debugger;
    var firstDayWeek = new Date(today.setDate(first));
    // console.log(firstDayWeek ,"firstDayWeek");
    // debugger;
    var lastDayWeek = new Date(today.setDate(first + 6));
    // console.log(lastDayWeek ,"lastDayWeek");
    // debugger;
    var firstDayMonth = new Date(today.setDate(1));
    // console.log(firstDayMonth ,"firstDayMonth");
    // debugger;
    var lastDayMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    // console.log(lastDayMonth ,"lastDayMonth");
    // debugger;
    lastDayWeek.setHours(23, 59, 59, 0);
    // console.log(lastDayWeek ,"lastDayWeek");
    // debugger;
    lastDayMonth.setHours(23, 59, 59, 0);
    // console.log(lastDayMonth ,"lastDayMonth");
    // debugger;
    today = new Date().setHours(0, 0, 0, 0); 
    // console.log(today ,"today last");
    // debugger;
    
    let getRevenue_DWM = await RevenueModel.aggregate([{
            $match: {
                today
            }
        }, {
            $group: {
                _id:null,
                "today": {
                    $push: {
                        $cond: {
                            if: {
                                $gte: ["$createdAt", new Date(today)]
                            },
                            then: "$$ROOT",
                            else: ''
                        }
                    }
                },
                "week": {
                    $push: {
                        $cond: [{
                                $and: [{
                                        $gte: ["$createdAt", new Date(firstDayWeek)]
                                    },
                                    {
                                        $lte: ["$createdAt", new Date(lastDayWeek)]
                                    }
                                ]
                            },
                            "$$ROOT",
                            ''
                        ]
                    }
                },
                "month": {
                    $push: {
                        $cond: [{
                                $and: [{
                                        $gte: ["$createdAt", new Date(firstDayMonth)]
                                    },
                                    {
                                        $lte: ["$createdAt", new Date(lastDayMonth)]
                                    }
                                ]
                            },
                            "$$ROOT",
                            ''
                        ]
                    }
                }
            },
            
        },{ $project:{
            _id:0,
             }
        },])
        

   console.log(getRevenue_DWM,"getRevenue_DWM")
   debugger;

let getItems =  getRevenue_DWM.forEach(function (data) {
            data.today = data.today.filter(e => e != "")
            data.week = data.week.filter(e => e != "")
            print(data);
        });
console.log(e," data.today");
//console.log(data.week," data.week");
debugger;

//        if(!getRevenue_DWM)
//        return res.json({message:"Something Went Wrong"});
//        else{
//        res.status(200).send({
//            status: true,
//            statusCode: 200,
//            message: "View All by Date",
//          //  data: {daily,weekly,monthly},
//            data_2 :data
//        });
//    }  
};

exports.getBYrevenue = async (req, res, next) => {
    try{
        let _id = req.params._id;
        let getRevenueId = await RevenueModel.findById({_id});
        if(!getRevenueId)
        return res.json({message:"something went wrong"});
        else{
            res.json({
                status : true,
                statusCode : 200,
                message : "view",
                data : getRevenueId
            })
        }
    }catch(error){
        console.log(error.message);
        return res.json({
            status : true,
            statusCode : 500,
            message : "Something Went Wrong",
            error: error.message
        });
    }
};

exports.revenuedataupdate = async(req, res, next) => {

    try {
    let _id = req.params._id;
    let getRevenue = await RevenueModel.findOne({
        _id
      });
      if (!getRevenue) 
      return res.json({
        status: true,
        statusCode: 404,
        message: "not found",
        data: updatedRevenue,
      });

      console.log(req.body);
      let body = req.body
      const updatedRevenue = await RevenueModel.findByIdAndUpdate({ _id },
        body ||getRevenue ,{new:true}
    );
    console.log(updatedRevenue,"updatedRevenue line no. 1002-1010");

    if(!updatedRevenue){
        return res.status(500).json({
            status: false,
            statusCode : 500,
            message : "Internal Problem and data not updated"
        })
    }else
    return res.json({ 
        status: true,
        statusCode: 200, 
        message: "update successfully",
        data: updatedRevenue 
    });
    } catch (error) {
        console.log(error.message);
        return res.json({
            status : true,
            statusCode : 500,
            message : "something went wrong",
            error: error.message
        });
    }
};
    
exports.revenuedatadelete = async(req, res, next) => {

    try {
        const revenuedata = await RevenueModel.findOne({ _id: req.params._id });
        await revenuedata.remove();
        // await faredata.remove();
        return res.json({
            statusCode: 200,
            status: true,
            message: "Remove Succefully",
            //success: true,
        });
    } catch (error) {
        console.log(error.message);
        return res.json({
            status : true,
            statusCode : 500,
            message : "something went wrong",
            error: error.message
        });
    }
};
    
// exports.revenuetotalprice = async(req, res, next) => {
    
//     let data = await RevenueModel.find().countDocuments()

//     return res.json({
//         status: true,
//         statusCode: 200, 
//         //message: newResponseMessage.objectFound,
//         //data: foundTestimonials,
//         //success: true,
//         count: data
//     });
// }
  
// exports.revenuetotalprice = async(req, res, next) => {

//     try {
//         var  { cash,credit,commision } = req.body;
//         let DWM = req.body.DWM;
//         let Service = await RevenueModel.find({ cash,credit,commision });
//         let Data_1 = Service.cash;
//         let Data_2 = Service.credit;
//         let Data_3 = Service.commision;

//         console.log(req.body.DWM);

//         // let Total_Cash = Data_1 + (Data_1 * Data_1);
//         // let Total_Credit = Data_2 + (Data_2 * Data_2);
//         // let Total_Commision = Data_3 + (Data_3 * Data_3);
//         let Total_Cash = (Data_1 * Data_1);
//         let Total_Credit = (Data_2 * Data_2);
//         let Total_Commision = (Data_3 * Data_3);
//         console.log(Total_Cash,Total_Credit,Total_Commision,"863");
//         debugger;
//         //let Total = Data_1 + (Data_2 * DWM);
        
//         // const _serve = {
//         //     Service
//         // }

//         //object 2
//         const _price = {
//             Total_Cash,
//             Total_Credit,
//             Total_Commision
//             }
           
//         const newObject = Object.assign(_price);
//         return res.json({
//                 count : Service.length,
//                 status: true,
//                 statusCode: 200,
//                 data: newObject
//             });
//             // }
//     } catch (error) {
//         console.log(error)
//     }finally { console.log("working_",error.message)}
// }

exports.getTodayRevenue = async (req ,res,next) => {
    try {
       // let today = new Date().setHours(0, 0, 0, 0);
        let today = new Date();
        today.setHours(0, 0, 0, 0)
        let first = today.getDate() - today.getDay();
        var firstDayWeek = new Date(today.setDate(first));
        var lastDayWeek = new Date(today.setDate(first + 6));
        var firstDayMonth = new Date(today.setDate(1));
        var lastDayMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        lastDayWeek.setHours(23, 59, 59, 0);
        lastDayMonth.setHours(23, 59, 59, 0);
        today = new Date().setHours(0, 0, 0, 0);

        let aggregate = await RevenueModel.aggregate([
            {
            $project:{
                cash:1,
                credit:1,
                commision:1,

                 todayRevenue:  
                 //{ $gte: ["$createdAt", today]}
                 {$gte: ["$createdAt", new Date(today)]}
                 }
            },
            { $match :{ 
                todayRevenue:true
                // timestamp : true
            }}
            ,
            {
                $group:{
                    _id:null,
                    cashCount:{$sum:"$cash"},
                    creditCount:{$sum:"$credit"},
                    commisionCount:{$sum:"$commision"},
                    }   
                },
                { $project:{
                    _id:0,
                     }
                },
    ])

        console.log(aggregate);
        res.status(200).json({
            status:true,
            statusCode:200,
            message : "View All Total Revenue Of This Day",
            data:aggregate[0],
        })
    } catch (error) {
        console.log(error.message);
        return res.json({
            status : true,
            statusCode : 500,
            message : "Something Went Wrong",
            error: error.message
        });
    }
}
  
exports.getThisWeekRevenue = async (req ,res,next) => {

    try {
        // let today = new Date()
        // let week = today.setDate(today.getDate()-7)
        // console.log(today ,week);
        let today = new Date();
        today.setHours(0, 0, 0, 0)
        let first = today.getDate() - today.getDay();
        var firstDayWeek = new Date(today.setDate(first));
        var lastDayWeek = new Date(today.setDate(first + 6));
        var firstDayMonth = new Date(today.setDate(1));
        var lastDayMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        lastDayWeek.setHours(23, 59, 59, 0);
        lastDayMonth.setHours(23, 59, 59, 0);
        today = new Date().setHours(0, 0, 0, 0);
        let aggregate = await RevenueModel.aggregate([
            {
            $project:{
                cash:1,
                credit:1,
                commision:1,

                 //weekRevenue:  { $gte: ["$createdAt", week]}
                 weekRevenue: 
                  { $gte: ["$createdAt", new Date(firstDayWeek)]}
                 }
            },
            { $match :{ 
                weekRevenue:true
            }}
            ,
            {
                $group:{
                    _id:null,
                    cashCount:{$sum:"$cash"},
                    creditCount:{$sum:"$credit"},
                    commisionCount:{$sum:"$commision"},
                    }
                },
                { $project:{
                    _id:0,
                     }
                },
    ])

        console.log(aggregate);
     return res.status(200).json({
            status:true,
            statusCode:200,
            message : "View All Total Revenue Of This Week",
            data:aggregate[0],
        })
    } catch (error) {
        console.log(error.message);
        return res.json({
            status : true,
            statusCode : 500,
            message : "something went wrong",
            error: error.message
        });
    }
}

exports.getThisMonthRevenue = async (req ,res,next) => {
    try {
       
        // let today = new Date()
        // let month = today.setDate(today.getDate()-30)
        // console.log(today ,month);

        let today = new Date();
        today.setHours(0, 0, 0, 0)
        let first = today.getDate() - today.getDay();
        var firstDayWeek = new Date(today.setDate(first));
        var lastDayWeek = new Date(today.setDate(first + 6));
        var firstDayMonth = new Date(today.setDate(1));
        var lastDayMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        lastDayWeek.setHours(23, 59, 59, 0);
        lastDayMonth.setHours(23, 59, 59, 0);
        today = new Date().setHours(0, 0, 0, 0);

        let aggregate = await RevenueModel.aggregate([
            {
            $project:{
                cash:1,
                credit:1,
                commision:1,
                // monthRevenue:  { $gte: ["$createdAt", month]}
                monthRevenue:  { $gte: ["$createdAt", new Date(firstDayMonth)]}
                 }
            },
            { $match :{ 
                monthRevenue:true
            }}
            ,
            {
                $group:{
                    _id:null,
                    cashCount:{$sum:"$cash"},
                        creditCount:{$sum:"$credit"},
                        commisionCount:{$sum:"$commision"},
                    }
                },
                { $project:{
                    _id:0,
                     }
                },
    ])

        console.log(aggregate);
        res.status(200).json({
            statusCode:200,
            status:true,
            message : "View All Total Revenue Of This Month",
            data:aggregate[0],
        })
    } catch (error) {
        console.log(error.message);
        return res.json({
            status : true,
            statusCode : 500,
            message : "something went wrong",
            error: error.message
        });
    }
}

//___________________Revenue ____________end__________//
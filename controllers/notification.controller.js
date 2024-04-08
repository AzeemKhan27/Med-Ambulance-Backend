    const { sendNotification } = require("../utils/sendNotification");
    const db = require("../services/dboperations");
    const { UserRegister , DriverRegister } = require("../model");
    //let deviceToken = process.env.DeviceTokenAndroid
    

    exports.sendNotificationToUser = async (req ,res ,next) => {
        try {
          //  let APIKEY = process.env.APIKEY
            let {userId} = req.params
            let getUserData = await db.findOne(UserRegister , {_id:userId});
            if (!getUserData) return res.status(404).send({
                message: "User not found",
                status: false,
                statusCode: 404,
            });
           await sendNotification(getUserData.deviceToken , "getUserData" );
        } catch (err) {
            res.status(400).send({
                message:"Something went wrong", 
                status:false,
                statusCode:400
            })
        }
    }
    
    //_____________sendNotificationToDriver___________________//

    exports.sendNotificationToDriver = async (req ,res ,next) => {
        try{
       // let APIKEY = process.env.APIKEY
        let {DriverId} = req.params
        let getDataDriver = await db.findOne(DriverRegister,{_id: DriverId});
        console.log(getDataDriver,"+++++ 34 ++++")
        if(!getDataDriver) return res.status(404).json({
            status: false,
            statusCode: 404,
            message: "Driver not found"
        })  
        let deviceTokenAnd = "AAAAwhC-E2c:APA91bGMTayl4n45S7PPjzd3CDBffIyhPp0CgoIByD1bmztHSyWFjjjAd5VvKC9WHNG_uVmwbeywo-gK4UN85pW4V8OiIWQqnqw6R_SWzuI_uVtL6JEtqpQDUtdpczN2O_jPXiQN4j41";
       // sendNotification(getDataDriver.deviceToken,'Driver Notification Send for testing Server_Side.....')
       sendNotification(deviceTokenAnd,'Driver Notification Send for testing Server_Side.....')
        }catch(error){
            res.status(400).send({
                status:false,
                statusCode:400,
                message:"Something went wrong"
            })
        }finally{console.log("chl to rha hai")}
    }
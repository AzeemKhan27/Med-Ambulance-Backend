const { appContent,appAboutSchema } = require("../model");

exports.AboutUs = async (req, res ,next) => {
    try {
        const addAboutObj = {aboutUs} = req.body
        const addAboutDetails = new appAboutSchema(addAboutObj);
        const result = await addAboutDetails.save();
        console.log(result,"addAboutDetails")

        if(result) {
            return res.status(200).send({
                status : true,
                statusCode : 200,
                message : "Data Added Successfully",
                data : result
         });
        }else{
            return res.status(400).send({
                status : true,
                statusCode : 400,
                message : "Something Went Wrong",
         });
        }
    } catch (error) {
        return res.status(409).send({
               status : false,
               statusCode : 404,
               message : "Something Went Wrong",
               error : error.message
        })
    }
};

exports.getAboutUsData = async (req ,res ,next) => {
 try {
    const getAll = await appAboutSchema.find();
    if(!getAll){
      return res.status(404).send({
          status : true,
          statusCode : 404,
          message : "Something Went Wrong",
        });
    }else{
      return res.status(200).send({
          status : true,
          statusCode : 200,
          message : "View All Data",
          data : getAll
        });
      }
 } catch (error) {
    return res.status(409).send({
         status : true,
         statusCode : 409,
         message : "Error Found",
         error : error.message
     })
 } 
}
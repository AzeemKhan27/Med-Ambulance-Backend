
const jwt = require("jsonwebtoken");
const driver = require("../controllers/driver.controller");

//___________________________________________________________//

const tokenDriver = async function () {
    return jwt.sign({ _id: driver._id }, process.env.TOKEN_SECRET);
}
//const token = jwt.sign({DriverId : driver[0]._id},'secret',{expiresIn:'1h'});

const tokenUser = async function (){
    return new jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET_USER);
}

const tokenAdmin = async function (){
    return new jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET_ADMIN);
}

const tokenHospital = async function (){
    return new jwt.sign({ _id: hospital._id }, process.env.TOKEN_SECRET_HOSPITAL);
}

module.exports = {
    tokenDriver : tokenDriver,
    tokenUser : tokenUser,
    tokenAdmin : tokenAdmin,
    tokenHospital : tokenHospital
}



// let saveData = async function(model,data){
//     return new model(data).save();
// };

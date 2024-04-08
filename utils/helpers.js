'use strict';
"--unhandled-rejections=strict";

const opo = async (req,res) => {
    var phoneExit = await User.findOne({
        phone: req.body.phone
      });
    
     res.json({message : 'Register',
                  data : phoneExit,
            statusCode : 200});
 }
 module.exports = {opo}
    
                        //OTP

 const getRandomPin = (chars, len)=>[...Array(len)].map(
  (i)=>chars[Math.floor(Math.random()*chars.length)]
  ).join('');

 module.exports = {getRandomPin}

//response in json


const createError = require('http-errors');

    const errorHandler = ()=>{
        // ((req,res,next)=>{
        //     const error = new Error('Not Found');
        //     err.status = 404;
        //     next(error);
        // });
        next(createError(404,'Not Found'));
    }

//  app.use((error,req,res,next)=>{
//     res.status(error.status || 500);
//     res.send({
//         errors: {
//             status: error.status || 500,
//             message  : error.message
//         }
//     })
// });


module.exports={errorHandler}
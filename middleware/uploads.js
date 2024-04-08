const path = require('path')
const multer = require('multer')

let storage = multer.diskStorage({
    destination : (req, file, cb) => {
       cb(null,'./public/uploads/ID')
    },
    filename : (req, file , cb) =>  {
        let ext = path.extname(file.originalname)
        cb(null,Date.now + ext) 
    }
})

let upload = multer({
    storage,
    fileFilter : (req,file,callback) => {
         if(
             file.mimetype == 'image/png' ||
             file.mimetype == 'image/jpg' ||
             file.mimetype == 'image/jpeg' 
         ){
             callback(null,true)
         }else{
             callback(null,false)
             console.log(`jpg , jpeg , png `)
         }
    },
    limits : {
        fileSize : 1024 * 1024 * 2
    }
})


module.exports = upload;
const {category,subCategory}=require('../model');

// create Category

exports.createCategory=async(req,res)=>{
     if(!req.body.name){
         return res.send("name required")
     }
     try{
         let categoryData=await new category(req.body).save();
         return res.status(200).json({
             message:"category created successfully",
             data:categoryData,
             success:true
         })
     }
    catch(err){
    return res.send(err)
    }}

    // get single Category


    exports.GetSingleCategory=async(req,res)=>{
        try{
          const dataFound= await (await category.findById(req.params.categoryId));
          if(!dataFound){
            return res.send("driverId not found"+`${req.params.categoryId}`)
          }
          return res.status(200).json({
            message:"category get successfully",
            data:dataFound,
            success:true
        })
        }
        catch(error){
          return res.send(error)
        }
    }

    // getAll Category

    exports.getAllCategories=async(req,res)=>{
        const limit = req.body.limit ? req.body.limit : 10;
        const skip = req.body.skip ? req.body.skip : 0;
        category.countDocuments().then(total => {
            category.find().limit(limit).skip(skip*limit).then(result=>{
              res.json({success: true, message: 'ALl', data: result, total:total})
            })
          
        })
      };

      // update Category

      exports.updateCategory = async (req, res) => {
        try {
             let dataUpdate = await  category.findByIdAndUpdate(req.params.categoryId,{
               name:req.body.name,
           },{new:true});
               if(!dataUpdate){
                   return res.send(" not found" +req.params.categoryId)
               }
               return res.status(200).json({
                message:"category get successfully",
                data:dataFound,
                success:true
            })        } catch (error) {
            console.log("error in catch", error)
            res.status(500).json({ code: 400, success: false, message: "Internal server error", data: null })
        }
    
    }
    // delete Category

    exports.deleteCategory = async (req, res) => {
        try {
             let datadelete = await category.findByIdAndRemove(req.params.categoryId,{
           });
               if(!datadelete){
                   return res.send(" not found" +req.params.categoryId)
               }
            return res.send(datadelete)
        } catch (error) {
            console.log("error in catch", error)
            res.status(500).json({ code: 400, success: false, message: "Internal server error", data: null })
        }
    
    }

    ///****************SUNCATEGORY Module *****************/
    // create subCategory


    exports.createsubCategory=async(req,res)=>{
        if(!req.body.fareCharges){
            return res.send("fareCharges required")
        }
        if(!req.body.extraFareCharges){
            return res.send("extraFareCharges required")
        }
        if(!req.body.categoryId){
            return res.send("categoryId required")
        }
        try{
            let subCategoriesData=await new subCategory(req.body).save();
            return res.send(subCategoriesData)
        }
       catch(err){
       return res.send(err)
       }}
   

    // get one subCategory

       exports.GetSinglesubCategory=async(req,res)=>{
           try{
             const dataSubCategory= await (await subCategory.findById(req.params.subCategoryId).populate('categoryId'));
             if(!dataSubCategory){
               return res.send("subCatgory not found"+`${req.params.subCategoryId}`)
             }
             return res.send(dataSubCategory);
           }
           catch(error){
             return res.send(error)
           }
       }
       // get all subCategory

      exports.getAllSubCategories=async(req,res)=>{
        const limit = req.body.limit ? req.body.limit : 10;
        const skip = req.body.skip ? req.body.skip : 0;
       subCategory.countDocuments().then(total => {
        subCategory.find().populate('categoryId').limit(limit).skip(skip*limit).then(result=>{
              res.json({success: true, message: 'ALl', data: result, total:total})
            })
          
        })
      };
   
             //  subCategory

         exports.updatesubCategory = async (req, res) => {
           try {
                let dataUpdateSubCetgory = await  subCategory.findByIdAndUpdate(req.params.subCategoryId,{
                  categoryId:req.body.categoryId,
                  extraFareCharges:req.body.extraFareCharges,
                  fareCharges:req.body.fareCharges
              },{new:true});
                  if(!dataUpdateSubCetgory){
                      return res.send(" not found" +req.params.subCategoryId)
                  }
               return res.send(dataUpdateSubCetgory)
           } catch (error) {
               console.log("error in catch", error)
               res.status(500).json({ code: 400, success: false, message: "Internal server error", data: null })
           }
       
       }
           // delete subCategory

    exports.deletesubCategory = async (req, res) => {
        try {
                let deleteSubCategorydata = await  subCategory.findByIdAndRemove(req.params.subCategoryId,{
            });
                if(!deleteSubCategorydata){
                    return res.send("not found" +req.params.subCategoryId)
                }
            return res.send(deleteSubCategorydata)
        } catch (error) {
            console.log("error in catch", error)
            res.status(500).json({ code: 400, success: false, message: "Internal server error", data: null })
        }
    }
      
'use strict';
"--unhandled-rejections=strict";

const router = require("express").Router();
const {createCategory,
       GetSingleCategory,getAllCategories,updateCategory,deleteCategory,createsubCategory,
       GetSinglesubCategory,getAllSubCategories,updatesubCategory,deletesubCategory
} =  require('../../controllers/category.controller');

//***********categories routes***************///

router.post("/create/category",createCategory);
router.get("/get/:categoryId",GetSingleCategory);
router.get('/allcategories',getAllCategories);
router.put('/updateCategory/:categoryId',updateCategory);
router.delete('/delteCategory/:categoryId',deleteCategory);

//***************subCategory routes****************//

router.post("/create/subCategory",createsubCategory);
router.get("/getsubCatgeory/:subCategoryId",GetSinglesubCategory);
router.get('/allSubcategories',getAllSubCategories);
router.put('/updatesubCategory/:subCategoryId',updatesubCategory);
router.delete('/deletesubCategory/:subCategoryId',deletesubCategory);   

module.exports = router;
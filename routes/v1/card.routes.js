'use strict';
"--unhandled-rejections=strict";

const router = require("express").Router();
const {CreateCard,newCardCreate,getAllCardDetail,updateCardDetail,deleteCardDetail,createPayment,}=require('../../controllers/card.controller')
const {rateCardAdd,rateCardSearch,AboutUs,getAboutUsData} = require('../../controllers/userCard.controller');
//const verifyAuthUser = require("../../middleware/userAuth");

router.post("/create",CreateCard);
router.post('/create/newCard',newCardCreate);
router.post('/cardDetail',getAllCardDetail);
router.put('/update/cardDetail',updateCardDetail);
router.delete('/delete/cardDetail',deleteCardDetail);
router.post('/create/payment',createPayment)

//____________userCard_start_______________________//

router.post('/user/rateCard',rateCardAdd);
router.get('/CategRateCard',rateCardSearch);

//____________userCard_end_______________________//

    
module.exports = router;
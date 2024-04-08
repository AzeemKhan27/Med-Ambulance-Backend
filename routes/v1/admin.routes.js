'use strict';
"--unhandled-rejections=strict";

const router = require("express").Router();
const {statusUpdate,ViewAllPayment} = require("../../controllers/booking.controller");
const {
    faredataupdate,
    ambtype,
    Ambsearch,
    AmbbyID,
    faredatadelete,
    loginadmin,
    Completetrip,
    Activetrip,
    Usertrip,
    Drivertrip,
    Tripcount,
    totalusers,
    totalprice,
    SingleCompletetrip,
    SingleActivetrip,
    AllUserCanceltrip,
    UserCanceltrip,
    AllDriverCanceltrip,
    DriverCanceltrip,
    countDriverCanceltrip,
    addrevenue,
    getrevenue,
    getBYrevenue,
    revenuedataupdate,
    revenuetotalprice,
    revenuedatadelete,
    get_DWM_revenue,
    getTodayRevenue,
    getThisWeekRevenue,
    getThisMonthRevenue
} = require("../../controllers/dashboard.controller");
const verifyAuthAdmin = require("../../middleware/admin_Auth");
const verifyAuthUser = require("../../middleware/userAuth");
const verifyAuth = require("../../middleware/auth")

//___________________________fare________________________________________________//


router.post("/farecate", ambtype);   //done

//________________ambs fare search______________//

router.get("/ambs", Ambsearch);  //done

//________________edit fare list________________//  

router.get("/ambbyID/:Id", AmbbyID);  //done

router.post("/totalfare",  totalprice);    //done

router.patch("/editFare/:id",  faredataupdate);   //done

router.delete("/fareDelete/:ID",  faredatadelete);  //done

//________________edit fare list______________//

//___________start__________Revenue____________________//
router.post("/addRevenue",addrevenue);
router.get("/fetchRevenue",getrevenue);
router.get("/SingleRevenue/:_id",getBYrevenue);
router.patch("/EditRevenue/:_id",revenuedataupdate);
router.delete("/RemoveRevenue/:_id",revenuedatadelete);
//router.post("/totalCashRevenue",revenuetotalprice);
router.get("/fetch_DWM",get_DWM_revenue);
router.get("/getTodayRevenue",getTodayRevenue);
router.get("/getThisWeekRevenue",getThisWeekRevenue);
router.get("/getThisMonthRevenue",getThisMonthRevenue);
//_____________________Revenue________end______________//

//______________________________admin Login_________________________________________//

router.post("/adminlogin", loginadmin);

//______________________________trip_________________________________//

router.post("/activetrip",  Activetrip);
router.post("/completetrip", Completetrip);
router.post("/alldrivercanceltrip",  AllDriverCanceltrip);
router.post("/allusercanceltrip", AllUserCanceltrip);
router.get("/drivercanceltrip",  DriverCanceltrip);
router.get("/usercanceltrip", UserCanceltrip);
router.get("/singlecompletetrip", SingleCompletetrip);
router.get("/singleactivetrip", SingleActivetrip);
router.get("/allusertrip/:UserId", Usertrip);
router.get("/alldrivertrip/:DriverId",  Drivertrip);
router.get("/totaltrip",  Tripcount);
router.get("/canceltotaltrip",  countDriverCanceltrip);
router.post("/userscount",  totalusers);
router.put("/mytrip/user/statusUpdate",  statusUpdate);

//__payment__start_route_/

router.get("/all/payment/list",  ViewAllPayment);

//__payment__end__route__/

module.exports = router;
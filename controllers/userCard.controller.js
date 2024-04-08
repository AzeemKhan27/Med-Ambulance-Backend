const { userCard } = require("../model");

exports.rateCardAdd = async (req, res, next) => {
        try {
            //{ selectCategory : req.body.selectCategory};
            const addCardObj = {_id,selectCategory,TotalFare,ExtraCharges}=req.body;
            let rateDetails = await userCard.create(addCardObj);

            res.status(200).send({
                status: true,
                statusCode: 200,
                message: "Data Uploaded Successfully",
                data: {
                    details: { addCardObj },
                },
            });
        } catch (error) {
            console.log(error);
          res.status(400).send(error);
    };
};

exports.rateCardSearch = async (req, res, next) => {
    let searchObj = {};
    if(req.query.search) {
        searchObj = {
            $or:[
                {"selectCategory":{$regex:req.query.search,$options:'i'}},
                // {_id:req.query.search},
                {TotalFare: req.query.search},
                {ExtraCharges: req.query.search},
                {description: req.query.search}
            ]
        }; 
    }
    let count = await userCard.countDocuments(searchObj);
    let users = await userCard.find(searchObj);
    res.json({statusCode :200,success: true, message: 'ALL', data: users, total:count});
};


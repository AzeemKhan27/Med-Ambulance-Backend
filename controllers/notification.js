const { sendNotification } = require("../utils/sendNotification");
const db = require("../services/dboperations");
const { UserRegister, DriverRegister, Notification } = require("../model");

// exports.Addnotification = async (req, res, next) => {
//   var notification = {
//     title: "Title of notification from the Server Side",
//     text: "Subtitle from server side",
//   };
//   var fcm_tokens = [];
//   var notification_body = {
//     notification: notification,
//     registration_ids: fcm_tokens,
//   };

//   fetch("https://fcm.googleapis.com/fcm.sent", {
//     method: "POST",
//     headers: {
//       Authorization:
//         "key=" +
//         "AAAA5eElVI8:APA91bEH97DyjSamiQe963uRkuc31mEK6Dw8vhgItKa1GAH5AOso_lAqQLW7r6vkyfKlTl-ZV0In2Y1K25DfZ17ytsjcO6zk37EYOjhhiTTy2D-M2dqsYRUmN3Xh68EAEfEra74UMs4i",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(notification_body),
//   })
//     .then(() => {
//       res.status(200).send("Notification send successfully...");
//     })
//     .catch((err) => {
//       res.status(400).send("Something Went Wrong!");
//       console.log(err);
//     });
// };

exports.sendNotificationToUser = async (req, res, next) => {
  try {
    let { userId, msg, title, body } = req.body;
    let dataToPush = { msg, title, body };
    let getUserData = await db.findOne(UserRegister, { _id: userId });
    if (!getUserData)
      return res.status(404).send({
        message: "User not found",
        status: false,
        statusCode: 404,
      });

    let saveNotiFication = await db.saveData(Notification, {
      ...req.body,
      message: msg,
    });
    sendNotification(getUserData.deviceToken, dataToPush).then((resp) => {
      console.log(resp);
      return res
        .status(200)
        .send({
          message: "Notification sent",
          status: true,
          statusCode: 200,
          data: saveNotiFication,
        })
        .catch((err) => {
          console.log(err);
          return res.status(404).send({
            message: err,
            status: false,
            statusCode: 404,
          });
        });
    });
  } catch (err) {
    res.status(400).send({
      message: "Something went wrong",
      status: false,
      statusCode: 400,
    });
  }
};

exports.sendNotificationToDriver = async (req, res, next) => {
  try {
    let { driverId, msg, title, body } = req.body;
    let dataToPush = { msg, title, body };
    let getDriverData = await db.findOne(DriverRegister, { _id: driverId });
    if (!getDriverData)
      return res.status(404).send({
        message: "Driver not found",
        status: false,
        statusCode: 404,
      });
    let saveNotiFication = await db.saveData(Notification, {
      ...req.body,
      message: msg,
    });
    sendNotification(getDriverData.deviceToken, dataToPush).then((resp) => {
      console.log(resp);
      return res
        .status(200)
        .send({
          message: "Notification sent",
          status: true,
          statusCode: 200,
          data: saveNotiFication,
        })
        .catch((err) => {
          console.log(err);
          return res.status(404).send({
            message: err,
            status: false,
            statusCode: 404,
          });
        });
    });
  } catch (err) {
    res.status(400).send({
      message: "Something went wrong",
      status: false,
      statusCode: 400,
    });
  }
};

exports.sendNotificationToAllUser = async (req, res, next) => {
  try {
    let { msg, title, body } = req.body;
    let dataToPush = { msg, title, body };

    let getUserData = await db.getData(UserRegister);
    if (!getUserData)
      return res.status(404).send({
        message: "User not found",
        status: false,
        statusCode: 404,
      });
    let deviceTokens = getUserData.map((d) => {
      return d.deviceToken;
    });
    let userId = getUserData.map((d) => {
      return d._id;
    });
    let saveNotiFication = await db.saveData(Notification, {
      ...req.body,
      message: msg,
      userId,
    });
    sendNotification(deviceTokens, dataToPush).then((resp) => {
      console.log(resp);
      return res
        .status(200)
        .send({
          message: "Notification sent to all users",
          status: true,
          statusCode: 200,
          data: saveNotiFication,
        })
        .catch((err) => {
          console.log(err);
          return res.status(404).send({
            message: err,
            status: false,
            statusCode: 404,
          });
        });
    });
  } catch (err) {
    res.status(400).send({
      message: "Something went wrong",
      status: false,
      statusCode: 400,
    });
  }
};

exports.sendNotificationToAllDriver = async (req, res, next) => {
  try {
    let { msg, title, body } = req.body;
    let dataToPush = { msg, title, body };
    let getDriverData = await db.getData(DriverRegister);
    if (!getDriverData)
      return res.status(404).send({
        message: "Driver not found",
        status: false,
        statusCode: 404,
      });
    let deviceTokens = getDriverData.map((d) => {
      return d.deviceToken;
    });
    let driverId = getDriverData.map((d) => {
      return d._id;
    });
    let saveNotiFication = await db.saveData(Notification, {
      ...req.body,
      message: msg,
      driverId,
    });
    sendNotification(deviceTokens, dataToPush).then((resp) => {
      console.log(resp);
      return res
        .status(200)
        .send({
          message: "Notification sent to all Drivers",
          status: true,
          statusCode: 200,
          data: saveNotiFication,
        })
        .catch((err) => {
          console.log(err);
          return res.status(404).send({
            message: err,
            status: false,
            statusCode: 404,
          });
        });
    });
  } catch (err) {
    res.status(400).send({
      message: "Something went wrong",
      status: false,
      statusCode: 400,
    });
  }
};

exports.sendNotificationToAllDriverAndAllUser = async (req, res, next) => {
  try {
    let { msg, title, body } = req.body;
    let dataToPush = { msg, title, body };
    let getDriverData = await db.getData(DriverRegister);
    if (!getDriverData)
      return res.status(404).send({
        message: "Driver not found",
        status: false,
        statusCode: 404,
      });
    let getUserData = await db.getData(UserRegister);
    if (!getUserData)
      return res.status(404).send({
        message: "User not found",
        status: false,
        statusCode: 404,
      });
    let userDeviceTokens = getUserData.map((d) => {
      return d.deviceToken;
    });
    let driverDeviceTokens = getDriverData.map((d) => {
      return d.deviceToken;
    });

    let driverId = getDriverData.map((d) => {
      return d._id;
    });
    let userId = getUserData.map((d) => {
      return d._id;
    });
    let saveNotiFication = await db.saveData(Notification, {
      ...req.body,
      message: msg,
      driverId,
      userId,
    });
    let tokens = [...userDeviceTokens, ...driverDeviceTokens];
    sendNotification(tokens, dataToPush).then((resp) => {
      console.log(resp);
      return res
        .status(200)
        .send({
          message: "Notification sent to all Drivers and all Users",
          status: true,
          statusCode: 200,
          data: saveNotiFication,
        })
        .catch((err) => {
          console.log(err);
          return res.status(404).send({
            message: err,
            status: false,
            statusCode: 404,
          });
        });
    });
  } catch (err) {
    res.status(400).send({
      message: "Something went wrong",
      status: false,
      statusCode: 400,
    });
  }
};

"use strict";
const FCM = require("fcm-node");
let fcm = new FCM(
  "AAAAkY9In4c:APA91bGtQek3Oy0D6fJbHqYHI6a0GVEEkmTIPN7RnawMfi07osxoXa6Apy3yro1IZi_xuiPo2wXyqmn7rsuCAZ3H26dQHCPrDcVZrBpD0Lb3Tryu1EiasXZ4LZwmPgu8kFcL6BlbrEm9"
);

exports.sendNotification = async (deviceToken, dataToPush) => {
  try {
    let message = {
      to: deviceToken,
      collapse_key: "demo",
      notification: {
        title: dataToPush.title,
        body: dataToPush.msg,
        sound: "default",
        badge: 1,
        data: dataToPush,
      },
      priority: "high",
    };

    fcm.send(message, function (error, result) {
      console.log("message message  message  ", message);
      if (error) {
        console.log(
          error,
          "=========1111==========error========================="
        );
      } else {
        console.log(
          result,
          "===================result========================="
        );
      }
    });
  } catch (error) {
    throw error;
  }
};

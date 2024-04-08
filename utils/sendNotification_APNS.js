 var apns = require("apns"), options, connection, notification;
 
// options = {
//    keyFile : "conf/key.pem",
//    certFile : "conf/cert.pem",
//    debug : true
// };

exports.SendNotification = async (deviceToken,message,app) =>{
  var apnProvider = new apn.Provider({
      token : {
           key: apns.pB, // path to the key pB file
           keyId : 'SNYAQCEXW6', // its keys of pB file 
           teamId : 'WD65GBC4YP', //the team of ur ios dev acc.
    },
    production: false // set to true if sending  a noti. to a production ios App
  });
  var notification = new apn.Notification();

  notification.topic = app;

  //set  exp. to 1 hr from now (in case device is offline )
  notification.expiry = Math.floor(Date.now() /1000)+3600;

  //set app badge indicator
  notification.badge = 3;

  //play ping  aiff sound when the noti. is received
  notification.sound = 'ping.diff';

  //disp the following msg (the actual noti. text,support emoji)
  notification.alert = message;

  //send any extra payload data with the noti. which will be accessible to ur app did_Recieve_Remote_Noti
  notification.payload = {id:123}

  //actual send the noti.
  console.log(deviceToken)
  apnProvider.send(notification,deviceToken),then((response) =>{
      response.sent.forEach( (token) => {
          console.log("SendOK")
        //  notificationSent(user, token);
      });
      response.failed.forEach( (failure)=>{
          if(failure.error){
              //a transport-level error occured (eg. network prob.)
              console.log("Transport Error");
          }else{
              //
              //
              console.log(failure.status)
              console.log(failure.response)
          }
      })
  });
}
// connection = new apns.Connection(options);
 
// notification = new apns.Notification();
// notification.device = new apns.Device("iphone_token");
// notification.alert = "Hello World !";
 
// connection.sendNotification(notification);
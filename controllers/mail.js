const { UserRegister, DriverRegister } = require("../model");
const db = require("../services/dboperations");
const { sendMail } = require("../utils/sendMail");

exports.sendMailToUser = async (req, res) => {
  try {
    let { email, subject, text } = req.body;
    let findUser = await db.findOne(UserRegister, { email });
    if (!findUser)
      return res
        .status(404)
        .send({ message: "User not found", status: false, statusCode: 404 });

    await sendMail(email, subject, text)
      .then((resp) => {
        return res
          .status(200)
          .send({
            message: "Mail sent",
            status: true,
            statusCode: 200,
          });
      })
      .catch((err) =>
        res.status(404).send({ message: err, status: false, statusCode: 404 })
      );
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Something went wrong",
      status: false,
      statusCode: 400,
    });
  }
};

exports.sendMailToDriver = async (req, res) => {
  try {
    let { email, subject, text } = req.body;
    let findDriver = await db.findOne(DriverRegister, { email });
    if (!findDriver)
      return res
        .status(404)
        .send({ message: "Driver not found", status: false, statusCode: 404 });

    await sendMail(email, subject, text)
      .then((resp) => {
        return res
          .status(200)
          .send({
            message: "Mail sent ",
            status: true,
            statusCode: 200,
          });
      })
      .catch((err) =>
        res.status(404).send({ message: err, status: false, statusCode: 404 })
      );
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Something went wrong",
      status: false,
      statusCode: 400,
    });
  }
};

exports.sendMailToAllDriver = async (req, res) => {
  try {
    let { subject, text } = req.body;
    let findDriver = await db.getData(DriverRegister);

    if (!findDriver)
      return res
        .status(404)
        .send({ message: "Driver not found", status: false, statusCode: 404 });

    let emails = findDriver.map((e) => {
      return e.email;
    });

    sendMail(emails, subject, text)
      .then((resp) => {
       return res
         .status(200)
         .send({ message: "Mail sent to the all drivers", status: true, statusCode: 200 });

      })
      .catch((err) => 
        res
        .status(404)
        .send({ message: err, status: false, statusCode: 404 }))
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Something went wrong",
      status: false,
      statusCode: 400,
    });
  }
};

exports.sendMailToAllUser = async (req, res) => {
  try {
    let { subject, text } = req.body;
    let findUser = await db.getData(UserRegister);

    if (!findUser)
      return res
        .status(404)
        .send({ message: "User not found", status: false, statusCode: 404 });

    let emails = findUser.map((e) => {
      return e.email;
    });

    sendMail(emails, subject, text)
      .then((resp) => {
        return res
          .status(200)
          .send({
            message: "Mail sent to the all Users",
            status: true,
            statusCode: 200,
          });
      })
      .catch((err) =>
        res.status(404).send({ message: err, status: false, statusCode: 404 })
      );
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Something went wrong",
      status: false,
      statusCode: 400,
    });
  }
};

exports.sendMailToAllUserAndAllDriver = async (req, res) => {
  try {
    let { subject, text } = req.body;
    let findUser = await db.getData(UserRegister);
    let findDriver = await db.getData(DriverRegister);


    if (!findUser && !findDriver)
      return res
        .status(404)
        .send({ message: "Not found", status: false, statusCode: 404 });

    let userEmails = findUser.map((e) => {
      return e.email;
    });
  let driverEmails = findDriver.map((e) => {
    return e.email;
  });
  let emails = [...userEmails , ...driverEmails]
    sendMail(emails, subject, text)
      .then((resp) => {
        return res.status(200).send({
          message: "Mail sent to the all drivers and all users",
          status: true,
          statusCode: 200,
        });
      })
      .catch((err) =>
        res.status(404).send({ message: err, status: false, statusCode: 404 })
      );
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Something went wrong",
      status: false,
      statusCode: 400,
    });
  }
};
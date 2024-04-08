const express = require("express");
const app = express.Router();

const userRoutes = require("./user.routes");
const driverRoutes = require("./driver.routes");
const Dlicense = require("./dlicense.routes");
const personalRoutes = require("./personal.routes");
const ambulanceRoutes = require("./ambulance.routes");
const adminRoutes = require("./admin.routes");
const hospitalUserRoutes = require("./hospitalUser.routes");
const CardRoutes = require("./card.routes");
const CategoryRoutes = require("./category.routes");
const AboutUs = require("./AboutUs.routes")
const PaymentRoutes = require("./payment.routes");

app.use("/user", userRoutes);
app.use("/driver", driverRoutes);
app.use("/Dlicense", Dlicense);
app.use("/personal_Details", personalRoutes);
app.use("/ambulanceInfo", ambulanceRoutes);
app.use("/dashboard", adminRoutes);
app.use("/hospital", hospitalUserRoutes);
app.use("/card", CardRoutes);
app.use("/category", CategoryRoutes);
app.use("/application",AboutUs)
app.use("/payment", PaymentRoutes);

module.exports = app;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const cors = require("cors");
app.use(cors()); // ALLOW HTTP REQUESTS LOCAL HOSTS
const path = require("path");



const Admin = require('./models/Admin');
const db = require('./db/connection');


// ====================  RUN THE APP  ====================
const port = 80;



app.listen(port, "172.29.176.1" || "localhost" ,() => {

  console.log(`Listening to requests on http://localhost:${port}`);
});



// ====================  Required Module ====================
const Supplier = require("./routes/supplier");
const User = require("./routes/user");
const Meal = require("./routes/meal");
const Calendar = require("./routes/calendar");
const Store = require("./routes/store");
const Donation = require("./routes/donation");
const Payment = require("./routes/paymentCard");
const Order = require("./routes/order");
const performance = require("./routes/performance");
const Notification = require("./routes/notification");
const Reward = require("./routes/rewards");
const Rating= require("./routes/rating");




// ====================  API ROUTES [ ENDPOINTS ]  ====================
app.use("/supplier" , Supplier);
app.use("/user", User);
app.use("/meal", Meal);
app.use("/calendar", Calendar);
app.use("/store", Store);
app.use("/donation",Donation);
app.use("/paymentCard", Payment);
app.use("/order", Order);
app.use("/performance",performance);
app.use("/notification", Notification);
app.use('/rewards', Reward);
app.use('/rating', Rating);
app.use('/uploads',express.static(path.join(__dirname,'uploads')));













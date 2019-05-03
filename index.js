const express = require('express');
const mongoose = require('mongoose');
require('./model/availableBus');
require('./model/request');
require('./model/routes');
require('./model/busOnRoute');
require('./model/scheduledBus');
require('./model/loginTable');

const cors = require('cors')

mongoose.connect('mongodb+srv://kinsh:kinsh@cluster0-qqlnz.mongodb.net/test?retryWrites=true');
// const Sbus = mongoose.model("scheduledBus");
// Sbus.insertMany([{route: "r2", bus: ["b2"]}, {route: "r3", bus: ["b3"]}]).then(()=>console.log("inserted many"));
/*
const Routes = mongoose.model("routes");
const r1 = new Routes({
    route : "r1",
    start : "vaidehi",
    end : "majestic",
    stops : ["kundanahali", "hal"]
})
 r1.save().then(() => {
     console.log("saved")
 })
/*
 const Log = mongoose.model("login");
const r1 = new Log({
    username:"a",
    password:"c",
    service:"Admin"
})
 r1.save().then(() => {
     console.log("saved")
 })

Routes.deleteMany({}).then(()=>{
    console.log("yessssss")
})
*/
// const Request = mongoose.model('request');
// const r = new Request({
//     route: "r1",
//     req: 70
// })
// r.save().then(() => {
//     console.log("inserted")
// })
// const AvailableBus = mongoose.model('availableBus')
// // AvailableBus.deleteMany({}).then(res => console.log("deleted"))
// const a = new AvailableBus({
//     terminal: "kadugodi",
//     freeBus : ["a"]
// })
// a.save().then(() => {
//     console.log("inserted")
// })
// const BusOnRoute = mongoose.model('busOnRoute');
// BusOnRoute.deleteMany({}).then( res => console.log("deleted"))

const app = express();

app.use(cors()) 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/route1')(app);
require('./routes/dummy')(app);
require('./routes/stops')(app);
require('./routes/reached')(app);
require('./routes/busDriver')(app);
require('./routes/stopOperatorLogin')(app);
require('./routes/busDriverLogin')(app);
require('./routes/adminLogin')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

const mongoose = require('mongoose');
const { Schema } = mongoose;

const busOnRoute = new Schema(
    {   
        bus:String,
        stops: [String],
        route: String,
        onRouteTime: Date,
        filledSeats: Number
    }
);
mongoose.model('busOnRoute',busOnRoute);
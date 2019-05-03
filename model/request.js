const mongoose = require('mongoose');
const { Schema } = mongoose;

const requestSchema = new Schema(
    {   
        route : String,
        req : Number
    }
);
mongoose.model('request',requestSchema);    
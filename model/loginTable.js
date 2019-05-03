const mongoose = require('mongoose');
const { Schema } = mongoose;

const login = new Schema(
    {   
        username : String,
        service: String,
        password : String
    }
);
mongoose.model('login',login);
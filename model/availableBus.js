const mongoose = require('mongoose');
const { Schema } = mongoose;

const availableBusSchema = new Schema(
    {   
        terminal:String,
        freeBus: [String],
        
    }
);
mongoose.model('availableBus',availableBusSchema);
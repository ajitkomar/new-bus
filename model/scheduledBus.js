const mongoose = require('mongoose');
const { Schema } = mongoose;

const scheduledBusSchema = new Schema(
    {   
        route: String,
        bus: [String],
    }
);
mongoose.model('scheduledBus', scheduledBusSchema);
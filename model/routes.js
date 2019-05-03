const mongoose = require('mongoose');
const { Schema } = mongoose;

const routeSchema = new Schema(
    {
        route: String,
        start: String,
        end: String,
        stops: [String]
    }
);
mongoose.model('routes',routeSchema);
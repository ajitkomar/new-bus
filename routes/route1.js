const mongoose = require('mongoose');
const Routes = mongoose.model("routes");
const Sbus = mongoose.model("scheduledBus");
const Request = mongoose.model('request');
const BusOnRoute = mongoose.model('busOnRoute')

module.exports = (app) => {
    let maxSeats=60
    app.post('/api/stop', async (req, res) => {
        // console.log(busArray[0].stops[0].stop)


        const data = {
            src: req.body.data.src,
            dest: req.body.data.dest,
            route: req.body.data.route,
            ticketCount: req.body.data.ticketCount
        }

        console.log(data.ticketCount)

        await Routes.findOne({ route: data.route }).then(async (result) => {
            if (result.start === data.src) {
                console.log("it is a terminal")
                if (result.stops.includes(data.dest) === false && data.dest !== result.end) {
                    console.log("destination entered is not in this route")
                }
                await Request.findOneAndUpdate({ route: data.route }, { $inc: { "req": data.ticketCount } })
                    .then((result) => {
                        console.log("ticket print and requested for the bus")
                    })
            }

            if (result.stops.includes(data.src)) {
                console.log("it is a bus stop")
                if (result.stops.includes(data.dest) === false && data.dest !== result.end) {
                    console.log("destination entered is not in this route")
                }
                await BusOnRoute.findOne({$and : [{ $and: [{ route: data.route }, { stops: { "$in": [data.src] } }]},{filledSeats:{$lt:60}}] })
                    .then(async (result) => {
                        console.log(result.route)
                        if((result.filledSeats + data.ticketCount)<= maxSeats){
                            await BusOnRoute.findOneAndUpdate({route : result.route},{$inc : {"filledSeats" : data.ticketCount}}).then()
                            console.log("filled seats increased")
                        }
                        else
                        {
                            await Request.findOneAndUpdate({ route: result.route }, { $inc: { "req": data.ticketCount } })
                                                .then(async (result) => {
                                                    console.log( "request table updated")
                                }) 
                        }
                    })  
                } 
        res.end()
    });

})
}    
        
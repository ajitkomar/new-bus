const mongoose = require('mongoose');
const ScheduledBus = mongoose.model('scheduledBus')
const BusOnRoute = mongoose.model('busOnRoute')
const AvailableBus = mongoose.model('availableBus')

module.exports = (app) => {
   let busId = 'a' //String
   let routeNum 

    app.post('/busDrivers', async (req,res)=>{
        busId = "a"//req.body.data.busId
        console.log(busId)
    })
//runsin intervel
    app.get('/busDriver', (req,res) => {
       
        const check =async () => {
            console.log("addsasd")
        await ScheduledBus.findOne({ bus: { "$in": [busId] } }).then((result) => {
            if(result  || result!= null)
            {
                routeNum = result.route
                clearInterval(run)
                console.log("bus on route")
            }
        else{
                routeNum = "Your bus not yet scheduled"
            }
           console.log(routeNum)
       })

     }
     var run = setInterval(check, 5000);
        res.send(routeNum)
        
    })

    app.post('/busReached' , async(req,res) =>{
        let bus = req.body.data.busId
        let dest = req.body.data.dest
        let route = req.body.data.route
        await ScheduledBus.updateOne({route:route},{$pop : {bus: bus }}).then(async (result) => {
                console.log("available updated")
                await BusOnRoute.deleteOne({bus: bus}).then(async (result) => {
                    await AvailableBus.updateOne({terminal:dest},{$push : {freeBus:bus}}).then(() => {
                        
                    })
            })
        })
    })
}
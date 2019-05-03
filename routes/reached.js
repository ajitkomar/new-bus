const mongoose = require('mongoose')
const BusOnRoute = mongoose.model('busOnRoute')
module.exports = (app) => {
    app.post('/reached', async (req,res) => {
        
        const data = {
            bus:req.body.data.bus,
            route: req.body.data.route,
            src:req.body.data.src
        }
        console.log(data.bus)
        await BusOnRoute.update({bus:data.bus},{$pull: {stops:{$in : [data.src]}}}).then(result => console.log(result))
        res.end()
    })
}
const mongoose = require('mongoose');
const Request = mongoose.model('request');
const Routes = mongoose.model('routes')
const AvailableBus = mongoose.model('availableBus')
const ScheduledBus = mongoose.model('scheduledBus')
const BusOnRoute = mongoose.model('busOnRoute')


module.exports =  (app) => {
    app.post('/test', async (request,res)=> {
       let terminal = request.body.data.terminal
       console.log(terminal)
        let time = 3000  
        let interval = 3000
        let maxTime =12000
        let deleteRequest = Number
        let freeBus = String 
        let terminal_routes = []
       await Routes.find({start: terminal }).then((result) => {
                 result.forEach(element => {
                     terminal_routes.push(element.route)
                 });
        })
        console.log(terminal_routes)
        let requestThreshold=20
        let baseRequestThreshold=20
        let i;
        
        const check =async () => {
            
           
            for(i=0;i<terminal_routes.length;){
                console.log(i + " "+ time)
            await Request.findOne({route: terminal_routes[i]}).then(async (result)=> {
                deleteRequest = result.req
                console.log(deleteRequest+ " requests in route "+terminal_routes[i])
                if(deleteRequest >= requestThreshold){
                    await AvailableBus.findOne({terminal}).then(async (result) =>{
                        if(result.freeBus[0] !== undefined){
                            freeBus = result.freeBus[0]
                         console.log(result.freeBus[0]+" is free bus \n")   
                        await AvailableBus.updateOne( { terminal },
                             { $pop: { freeBus: -1 } } ).then(async (results) => {
                                 const toDelete = deleteRequest >= 50 ? deleteRequest-50 : 0
                                 await Request.updateOne({route:terminal_routes[i]}, {req : toDelete} ).then(async ()=>{
                                     console.log("request updated "+ toDelete)
                                    
                                     await ScheduledBus.updateOne({route:terminal_routes[i]}, {$push : {bus: freeBus}})
                                     .then(async () => {
                                        let dateTime=new Date()
                                        console.log("scheduled a bus\n")
                                        await Routes.findOne({route: terminal_routes[i] }).then(async (result) => {
    
                                            const newBus = new BusOnRoute({
                                                bus: freeBus,
                                                stops: result.stops,
                                                route: terminal_routes[i],
                                                onRouteTime: dateTime,
                                                filledSeats: toDelete
                                            })
                                            await newBus.save().then(() => {
                                                console.log("new Bus on route\n");
                                                i++
                                            })
                                            
                                        
                                        })
                                        
                                        
                                     })
                                 })
                                 
                             })
                    }
                    else {
                        console.log("bus not available\n")
                        i++
                    }
                })

                }
                else {
                    console.log("request not fullfilled " + deleteRequest+ "\n")
                    i++
            }
                
            })
            

        }
            clearInterval(run)
            time = time + interval
            if (time < maxTime){
                 requestThreshold = requestThreshold + 10
            }

            if( time == maxTime){
                requestThreshold = 0
            }
            if (time > maxTime) {
                time = interval
                requestThreshold = baseRequestThreshold

            }
            run = setInterval(check, time)

        }
        var run = setInterval(check, time);
        console.log("__________*__________")
         res.end("aa")
    })
}
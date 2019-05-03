const mongoose = require('mongoose')
const Login = mongoose.model('login')
const Route = mongoose.model('routes')

module.exports = (app) => {
    app.post('/login', (req,res) => {
        // res.writeHead(200,{
        //     Connection: 'keep-alive',
        //     'Content-Type': 'text/event-stream',
        //     'Cache-Control': 'no-cache'
        // })
        
        // setTimeout(()=>res.write(`data: This is data`),1000)
        let dataToSend = {
            check: Boolean,
            routes:[]
        }
         user = req.body.data.user
         password =req.body.data.password
        await Login.findOne({$and: [{username:user},{password:password}]}).then(async (result) => {
            console.log(result.username,result.password)
            if(user === result.username && password === result.password )
            {
                dataToSend.check = true
                src = req.body.data.stop

                await Route.find({stops:{$in:{src}}}).then((res)=>{
                    res.forEach(element => {
                        dataToSend.push(element.route)
                    });
                })
                console.log("Login done!!" + dataToSend.routes)
            }
            else dataToSend.check = false
        })

        res.send(dataToSend)
    })
}
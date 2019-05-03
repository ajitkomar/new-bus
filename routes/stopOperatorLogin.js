const mongoose = require('mongoose')
const Login = mongoose.model('login')
const Route = mongoose.model('routes')
module.exports = (app) => {
    let source
    app.post('/stopOperatorLogin', async (req,res) => {
        
        const data = {
            username:req.body.data.userName,
            password: req.body.data.password,
            source:req.body.data.source,
            loginSuccess:false
        }

        source = data.source

        await Login.findOne({$and: [{username:data.username},{password:data.password}]}).then(async (result) => {
            console.log(result.username,result.password,result.service)
            if(data.username === result.username && data.password === result.password && result.service === "StopOperator")
            {
                data.loginSuccess=true;
            }

        })
        
        res.send(data)
    })

    

    app.post('/getStopDetails', async (req,res) => {

        
        res.send()
    })
}
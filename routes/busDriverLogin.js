const mongoose = require('mongoose')
const Login = mongoose.model('login')
module.exports = (app) => {
    app.post('/busDriverLogin', async (req,res) => {
        
        const data = {
            username:req.body.data.userName,
            password: req.body.data.password,
            loginSuccess:false,
            busId:req.body.data.busId
        }
        
        await Login.findOne({$and: [{username:data.username},{password:data.password}]}).then(async (result) => {
            console.log(result.username,result.password,result.service)
            if(data.username === result.username && data.password === result.password && result.service === "BusDriver")
            {
                data.loginSuccess=true
            }
        })
        console.log(data.username,data.password,data.busId,data.loginSuccess)
        res.send(data)
    })
}
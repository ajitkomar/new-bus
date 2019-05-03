const mongoose = require('mongoose')
const Login = mongoose.model('login')
module.exports = (app) => {
    app.post('/adminLogin', async (req,res) => {
        
        const data = {
            username:req.body.data.userName,
            password: req.body.data.password,
            loginSuccess:false,
            terminal:req.body.data.terminal
        }
        await Login.findOne({$and: [{username:data.username},{password:data.password}]}).then(async (result) => {
            console.log(result.username,result.password,result.service)
            if(data.username === result.username && data.password === result.password && result.service == "Admin")
            {
                data.loginSuccess=true
            }
        })
        console.log(data.username,data.password,data.terminal,data.loginSuccess)
        res.send(data)
    })
}
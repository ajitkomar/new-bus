import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Landing from './Landing';
import BusOperator from './BusOperator';
import Terminal from './Terminal';

export default class Login extends React.Component {
  state = {
        userName : '',
        password : '',
        source : '',
        busId: '',
        time: Date.now(),
        recievedArray: [],
        loginSuccess:false,
        service:'',
        terminal:''
      }
      constructor(props){
        super(props);
        
        this.state = {
            loginSuccess:false
        }
      }
      handleTerminal = event => {
        this.setState({
            terminal: event.target.value
        });
    }
    handleChangePassword = event => {
        this.setState({
            password: event.target.value
        });
    }
    handleChangeUsername = event => {
        this.setState({
            userName: event.target.value
        });
    }
    handleChangeSource = event => {
        this.setState({
            source: event.target.value
        });
    }
    handleChangeBusid = event => {
        this.setState({
            busId: event.target.value
        })
    }
    handleSubmitStopOperator = async event => {
        event.preventDefault();
        
        const data = {
          userName: this.state.userName,
          password : this.state.password,
          source: this.state.source,
          
        };
        console.log(data);
        await axios.post(`http://localhost:5000/stopOperatorLogin`, { data })
          .then(async res => {
            console.log(res.data);
            if(res.data.loginSuccess){
            this.setState({loginSuccess:true,
                service:"StopOperator"})
            document.getElementById("stopOperatorLoginForm")
            }
          })
      }
      handleSubmitBusDriver = async event => {
        event.preventDefault();
        const data = {
          userName: this.state.userName,
          password : this.state.password,
          busId: this.state.busId,
        };
        console.log(data);
        await axios.post(`http://localhost:5000/busDriverLogin`, { data })
          .then( async res => {
              console.log(res.data.loginSuccess)
              if(res.data.loginSuccess){
            this.setState({loginSuccess:true,
                service: "BusDriver"})
                console.log(res.data);
                await axios.post(`http://localhost:5000/busDrivers`, { data })
                .then( async res => {})
              }
          })
      }

      handleAdmin = async event => {
        event.preventDefault();
        const data = {
          userName: this.state.userName,
          password : this.state.password,
          terminal: this.state.terminal
        };
        console.log(data)
        await axios.post(`http://localhost:5000/adminLogin`, { data })
          .then( async res => {
              console.log(res.data.loginSuccess)
              if(res.data.loginSuccess){
                this.setState({loginSuccess:true,
                service: "Admin"})
                console.log(res.data);
                axios.post(`http://localhost:5000/test`, { data }).then()
              }
          })
      }

    render() {
        return (
            <Router>
                <Route path="" render={()=>{
                    if(!this.state.loginSuccess){
                        return(
                            <div>
                                <div>
                            <form id="stopOperatorLoginForm" onSubmit={this.handleSubmitStopOperator}>
                                <label>
                                    Username:
                    <input type="text" name="userName" onChange={this.handleChangeUsername} />
                                </label>
                                <label>
                                    Password:
                        <input type="text" name="password" onChange={this.handleChangePassword} />
                                </label>
                                <label>
                                    Source:
                    <input type="text" name="source" onChange={this.handleChangeSource} />
                                </label>
                                <button type="submit">Login</button>
                            </form>
                        </div>
            
                            <hr></hr>
            
                            <div>
                                <form id="busDriverLoginForm" onSubmit={this.handleSubmitBusDriver}>
                                    <label>
                                        Username:
                        <input type="text" name="userName2" onChange={this.handleChangeUsername} />
                                    </label>
                                    <label>
                                        Password:
                    <input type="text" name="password2" onChange={this.handleChangePassword} />
                                    </label>
                                    <label>
                                        Bus ID:
                        <input type="text" name="busId" onChange={this.handleChangeBusid} />
                                    </label>
                                    <button type="submit" >Login</button>
                                </form>
                            </div>

                            <hr></hr>
            
                            <div>
                                <form id="busDriverLoginForm" onSubmit={this.handleAdmin}>
                                    <label>
                                        Username:
                                    <input type="text" name="userName3" onChange={this.handleChangeUsername} />
                                    </label>
                                    <label>
                                        Password:
                                     <input type="text" name="password3" onChange={this.handleChangePassword} />
                                    </label>
                                    <label>
                                       Terminal
                                    <input type="text" name="terminal" onChange={this.handleTerminal} />
                                    </label>
                                    <button type="submit" >Login</button>
                                </form>
                            </div>
                        </div>
                            )
                        }
                        else{
                            if(this.state.service === "StopOperator" && this.state.loginSuccess === true)
                            {
                                return(
                                <Landing></Landing>
                                )
                            }
                            if(this.state.service === "BusDriver" && this.state.loginSuccess === true)
                            {
                                return(
                                    <BusOperator></BusOperator>
                                )
                            }
                            if(this.state.service === "BusDriver" && this.state.loginSuccess === true)
                            {
                                return(
                                    <Terminal></Terminal>
                                )
                            }
                        }
                    }} />
            
                </Router>
           
        )
      
    }
}
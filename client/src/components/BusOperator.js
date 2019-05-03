import React from 'react';
import axios from 'axios';
export default class BusOperator extends React.Component {
    componentDidMount(){
      let busId
      let route
        // const evtSource = new EventSource("http://localhost:5000/busDriver")
        // evtSource.onmessage = function(e){
        //     console.log(e.data)
        axios.get(`http://localhost:5000/busDriver`)
      .then(res => { 
        route = "r1"//res.body.routNum
        console.log("res.body.routNum");
      })   
    }
    render() {
        return (
          <div>
            <div>this from Bus Operator</div>
            <div> <p> Your bus ADD res.body.routeNum </p></div>
          </div>
        )
    }
}
// import React from 'react';
// const Landing = () => {
//     return (
//         <div style = { { textAlign:"center"} }>
//             <h1> Bus </h1>
            
//         </div>
//     )
// }
// export default Landing;
import React from 'react';
import axios from 'axios';


export default class Landing extends React.Component {
  state = {
    dest : '',
    src : 'hopefarm',
    route: '',
    ticketCount: Number,
    time: Date.now(),
    r:["r2","r3"],
    s: "hopefarm",
    recievedArray: []
  }
  
  componentDidMount() {
    
    const data = {
   
      src : this.state.s,
      route: this.state.r
    };
    setInterval(async() => {
      console.log("check");
      await axios.post(`http://localhost:5000/stops`, {data})
      .then(res => {
        this.setState({recievedArray:res.data})
        console.log(res.data);
      })
    }, 2000);
  }

 
  // constructor(props){
  //   super(props)

  //   this.state = {
  //     src:this.props.source
  //   }
  // }

  handleChangeDest = event => {
    this.setState({ 
      dest: event.target.value
     });
  }
  // handleChangeSrc = event => {
  //   this.setState({ 
     
  //     src: event.target.value
     
  //    });
  //}
  handleChangeRoute = event => {
    this.setState({ 
      
      route: event.target.value
     });
  }
  handleChangeTicketCount = event => {
    this.setState({
      ticketCount: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault();

    const data = {
      dest: this.state.dest,
      src : this.state.src,
      route: this.state.route,
      ticketCount: this.state.ticketCount
    };

    await axios.post(`http://localhost:5000/api/stop`, { data })
      .then(res => {
        console.log(res.data);
       // document.getElementById("myForm").reset()
      })
  }
  
  onPress = async event => {
    event.preventDefault();
    console.log(event.target.name)
    console.log(event.target.value)
    const data = {
      bus: event.target.name,
      route: event.target.value,
      src: this.state.s
    }
    await axios.post('http://localhost:5000/reached', {data}).then(res => {
      console.log(res.data)

    })
    
  }
  renderButtons() {
    return this.state.recievedArray.map((item, i) => {
        return (
          <li key = {i}><button 
                
          onClick={this.onPress.bind(this)}
          key = {i}
          name = {item.bus}
          value = {item.route}
      >
          {item.bus} in {item.route}
      </button></li>
            
        );
    });
}

  render() {
    return (
      <div>
        <form id="myForm" onSubmit={this.handleSubmit}>
         <label>
          Source name: hopefarm
        </label> 
          <label>
            Destination Name:
            <input type="text" name="dest" onChange={this.handleChangeDest} />
          </label>
          <label>
          No. of Tickets
          <input type="text" name="ticketCount" onChange={this.handleChangeTicketCount} />
        </label>
        
        <label>
        Route:
        <input type="text" name="route" onChange={this.handleChangeRoute} />
      </label>
      <button type="submit">Submit</button>
      <ul>{this.renderButtons()}</ul> 
        </form>
      </div>
    )
  }
}
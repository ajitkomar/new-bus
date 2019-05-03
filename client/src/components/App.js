// import React, { Component } from 'react';
// import Landing from './Landing';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <Landing />
//       </div>
//     );
//   }
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Landing from './Landing';
import BusOperator from './BusOperator';
import Login from './login';


class App extends React.Component{
   
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Route exact path=""  render={()=>{
                            return(<Login></Login>)
                        }} />
                        <Route exact path="/landing"  render={()=>{
                           return( <Landing></Landing>)
                        }} />
                         <Route exact path="/busDriver"  render={()=>{
                           return( <BusOperator></BusOperator>)
                        }} />
                    </div>
                </Router>
            </div>
        );
    };
}

export default App;     //actions are connected to App component as props
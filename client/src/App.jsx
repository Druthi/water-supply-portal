import React, { Component} from "react";
import Visualisation from './components/Visualisation.jsx';

class App extends Component{
  render(){
    return(
      <div className="App">
        <h1>Water Supply in Shanthi Nagar</h1>
        <Visualisation />
      </div>
    );
  }
}

export default App;
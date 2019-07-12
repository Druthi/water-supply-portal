import React, { Component} from "react";
import axios from 'axios';

const get_data_url = 'http://localhost:3000/connections';
class Visualisation extends Component{
  constructor(props){
    super(props);
    this.state = {
      connections:{}
    }
  }

  componentDidMount(){
    axios({
      method: 'get',
      url: get_data_url,
    })
      .then((response) => {
        this.setState({
          connections:response.data
        });
      });
  }

  render(){
    return(
      <div className="Visualisation">
        <h1>Visualisation</h1>
      </div>
    );
  }
}

export default Visualisation;
import React, { Component} from "react";
import Visualisation from './components/Visualisation.jsx';
import axios from 'axios';
import Select from 'react-select';
import _ from 'lodash';

const get_data_url = 'http://localhost:3000/connections';
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      connections:[],
      selected_option:null,
      options:[],
      all_connections:[],
      frequencies:[],
      parameters:['No supply', 'Contaminated', 'Low Pressure', 'Drainage Issue']
    }
    this.handleChange = this.handleChange.bind(this);
    this.getFrequencies = this.getFrequencies.bind(this);
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
  }

  componentDidMount(){
    axios({
      method: 'get',
      url: get_data_url,
    })
      .then((response) => {
        let street_names = _.uniqBy(response.data, 'street_name').map((street) => {return {value:street.street_name, label:street.street_name}});
        let frequencies = this.getFrequencies(response.data);
        this.setState({
          connections:response.data,
          all_connections:response.data,
          options:street_names,
          frequencies
        });
      });
  }
  showTooltip(d){
    let frequencies = _.clone(this.state.frequencies);
    frequencies[d.index].show_tooltip = true;
    this.setState({
      frequencies
    });
  }

  hideTooltip(d){
    let frequencies = _.clone(this.state.frequencies);
    frequencies[d.index].show_tooltip = false;
    this.setState({
      frequencies
    });
  }

  getFrequencies(connections){
    let  parameters  = this.state.parameters;
    let data = [];
    parameters.forEach((param) => {
      let frequency = _.filter(connections, (connection) => {
        if(param === 'No Supply'){
          return connection.water_quality === 'No Supply'
        }else if(param === 'Contaminated'){
          return connection.water_quality === 'Contaminated'
        }else if(param === 'Low Pressure'){
          return connection.pressure === 'Low'
        }else{
          return connection.drainage_issue === 'Yes'
        }
      }).length;
      data.push({frequency, param, show_tooltip:false});
    });
    return data;
  }
  handleChange(selected_option) {
    let street_names = _.map(selected_option, (o) =>{return o.label});
    let connections = _.filter(this.state.all_connections, (con) => {
      return _.includes(street_names, con.street_name);
    });
    connections = connections.length?connections:this.state.all_connections;
    let frequencies = this.getFrequencies(connections);
    this.setState({ selected_option, connections, frequencies });
  };
  render(){
    return(
      <div className="App">
        <h1>Water Supply in Shanthi Nagar</h1>
        <Select
        value={this.state.selected_option}
        isMulti
        onChange={this.handleChange}
        options={this.state.options}
      />
        <Visualisation parameters={this.state.parameters} showTooltip={this.showTooltip} hideTooltip={this.hideTooltip} frequencies={this.state.frequencies} connections={this.state.connections}/>
      </div>
    );
  }
}

export default App;
import React, { Component} from "react";
import Visualisation from './components/Visualisation.jsx';
import axios from 'axios';
import Select from 'react-select';
import _ from 'lodash';
import styled from 'styled-components';
import { CSVLink } from "react-csv";

const get_data_url = 'http://localhost:3000';

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      csv:'',
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
    this.downloadCsv = this.downloadCsv.bind(this);
  }

  componentDidMount(){
    axios({
      method: 'get',
      url: `${get_data_url}/connections`,
    })
      .then((response) => {
        let street_names = _.uniqBy(response.data, 'street_name').map((street) => {return {value:street.street_name, label:street.street_name}});
        let frequencies = this.getFrequencies(response.data);
        let csv = this.downloadCsv(response.data);
        this.setState({
          connections:response.data,
          all_connections:response.data,
          options:street_names,
          frequencies,
          csv
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
    let csv = this.downloadCsv(connections);
    this.setState({ selected_option, connections, frequencies, csv });
  }

  downloadCsv(connections){
    let data = [];
    let headers = Object.keys(connections[0]);
    headers.shift();
    data.push(headers);
    connections.forEach((obj, i) => {
      let values = Object.values(obj);
      values.shift();
      values[0] = i+1;
      data.push(values);
    });
    return data;
  }

  render(){
    return(
      <div className="App">
        <h1>Water Supply in Shanthi Nagar</h1>
        <MainContainer>
          <VisualisationContainer className='visualisation_component'>
            <Filters>
            <CSV>
          <CSVLink
            data={this.state.csv}
          >
          Download CSV
          </CSVLink>
        </CSV>

              <FilterLabel>Filter by street name</FilterLabel>
              <MultiSelect>
                <Select
                  value={this.state.selected_option}
                  isMulti
                  onChange={this.handleChange}
                  options={this.state.options}
                />
              </MultiSelect>
            </Filters>
            <Visualisation
              parameters={this.state.parameters}
              showTooltip={this.showTooltip}
              hideTooltip= {this.hideTooltip}
              frequencies={this.state.frequencies}
              connections={this.state.connections}
            />
          </VisualisationContainer>
        </MainContainer>
      </div>
    );
  }
}

export default App;

const VisualisationContainer = styled.div`
  display:flex;
  justify-content: space-between;
  background: white;
`;

const MultiSelect = styled.div`
  width: 60%;
  margin-left: 14%;
`;

const MainContainer = styled.div`
  padding: 2%;
  background: #e5e5e5;
`;

const FilterLabel = styled.p`
  padding-top: 7%;
  padding-left: 14%;
`;

const Filters = styled.div`
  display:flex;
  flex-direction:column;
  width: 42%;
`;

const CSV = styled.div`
  margin-top: 4%;
  margin-left: 14%;
`;

import React, { Component} from "react";
import axios from 'axios';
import XAxis from './XAxis.jsx';
import YAxis from './YAxis.jsx';
import Bar from './Bar.jsx';
import _ from 'lodash';
const mainWidth = 700;
const mainHeight = 500;
const get_data_url = 'http://localhost:3000/connections';

const barGraphStyles = {
  margin:'auto',
  display:'block'
}

class Visualisation extends Component{
  constructor(props){
    super(props);
    this.state = {
      connections:[],
      frequencies:[],
      parameters:['No supply', 'Contaminated', 'Low Pressure', 'Drainage Issue']
  }
    this.getFrequencies = this.getFrequencies.bind(this);
  }

  componentDidMount(){
    axios({
      method: 'get',
      url: get_data_url,
    })
      .then((response) => {
        let frequencies = this.getFrequencies(response.data);
        this.setState({
          connections:response.data,
          frequencies
        });
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
      data.push({frequency, param});
    });
    return data;
  }


  render(){
    let data = this.state.connections;
    let frequencies = this.state.frequencies;

    let margin = {top: 20, right: 20, bottom: 30, left: 45},
      width = mainWidth - margin.left - margin.right,
      height = mainHeight - margin.top - margin.bottom;

    let parameters = this.state.parameters;

    let ticks = d3.range(0, width, (width / parameters.length));
    let x = d3.scaleOrdinal()
      .domain(parameters)
      .range(ticks)

    let y = d3.scaleLinear()
      .domain([0, data.length])
      .range([height, 0])

    let bars = [];
    let bottom = 450;

    frequencies.forEach((datum, index) => {
      bars.push(<Bar key={index} x={x(datum.param)} y={bottom - 6 - (height - y(datum.frequency))} width={50} height={height - y(datum.frequency)} />)
    });
    return(
      <svg style={barGraphStyles} width={mainWidth} height={mainHeight}>
         	<YAxis y={40} labels={y.ticks().reverse()} start={15} end={height} />
           <g className="chart" transform={`translate(${margin.left},${margin.top})`}>
	         { bars }
	         <XAxis x={ bottom } labels={parameters} start={0} end={width} />
	      </g>
      </svg>
    );
  }
}

export default Visualisation;
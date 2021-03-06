import React, { Component} from "react";
import XAxis from './XAxis.jsx';
import YAxis from './YAxis.jsx';
import Bar from './Bar.jsx';
import Tooltip from './Tooltip.jsx';
import _ from 'lodash';
import styled from 'styled-components';

const mainWidth = 700;
const mainHeight = 500;

class Visualisation extends Component{
  constructor(props){
    super(props);
    this.mouseOverEventTrigger = this.mouseOverEventTrigger.bind(this);
  }

  componentDidUpdate(){
    this.mouseOverEventTrigger(this.props.frequencies);
  }

  mouseOverEventTrigger(frequencies){
    frequencies.forEach((d, index) => {
      d3.select(`#bar_${index}`)
      .datum({d, index})
      .on("mouseover", this.props.showTooltip)
      .on("mouseout", this.props.hideTooltip);
    })
  }

  render(){
    let data = this.props.connections;
    let frequencies = this.props.frequencies;
    let margin = {top: 20, right: 20, bottom: 30, left: 45},
      width = mainWidth - margin.left - margin.right,
      height = mainHeight - margin.top - margin.bottom;

    let parameters = this.props.parameters;

    let ticks = d3.range(0, width, (width / parameters.length));
    let x = d3.scaleOrdinal()
      .domain(parameters)
      .range(ticks)

    let y = d3.scaleLinear()
      .domain([0, Math.max(data.length, 8)])
      .range([height, 0]);
    let bars = [];
    let bottom = 450;

    frequencies.forEach((datum, index) => {
      bars.push(<Bar index={index} key={index} x={x(datum.param)} y={bottom - 6 - (height - y(datum.frequency))} width={50} height={height - y(datum.frequency)} />)
    });
    let tooltips = frequencies.map((datum, index) => {
      return <Tooltip index={index} display={datum.show_tooltip?'':'none'} frequency={datum.frequency} key={index} x={x(datum.param) + 30} y={bottom - 6 - (height - y(datum.frequency))}/>
    })
    return(
      <svg width={mainWidth} height={mainHeight}>
          <YAxisText x='200' y='0'>No. of connections</YAxisText>
         	<YAxis y={40} labels={y.ticks().reverse()} start={15} end={height} />
           <g className="chart" transform={`translate(${margin.left},${margin.top})`}>
	         { bars }
	         <XAxis x={ bottom } labels={parameters} start={0} end={width} />
	      </g>
        {tooltips}
        <ConnectionsNumber x='650' y='50'>Total number of connections: {data.length}</ConnectionsNumber>
      </svg>
    );
  }
}

export default Visualisation;

const ConnectionsNumber = styled.text`
  font-size: 1.0em;
  fill: black;
  text-anchor: end;
`;

const YAxisText = styled.text`
  color:black;
  transform: rotate(90deg);
`;
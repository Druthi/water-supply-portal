import React, { Component} from "react";

class XAxis extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let style = {
      stroke: "black",
      strokeWidth: "1px"
    }

    let step = (this.props.start + this.props.end / this.props.labels.length);
    let ticks = d3.range(this.props.start, this.props.end, step);
    let lines = [];
    ticks.forEach((tick, index) => {
      lines.push(<line key={index} style={style} x1={tick + 25 } y1={this.props.x} x2={tick + 25} y2={this.props.x + 4}  />)
    });

    let columnLables = [];
    ticks.forEach((tick, index) => {
      columnLables.push(<text key={index} style={{fill: "black"}} x={tick + 5} y={this.props.x + 20} >{this.props.labels[index]}</text>)
    });

    return(
      <g>
	      <line x1={this.props.start} y1={this.props.x } x2={this.props.end} y2={this.props.x} style={ style } />
	      { columnLables }
	      { lines }
      </g>
    )
  }
}

export default XAxis;
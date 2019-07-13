import React, { Component} from "react";

class Bar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let style = {
      fill: "steelblue"
    };
    return(
      <g>
	      <rect className="bar" style={style} x={this.props.x} y={this.props.y + 5} width={this.props.width} height={this.props.height} />
      </g>
    )
  }
}

export default Bar;
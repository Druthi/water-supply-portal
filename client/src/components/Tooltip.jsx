import React, { Component} from "react";

class Tooltip extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let style = {
      strokeWidth:'1px',
      display:this.props.display
    };
    let textStyle = {
      fontSize: '20px',
      fill: 'white',
      textAnchor: 'end',
      fontWeight: '500'
    };
    return(
      <g id={`tooltip_${this.props.index}`}>
	      <rect className="tooltip" style={style} rx="2" ry="2" x={this.props.x} y={this.props.y} width="80" height="40" />
        <text style={ textStyle } x={this.props.x + 50} y={this.props.y + 25}  >{this.props.frequency}</text>
      </g>
    )
  }
}

export default Tooltip;
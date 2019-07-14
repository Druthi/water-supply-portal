import React, { Component} from "react";
import styled from 'styled-components';


class Bar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let style = {
      fill: "steelblue"
    };
    return(
      <g id={`bar_${this.props.index}`}>
	      <rect className="bar" style={style} x={this.props.x} y={this.props.y + 5} width={this.props.width} height={this.props.height} />
      </g>
    )
  }
}

export default Bar;

const Rect = styled.rect`
  transition: height 2s;
`;
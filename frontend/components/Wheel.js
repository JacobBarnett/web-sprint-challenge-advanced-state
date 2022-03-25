import React from "react";
import * as actionCreators from "../state/action-creators";
import { connect } from "react-redux";

export function Wheel({ moveClockwise, moveCounterClockwise, wheel }) {
  const cogs = [];

  for (let i = 0; i <= 5; i++) {
    const isActive = wheel === i;
    if (isActive) {
      cogs.push(
        <div key={i} className="cog active" style={{ "--i": i }}>
          B
        </div>
      );
    } else {
      cogs.push(<div key={i} className="cog" style={{ "--i": i }}></div>);
    }
  }

  return (
    <div id="wrapper">
      <div id="wheel">{cogs}</div>
      <div id="keypad">
        <button onClick={moveCounterClockwise} id="counterClockwiseBtn">
          Counter clockwise
        </button>
        <button onClick={moveClockwise} id="clockwiseBtn">
          Clockwise
        </button>
      </div>
    </div>
  );
}

export default connect((st) => st, actionCreators)(Wheel);

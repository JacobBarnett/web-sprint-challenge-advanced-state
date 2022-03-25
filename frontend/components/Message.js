import React from "react";
import { connect } from "react-redux";
export function Message({ infoMessage }) {
  return <div id="message">{infoMessage}</div>;
}

export default connect((st) => st, {})(Message);

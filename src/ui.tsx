import React from "react";
import ReactDOM from "react-dom";

import { App } from "./components/App";
import "./styles/styles.scss";

const UI = () => {
  return <App />;
};

ReactDOM.render(<UI />, document.getElementById("root"));

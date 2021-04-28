import React from "react";
import ReactDOM from "react-dom";

import { App } from "./components/App";
import "./styles/styles.scss";
import { usePluginData } from "./hooks/";

const UI = () => {
  const [pluginData] = usePluginData();
  return <App pluginData={pluginData} />;
};

ReactDOM.render(<UI />, document.getElementById("root"));

import { useState, useEffect } from "react";
import * as messages from "./../messages";

export const usePluginData = () => {
  const [pluginData, setPluginData] = useState(null);
  useEffect(() => {
    const handler = event => {
      if (
        event &&
        event.data &&
        event.data.pluginMessage &&
        messages.UPDATE_PLUGIN_DATA === event.data.pluginMessage.type
      ) {
        setPluginData(event.data.pluginMessage.data);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);
  return [pluginData];
};

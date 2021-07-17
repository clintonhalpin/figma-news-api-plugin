import { PluginDataManager } from "./pluginData";
import * as messages from "./messages";

function main() {
  figma.showUI(__html__, { width: 420, height: 550 });
  const pluginData = new PluginDataManager(figma);
  figma.ui.onmessage = msg => {
    console.log("msg");
    /**
     * Save apiKey
     */
    if (messages.SAVE_AUTH === msg.type) {
      console.log("plugin.ts", msg);
      let body = JSON.parse(msg.payload);
      pluginData.updateLocalDataField("apiKey", body.apiKey);
    }
  };
}

main();

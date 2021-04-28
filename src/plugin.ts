import { PluginDataManager } from "./pluginData";

function main() {
  figma.showUI(__html__, { width: 420, height: 550 });
  const pluginData = new PluginDataManager(figma);
  figma.ui.onmessage = msg => {
    console.log("msg");
  };
}

main();

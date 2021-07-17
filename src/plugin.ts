import { PluginDataManager } from "./pluginData";
import * as messages from "./messages";
import { NYTArticleSearchApi } from "./interfaces";

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

    /**
     * Fill Results
     */
    if (messages.FILL_RESULTS === msg.type) {
      let body = JSON.parse(msg.payload);
      fillArticles(body);
    }
  };
}

/**
 * fillArticles
 * @param data NYTArticleSearchApi
 */
async function fillArticles(data) {
  const articles = data.response.response.docs;
  try {
    let nodes = figma.currentPage.selection;

    if (nodes.length === 0) {
      alert("No Layers Selected!");
      return;
    }

    let matchingNodes = [];
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      if (shouldReplaceText(node)) {
        matchingNodes.push([node, articles[i]]);
      }
      // @ts-ignore
      if (node.children) {
        // @ts-ignore
        let children = loopChildNodes(node.children, articles[i]);
        if (children.length) {
          matchingNodes = [...matchingNodes, ...children];
        }
      }
    }

    if (matchingNodes.length === 0) {
      alert(
        'No values to replace, please rename your layers starting with a "#", ex. #title.text'
      );
    }

    /**
     * It seems the fastest in Figma to Seperate these actions
     */
    for (let i = 0; i < matchingNodes.length; i++) {
      let node = matchingNodes[i][0];
      let row = matchingNodes[i][1];
      let value = gatherValue(node.name, row);
      replaceText(node, value);
    }
    return;
  } catch (e) {
    console.log(e);
    return true;
  }
}

/**
 * shouldReplaceText
 * @param node FigmaNode
 */
function shouldReplaceText(node) {
  return node.name.includes("#");
}

/**
 * gatherValue
 * - Given a string ex. "#headline.main" or #keywords[0].value and object (DocsEntity) we match it the value from the object
 * - supporting dot and bracket notation
 * @param name
 * @param row
 * @returns
 */
const gatherValue = (name, row) =>
  name
    .replace("#", "")
    .split(".")
    .reduce(function(obj, prop) {
      if (prop.includes("[") && prop.includes("]")) {
        prop = prop.replace("[").replace("]");
      }
      return obj && obj[prop] ? obj[prop] : "--";
    }, row);

/**
 * replaceText
 * - Changing text in figma requires that we "load" all of the fonts
 * - Function handles case where you have multiple fonts loaded in a text layer
 * @param node
 * @param content
 */
async function replaceText(node, content) {
  /**
   * Load ALL fonts in the text
   */
  let len = node.characters.length;
  for (let i = 0; i < len; i++) {
    await figma.loadFontAsync(node.getRangeFontName(i, i + 1));
  }
  /**
   * Once fonts are loaded we can change the text
   */
  node.characters = String(content);
}

/**
 * loopChildNodes
 * - Recursively loop and find all matching notes
 * @param nodes
 * @param row
 */
function loopChildNodes(nodes, row) {
  let matches = [];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (shouldReplaceText(node)) {
      matches.push([node, row]);
    }
    if (node.children) {
      const nextMatches = loopChildNodes(node.children, row);
      matches = [...matches, ...nextMatches];
    }
  }
  return matches;
}

main();

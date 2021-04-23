import { UPDATE_PLUGIN_DATA } from "./messages";
const DATA_KEY = "FIGMA_NEWS_APP";

const DATA_STRUCTURE = {
  local: {},
  document: {}
};

export class PluginDataManager {
  data: object;
  figma: PluginAPI;

  constructor(figma: PluginAPI) {
    this.data = DATA_STRUCTURE;
    this.figma = figma;

    this.fetchAndSyncDocumentData();
    this.fetchAndSyncLocalData().then(() => {
      this.updatePluginDataToUI();
    });
  }

  private updatePluginDataToUI() {
    this.figma.ui.postMessage({
      type: UPDATE_PLUGIN_DATA,
      data: this.data
    });
  }

  // Data stored globally across *all* Figma documents
  // in user's local storage

  async updateLocalDataField(name: string, value: string) {
    this.data["local"][name] = value;
    return this.saveLocalData();
  }

  async fetchAndSyncLocalData() {
    return figma.clientStorage.getAsync(DATA_KEY).then(fetched_data => {
      if (fetched_data) {
        this.data["local"] = JSON.parse(fetched_data);
      }
    });
  }

  async saveLocalData() {
    let json_serialized_data = JSON.stringify(this.data["local"]);
    return this.figma.clientStorage
      .setAsync(DATA_KEY, json_serialized_data)
      .then(event => {
        this.updatePluginDataToUI();
      });
  }

  async clearLocalDataField() {
    this.data["local"] = {};
    this.saveLocalData();
  }

  // Data stored in the currently open document

  updateDocumentDataField(name: string, value: string) {
    this.data["document"][name] = value;
    return this.saveDocumentData();
  }

  fetchAndSyncDocumentData() {
    if (this.figma.currentPage!.parent!.type === "DOCUMENT") {
      let fetched_data = this.figma.currentPage!.parent!.getPluginData(
        DATA_KEY
      );
      if (fetched_data) {
        this.data["document"] = JSON.parse(fetched_data);
      }
      return true;
    } else {
      return false;
    }
  }

  saveDocumentData() {
    let json_serialized_data = JSON.stringify(this.data["document"]);
    if (this.figma.currentPage!.parent!.type == "DOCUMENT") {
      this.figma.currentPage!.parent!.setPluginData(
        DATA_KEY,
        json_serialized_data
      );
      this.updatePluginDataToUI();
      return true;
    } else {
      return false;
    }
  }
}

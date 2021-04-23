function main() {
  figma.showUI(__html__, { width: 420, height: 550 });
  figma.ui.onmessage = msg => {
    console.log("msg");
  };
}

main();

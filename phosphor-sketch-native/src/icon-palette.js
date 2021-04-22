import BrowserWindow from "sketch-module-web-view";
import { getWebview } from "sketch-module-web-view/remote";
import UI from "sketch/ui";
import DOM from "sketch/dom";

const webviewIdentifier = "phosphor-icons.webview";

export default function (ctx) {
  const options = {
    identifier: webviewIdentifier,
    width: 362,
    height: 500,
    show: false,
    alwaysOnTop: true,
  };

  const browserWindow = new BrowserWindow(options);
  browserWindow.loadURL("http://localhost:3001");

  // only show the window when the page has loaded to avoid a white flash
  browserWindow.once("ready-to-show", () => {
    browserWindow.show();
  });

  const webContents = browserWindow.webContents;

  // print a message when the page loads
  webContents.on("did-finish-load", () => {
    UI.message("Welcome to Phosphor ☺️");
  });

  // add a handler for a call from web content's javascript
  webContents.on("changeSystemTheme", (s) => {
    const isDarkMode = s === "true";
    UI.message(isDarkMode ? "Paint it black 🖤" : "Paint it white 🤍");
  });

  webContents.on("insertIcon", (messageString) => {
    const { name, svg } = JSON.parse(messageString);
    const svgString = NSString.stringWithString(svg);
    const svgData = svgString.dataUsingEncoding(NSUTF8StringEncoding);

    const doc = DOM.getSelectedDocument();
    const svgImporter = MSSVGImporter.svgImporter();
    svgImporter.prepareToImportFromData(svgData);
    const svgLayer = svgImporter.importAsLayer();
    svgLayer.setName(name);
    ctx.document.currentPage().addLayers([svgLayer]);

    const layer = doc.getLayersNamed(name).pop();
    const canvasView = ctx.document.contentDrawView();
    const center = canvasView.viewCenterInAbsoluteCoordinatesForViewPort(
      canvasView.viewPort()
    );

    const frame = new DOM.Rectangle(layer.frame);
    frame.x = center.x;
    frame.y = center.y;
    layer.frame = frame;

    UI.message(`Inserted ${name}`);
  });
}

// When the plugin is shutdown by Sketch (for example when the user disable the plugin)
// we need to close the webview if it's open
export function onShutdown() {
  const existingWebview = getWebview(webviewIdentifier);
  if (existingWebview) {
    existingWebview.close();
  }
}

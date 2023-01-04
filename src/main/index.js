import {
  app,
  shell,
  BrowserWindow,
  Tray,
  Menu,
  nativeImage,
  globalShortcut,
} from "electron";
import { join } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";

let mainWindow, tray;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 80,
    frame: false,
    transparent: true,
    resizable: false,
    show: false,
    autoHideMenuBar: true,
    skipTaskbar: true,
    ...(process.platform === "linux"
      ? {
          icon: join(__dirname, "../../build/icon.png"),
        }
      : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  mainWindow.webContents.on("new-window", function (e, url) {
    e.preventDefault();
    require("electron").shell.openExternal(url);
  });

  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
    mainWindow.openDevTools();
  } else {
    mainWindow.on("blur", () => mainWindow.hide());
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }
}

app.whenReady().then(() => {
  const icon = nativeImage.createFromPath(
    join(__dirname, "../../build/icon.png")
  );
  tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    { label: "Show", click: () => mainWindow.show() },
    { label: "Exit", click: () => app.quit() },
  ]);

  tray.setToolTip("This is my application");
  tray.setTitle("This is my title");
  tray.setContextMenu(contextMenu);

  electronApp.setAppUserModelId("com.electron");

  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  globalShortcut.register("CommandOrControl+Space", () => {
    mainWindow.show();
  });

  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

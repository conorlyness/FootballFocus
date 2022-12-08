const { app, BrowserWindow } = require("electron");

async function createWindow() {
  win = new BrowserWindow({
    show: false,
    icon: "./src/assets/app-logo.ico",
    webPreferences: {
      webSecurity: false,
    },
  });
  win.removeMenu();
  win.maximize();
  win.loadFile("./dist/football-focus-app/index.html");
}

app.whenReady().then(() => {
  createWindow();
});

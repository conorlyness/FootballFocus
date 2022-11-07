const { app, BrowserWindow } = require("electron");

async function createWindow() {
  win = new BrowserWindow({
    show: false,
    icon: "./src/assets/football.ico",
    webPreferences: {
      webSecurity: false,
    },
  });
  win.maximize();
  win.loadFile("./dist/football-focus-app/index.html");
}

app.whenReady().then(() => {
  createWindow();
});

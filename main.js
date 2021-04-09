const path = require('path');
const url = require('url');
const {app, BrowserWindow} = require('electron');
const fs = require('fs');
const puppeteer = require('puppeteer');
require('@electron/remote/main').initialize()

let win;

function createWindow() {
  process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
  const {
    width,
    height
  } = require("electron").screen.getPrimaryDisplay().workAreaSize;
  // Create the browser window.


  win = new BrowserWindow({

    // minWidth: 1200,
    // minHeight: 700,
    width: 800,
    height: 500,
    minWidth: 800,
    minHeight: 500,
    maxWidth: width,
    maxHeight: height,
    frame: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    icon: "./build/icon.ico"
  });




  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

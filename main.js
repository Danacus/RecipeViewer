'use strict'

const electron = require('electron');
const ipcMain = electron.ipcMain;

const app = electron.app
const BrowserWindow = electron.BrowserWindow
const cp = require('child_process');

var windows = {};
var children = {};

if (process.env.NODE_ENV === "development") {
  require('electron-debug')();
}

var mainWindow = null;

app.on('ready', function() {
  var mainScreen = electron.screen.getPrimaryDisplay();

  mainWindow = new BrowserWindow({
    width: mainScreen.size.width,
    height: mainScreen.size.height
  });

  mainWindow.maximize();
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.on('closed', function() {
    mainWindow = null
  });
})

ipcMain.on('start', (event, data) => {
  var child = cp.fork(__dirname + '/output/worker-bundle.js');
  child.send(data);
  child.on('message', (data) => {
    mainWindow.webContents.send(data.type, data);
    child.kill();
  });
});

ipcMain.on('response', (event, data) => {
  if (windows[event.sender.id] != null) {
    mainWindow.webContents.send(data.type, data);
    windows[event.sender.id].close();
    windows[event.sender.id] = null;
  }
});


'use strict'

const electron = require('electron')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

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

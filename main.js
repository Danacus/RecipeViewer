'use strict'

const electron = require('electron');
const ipcMain = electron.ipcMain;

const app = electron.app
const BrowserWindow = electron.BrowserWindow

var windows = {}

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
  const win = new BrowserWindow({
		show: false
	});

  win.loadURL('file://' + __dirname + '/app/worker/index.html');
  windows[win.webContents.id] = win;
  win.webContents.on('did-finish-load', () => {
    win.webContents.send(data.type, data);
  })
});

ipcMain.on('response', (event, data) => {
  if (windows[event.sender.id] != null) {
    mainWindow.webContents.send(data.type, data);
    windows[event.sender.id].close();
    windows[event.sender.id] = null;
  }
});


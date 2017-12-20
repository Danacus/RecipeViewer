/**
 * Created by eatong on 17-3-14.
 */
const electron = require('electron');
const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const nodeEnv = process.env.NODE_ENV;


app.on('ready', () => {

  if (nodeEnv === 'development') {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
  }
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  console.log(nodeEnv);
  if (win === null) {
    createWindow();
  }
});

function createWindow() {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
  const win = new BrowserWindow({width, height, icon: path.join(__dirname, '/build/icon.ico')});

  win.loadURL(url.format({
    pathname: path.join(path.resolve(__dirname, './'), 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
}

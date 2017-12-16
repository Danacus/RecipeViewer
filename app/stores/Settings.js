// @flow

import { observable, computed } from "mobx";
import jetpack from 'fs-jetpack';
import electron from 'electron';
const app = electron.remote.app;

type SettingsType = {
  path: string
}

export default class Settings {
  @observable settings: SettingsType;

  constructor() {

  }

  loadSettings(): Promise<any> {
    return new Promise((resolve, reject) => {
      let file = app.getPath('userData') + "/settings.json";
      if (jetpack.exists(file) !== "file") {
        electron.remote.dialog.showOpenDialog({title: "Select minecraft instance folder", properties: ['openDirectory']}, filePaths => {
          jetpack.file(file, {content: {path: filePaths[0]}})
          this.readFile(file).then(settings => resolve(settings));
        })
      } else {
        this.readFile(file).then(settings => resolve(settings));
      }
    })
  }

  readFile(path: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jetpack.readAsync(path, 'json').then(settings => {
        this.settings = settings;
        resolve(settings);
      })
    })
  }

  @computed get list(): SettingsType {
    return this.settings;
  }
}
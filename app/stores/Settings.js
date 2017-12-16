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
        resolve(null);
      } else {
        this.readFile(file).then(settings => resolve(settings));
      }
    })
  }

  readFile(path: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jetpack.readAsync(path, 'json').then(settings => {
        if (settings.path) {
          jetpack.existsAsync(settings.path + '/config/jeiexporter/exports').then(result => {
            if (result == 'dir') {
              this.settings = settings;
              resolve(settings);
            } else {
              resolve(null);
            }
          });
        } else {
          resolve(null);
        }   
      })
    })
  }

  setSettings(settings: SettingsType) {
    this.settings = settings;
  }

  saveSettings() {
    let file = app.getPath('userData') + "/settings.json";
    jetpack.writeAsync(file, this.settings);
  }

  @computed get list(): SettingsType {
    return this.settings;
  }
}
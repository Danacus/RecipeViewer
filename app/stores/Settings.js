// @flow

import { observable, computed } from "mobx";
import jetpack from 'fs-jetpack';
import electron from 'electron';
import Networks from "./Networks";
import { stores } from "../App";
const app = electron.remote.app;

export default class Settings {
  @observable settings: Object;

  loadSettings(): Promise<any> {
    return new Promise((resolve, reject) => {
      let file = app.getPath('userData') + "/settings.json";
      if (jetpack.exists(file) !== "file") {
        this.settings = {profiles: [], selectedProfile: 0};
        resolve(null);
      } else {
        this.readFile(file).then(settings => resolve(settings));
      }
    })
  }

  readFile(path: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jetpack.readAsync(path, 'json').then(settings => {
        this.settings = {profiles: settings.profiles.map(profile => ({name: profile.name, path: profile.path, networks: new Networks().deserialize(profile.networks)})), selectedProfile: settings.selectedProfile};
        this.settings.profiles.forEach(profile => {
          console.log(profile)
          profile.networks.list.forEach(network => {
            network.recipes = stores.recipes;
          })
        })
        resolve(this);
      })
    })
  }

  selectProfile(index: number) {
    this.settings.selectedProfile = index;
    this.saveSettings();
  }

  setSettings(settings: Object) {
    this.settings = settings;
    this.saveSettings();
  }

  changeSettings(func: (settings: Object) => mixed) {
    func(this.settings);
    this.saveSettings();
  }

  getCurrentProfile(): Object {
    return this.settings.profiles[this.settings.selectedProfile];
  }

  saveSettings() {
    let file = app.getPath('userData') + "/settings.json";
    return jetpack.writeAsync(file, {profiles: this.settings.profiles.map(profile => ({name: profile.name, path: profile.path, networks: profile.networks.serialize()})), selectedProfile: this.settings.selectedProfile});
  }

  @computed get list(): Object {
    return this.settings;
  }
}
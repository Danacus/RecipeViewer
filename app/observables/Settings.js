// @flow

import jetpack from 'fs-jetpack';
import electron from 'electron';
import Networks from "./Networks";
import { observable, computed, action } from 'mobx';
import Profile from '../observables/Profile';
const app = electron.remote.app;

export default class Settings {
  @observable.shallow profiles: Profile[];
  @observable selectedProfile: number;
  @observable isLoading: boolean = false;
  tasksSet: Set<string> = new Set();
  @observable tasks: Array<string> = [];

  @action loadSettings(): Promise<any> {
    this.isLoading = true;
    return new Promise((resolve, reject) => {
      let file = app.getPath('userData') + "/settings.json";
      if (jetpack.exists(file) !== "file") {
        this.profiles = [];
        this.selectedProfile = 0;
        this.isLoading = false;
        resolve();
      } else {
        this.readFile(file).then(settings => resolve());
      }
    });
  }

  readFile(path: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jetpack.readAsync(path, 'json').then(settings => {
        this.profiles = settings.profiles.map(profile => {
          return new Profile(profile.name, profile.path, new Networks().deserialize(profile.networks))
        })
        this.selectedProfile = settings.selectedProfile;
        this.isLoading = false;
        resolve();
      });
    });
  }

  @action addTask(task: string) {
    this.tasksSet.add(task)
    this.tasks = [...this.tasksSet];
  }

  @action removeTask(task: string) {
    this.tasksSet.delete(task);
    this.tasks = [...this.tasksSet];
  }

  @action setProfiles(profiles: Profile[]) {
    this.profiles = profiles;
  }

  @action addProfile(profile: Profile) {
    this.profiles.push(profile);
  }

  @action selectProfile(index: number) {
    this.isLoading = true;
    return this.getProfile(index).initialize().then(() => {
      this.isLoading = false;
      this.selectedProfile = index; 
      return;
    }).then(this.saveSettings.bind(this));
  }

  getCurrentProfile(): Profile {
    return this.profiles[this.selectedProfile];
  }

  getProfile(index: number): Profile {
    return this.profiles[index];
  }

  saveSettings() {
    console.log('start saving');
    let file = app.getPath('userData') + "/settings.json";
    return jetpack.writeAsync(file, {profiles: this.profiles.map(profile => ({name: profile.name, path: profile.path, networks: profile.networks.serialize()})), selectedProfile: this.selectedProfile}).then(console.log('end saving'));
  }
}
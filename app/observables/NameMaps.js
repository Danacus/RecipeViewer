// @flow

import { observable, computed, action } from "mobx";
import jetpack from 'fs-jetpack';
import { store } from "../App";
import Stack from "../api/Stack";
import Profile from "../observables/Profile";
import { ipcRenderer } from "electron";

export default class NameMaps {
  titles: Object;
  filteredTitles: Object;
  mods: Object;

  loadAll(profile: Profile): Promise<any> {
    return new Promise((resolve, reject) => {
      store.addTask(`Loading maps`);

      ipcRenderer.send('start', {
        type: 'maploader',
        recipes: store.getCurrentProfile().recipes.serialize(),
        modlist: profile.path + "/config/jeiexporter/exports/modList.json",
        tooltipMap: profile.path + "/config/jeiexporter/exports/tooltipMap.json"
      });

      ipcRenderer.on('maploader-response', (event, data) => {  
        this.titles = data.tooltipMap;
        this.filteredTitles = data.filteredMap;
        this.mods = data.modlist;
        store.removeTask(`Loading maps`);
        ipcRenderer.removeAllListeners('maploader-response');
        resolve();
      });
    });
  }
}

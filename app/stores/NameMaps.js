// @flow

import { observable, computed, action } from "mobx";
import jetpack from 'fs-jetpack';

export default class NameMaps {
  @observable titles: {};
  @observable mods: {};

  @computed get list(): {} {
    return this.titles;
  }

  @action loadTooltipMap(gamePath: string): Promise<any> {
    let file = gamePath + "/config/jeiexporter/exports/tooltipMap.json";
    return jetpack.readAsync(file, 'json').then(file => this.titles = file);
  }

  @action loadModlist(gamePath: string): Promise<any> {
    let file = gamePath + "/config/jeiexporter/exports/modList.json";
    return jetpack.readAsync(file, 'json').then(file => this.mods = file);
  }

  @action loadAll(gamePath: string): Promise<any> {
    return Promise.all([
      this.loadTooltipMap(gamePath),
      this.loadModlist(gamePath)
    ])
  }
}
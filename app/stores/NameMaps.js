// @flow

import { observable, computed, action } from "mobx";
import jetpack from 'fs-jetpack';
import { store } from "../App";
import Stack from "../classes/Stack";
import Profile from "../classes/Profile";

export default class NameMaps {
  @observable titles: {};
  @observable mods: {};

  @computed get list(): {} {
    return this.titles;
  }

  @action loadTooltipMap(profile: Profile): Promise<any> {
    let file = profile.path + "/config/jeiexporter/exports/tooltipMap.json";
    return jetpack.readAsync(file, 'json').then(file => 
      this.titles = file
    );
  }

  @action loadModlist(profile: Profile): Promise<any> {
    let file = profile.path + "/config/jeiexporter/exports/modList.json";
    return jetpack.readAsync(file, 'json').then(file => this.mods = file);
  }

  @action loadAll(profile: Profile): Promise<any> {
    return Promise.all([
      this.loadTooltipMap(profile),
      this.loadModlist(profile)
    ])
  }
}
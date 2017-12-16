// @flow

import { observable, computed } from "mobx";
import jetpack from 'fs-jetpack';

export default class NameMaps {
  @observable titles: {};

  @computed get list(): {} {
    return this.titles;
  }

  loadTooltipMap(gamePath: string): Promise<any> {
    let file = gamePath + "/config/jeiexporter/exports/tooltipMap.json";
    return jetpack.readAsync(file, 'json').then(file => {console.log(file); this.titles = file});
  }
}
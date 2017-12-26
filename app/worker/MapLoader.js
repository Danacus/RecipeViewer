// @flow

import jetpack from 'fs-jetpack';
import Stack from "../api/Stack";
import Recipes from '../api/Recipes';

export default class MapLoader {
  titles: Object;
  filteredTitles: Object;
  mods: Object;

  loadTooltipMap(path: string, recipes: Recipes): Promise<any> {
    return jetpack.readAsync(path, 'json').then(file => {this.filteredTitles = reduceTooltipMap(file, recipes); this.titles = file; return;});
  }

  loadModlist(path: string): Promise<any> {
    return jetpack.readAsync(path, 'json').then(file => this.mods = file);
  }

  loadAll(tooltipMapPath: string, modListPath: string, recipes: Recipes): Promise<any> {
    return Promise.all([
      this.loadTooltipMap(tooltipMapPath, recipes),
      this.loadModlist(modListPath)
    ])
  }
}

const reduceTooltipMap = (map, recipes) => {
  let valid = [];
  recipes.recipes.forEach(recipe => recipe.outputs.forEach(output => output.names.forEach(name => {
    if (!valid.includes(name)) {
      valid.push(name)
    }
  })));

  return Object.entries(map).reduce((total, current) => {
    if (valid.includes(current[0])) {
      total[current[0]] = current[1];
    } 
    return total;
  }, {});

  /*return Object.entries(map).reduce((total, current) => {
    if (recipes.recipes.some(recipe => recipe.outputs.some(output => output.names.some(name => name == current[0])))) {
      total[current[0]] = current[1];
    } 
    return total;
  }, {})*/
}
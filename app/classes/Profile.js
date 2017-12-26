import Recipes from "../stores/Recipes";
import Networks from "../stores/Networks";
import NameMaps from "../stores/NameMaps";
import { action, observable } from "mobx";

export default class Profile {
  @observable name: string;
  @observable path: string;
  @observable networks: Networks;
  recipes: Recipes;
  nameMaps: NameMaps;
  @observable isLoaded: boolean;

  constructor(name: string, path: string, networks: Networks) {
    this.name = name;
    this.path = path;
    this.networks = networks;
    this.recipes = new Recipes();
    this.nameMaps = new NameMaps();
    this.isLoaded = false;
  }

  @action initialize() {
    if (this.isLoaded) {
      return new Promise(resolve => resolve());
    } else {
      return this.reload();
    } 
  }

  @action reload() {
    return this.recipes.loadRecipes(this.path).then(() => 
      this.nameMaps.loadAll(this)
    ).then(() => {
      this.networks.list.forEach(network => {
        network.recipes = this.recipes;
      });
      this.isLoaded = true;
      return;
    });
  }
}
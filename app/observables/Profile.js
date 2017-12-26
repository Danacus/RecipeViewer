import Networks from "../observables/Networks";
import NameMaps from "../observables/NameMaps";
import { observable } from "mobx";
import RecipeStore from "./RecipeStore";

export default class Profile {
  @observable name: string;
  @observable path: string;
  @observable.shallow networks: Networks;
  recipes: RecipeStore;
  nameMaps: NameMaps;
  @observable isLoaded: boolean;

  constructor(name: string, path: string, networks: Networks) {
    this.name = name;
    this.path = path;
    this.networks = networks;
    this.recipes = new RecipeStore();
    this.nameMaps = new NameMaps();
    this.isLoaded = false;
  }

  initialize() {
    if (this.isLoaded) {
      return new Promise(resolve => resolve());
    } else {
      return this.reload();
    } 
  }

  reload() {
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
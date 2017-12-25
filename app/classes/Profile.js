import Recipes from "../stores/Recipes";
import Networks from "../stores/Networks";
import NameMaps from "../stores/NameMaps";

export default class Profile {
  name: string;
  path: string;
  networks: Networks;
  recipes: Recipes;
  nameMaps: NameMaps;

  constructor(name: string, path: string, networks: Networks) {
    this.name = name;
    this.path = path;
    this.networks = networks;
    this.recipes = new Recipes();
    this.nameMaps = new NameMaps();
  }

  initialize() {
    return Promise.all([
      this.recipes.loadRecipes(this.path),
      this.nameMaps.loadAll(this.path)
    ]).then(() => {
      this.networks.list.forEach(network => {
        network.recipes = this.recipes;
      })
      return;
    });
  }
}
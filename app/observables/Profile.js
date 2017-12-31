// @flow

import Networks from "../observables/Networks";
import NameMaps from "../observables/NameMaps";
import { observable } from "mobx";
import RecipeStore from "./RecipeStore";
import jetpack from 'fs-jetpack';
import { evaluate, transpile } from "../crafttweaker/zenscript/SimpleTranspiler";

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

  initialize(): Promise<any> {
    if (this.isLoaded) {
      return new Promise(resolve => resolve());
    } else {
      return this.reload();
    } 
  }

  reload(): Promise<any> {
    return this.recipes.loadRecipes(this.path).then(() => 
      this.nameMaps.loadAll(this)
    ).then(() => {
      console.log(this.recipes.recipes.length);
      this.reloadCraftTweaker().then(() => {
        console.log('Updating recipes');
        console.log(this.recipes.recipes.length);
        this.networks.list.forEach(network => {
          network.recipes = this.recipes;
        });
      });
      this.isLoaded = true;
      return;
    });
  }

  reloadCraftTweaker(): Promise<any> {
    return jetpack.findAsync(this.path + '/scripts/', { matching: '*.zs' }).then(files => {
      files.map(f => {
        let file = jetpack.read(f)
        evaluate(transpile(file));
      });
    });
  }
}
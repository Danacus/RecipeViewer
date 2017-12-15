import { observable } from "mobx";
import Recipe from "../classes/Recipe";

export default class Recipes {
  @observable recipes: Recipe[] = []

  constructor(recipes: Recipe[]) {
    this.recipes = recipes;
  }

  @computed get list(): Recipe[] {
    return this.recipes;
  }
}
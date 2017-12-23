// @flow

import Recipe from "./Recipe";
import Stack from "./Stack";
import { observable, action } from "mobx";
import FilterItem from "./FilterItem";

export default class Filter {
  @observable items: FilterItem[];
  @observable catalysts: FilterItem[];
  @observable mods: FilterItem[];

  @observable lists: Array<FilterItem[]>;

  constructor() {
    this.lists = [
      [],
      [],
      []
    ];
  }

  serialize(): Object {
    return {
      lists: this.lists.map(list => list.map(item => item.serialize()))
    }
  }

  deserialize(data: Object) {
    if (data.lists) {
      this.lists = data.lists.map(list => list.map(item => new FilterItem('').deserialize(item)));
    }
    return this;
  }

  list(name: string): number {
    switch (name) {
      case 'items':
        return 0;
      case 'catalysts':
        return 1;
      case 'mods':
        return 2;
      default: 
        return 0;
    }
  }

  @action setList(list: number, newList: FilterItem[]) {
    this.lists[list] = newList;
  }

  @action add(list: number, item: FilterItem) {
    this.lists[list].push(item);
  }

  @action remove(list: number, item: FilterItem) {
    this.lists[list] = this.lists[list].filter(i => i.value != item.value);
  }

  @action toggleInverse(list: number, item: FilterItem) {
    this.lists[list].filter(i => i.value == item.value).forEach(i => {
      console.log('toggle')
      i.inverse = !i.inverse;
    });
  }

  recipeFilter(recipe: Recipe): boolean {
    return (recipe.catalysts.some(catalyst => this.lists[1].some(listed => listed.matchesStack(catalyst))) || this.lists[1].length == 0)
      && recipe.inputs.every(input => this.stackFilter(input))
      && recipe.outputs.every(output => this.stackFilter(output));
  }

  stackFilter(stack: Stack): boolean {
    return (this.lists[2].some(listed => stack.getMods().some(mod => listed.matches(mod))) || this.lists[2].length == 0)
      && (this.lists[0].some(listed => listed.matchesStack(stack)) || this.lists[0].length == 0);
  }
}
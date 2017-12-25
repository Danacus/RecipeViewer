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
      i.inverse = !i.inverse;
    });
  }

  recipeFilter(recipe: Recipe): boolean {
    return recipe.catalysts.some(cat => this.itemMatch(1, cat) && this.modMatch(cat))
    // And every input matches the filter
    && recipe.inputs.every(input => this.stackFilter(input))
    // Same for outputs
    && recipe.outputs.every(output => this.stackFilter(output));
  }

  stackFilter(stack: Stack): boolean {
    return this.itemMatch(0, stack) && this.modMatch(stack);
  }

  itemMatch(index: number, stack: Stack): boolean {
    return ((
      // The stack is explicitly whitelisted or the whitelist is empty
      (stack.names.some(name => this.lists[index].filter(i => !i.inverse).some(listed => listed.value == name)) || this.lists[index].filter(i => !i.inverse).length == 0)
      // And no name of the stack is blacklisted
      && !stack.names.some(name => this.lists[index].filter(i => i.inverse).some(listed => listed.value == name))
    ) || this.lists[index].length == 0);
  }

  modMatch(stack: Stack): boolean {
    return ((
      // And one of the mods of the stack is whitelisted or the whitelist is empty
      (stack.getMods().some(mod => this.lists[2].filter(i => !i.inverse).some(listed => listed.value == mod)) || this.lists[2].filter(i => !i.inverse).length == 0)
      // And not every mod is blacklisted
      && (!stack.getMods().every(mod => this.lists[2].filter(i => i.inverse).some(listed => listed.value == mod)) || this.lists[2].filter(i => i.inverse).length == 0)
    ) || this.lists[2].length == 0 || stack.getMods().length == 0);
  }
}
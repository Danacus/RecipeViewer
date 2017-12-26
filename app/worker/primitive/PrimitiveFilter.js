// @flow

import PrimitiveRecipe from "./PrimitiveRecipe";
import PrimitiveStack from "./PrimitiveStack";
import PrimitiveFilterItem from "./PrimitiveFilterItem";

export default class PrimitiveFilter {
  lists: Array<PrimitiveFilterItem[]> = [
    [],
    [],
    [],
    []
  ];

  serialize(): Object {
    return {
      lists: this.lists.map(list => list.map(item => item.serialize()))
    }
  }

  deserialize(data: Object) {
    if (data.lists) {
      this.lists = data.lists.map(list => list.map(item => new PrimitiveFilterItem('').deserialize(item)));
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
      case 'categories':
        return 3;
      default: 
        return 0;
    }
  }

  recipeFilter(recipe: PrimitiveRecipe): boolean {
    return recipe.catalysts.some(cat => this.itemMatch(1, cat) && this.modMatch(cat))
    // And every input matches the filter
    && recipe.inputs.every(input => this.stackFilter(input))
    // Same for outputs
    && recipe.outputs.every(output => this.stackFilter(output))
    // And the category is whitelisted or the whitelist is empty
    && (this.lists[3].filter(i => !i.inverse).some(listed => listed.value == recipe.category) || this.lists[3].filter(i => !i.inverse).length == 0)
    // And the category is not blacklisted
    && !this.lists[3].filter(i => i.inverse).some(listed => listed.value == recipe.category)
  }

  stackFilter(stack: PrimitiveStack): boolean {
    return this.itemMatch(0, stack) && this.modMatch(stack);
  }

  itemMatch(index: number, stack: PrimitiveStack): boolean {
    return ((
      // The stack is explicitly whitelisted or the whitelist is empty
      (stack.names.some(name => this.lists[index].filter(i => !i.inverse).some(listed => listed.value == name)) || this.lists[index].filter(i => !i.inverse).length == 0)
      // And no name of the stack is blacklisted
      && !stack.names.some(name => this.lists[index].filter(i => i.inverse).some(listed => listed.value == name))
    ) || this.lists[index].length == 0);
  }

  modMatch(stack: PrimitiveStack): boolean {
    return ((
      // And one of the mods of the stack is whitelisted or the whitelist is empty
      (stack.getMods().some(mod => this.lists[2].filter(i => !i.inverse).some(listed => listed.value == mod)) || this.lists[2].filter(i => !i.inverse).length == 0)
      // And not every mod is blacklisted
      && (!stack.getMods().every(mod => this.lists[2].filter(i => i.inverse).some(listed => listed.value == mod)) || this.lists[2].filter(i => i.inverse).length == 0)
    ) || this.lists[2].length == 0 || stack.getMods().length == 0);
  }
}
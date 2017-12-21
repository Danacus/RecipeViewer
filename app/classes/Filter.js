// @flow

import Recipe from "./Recipe";
import Stack from "./Stack";
import { observable, action } from "mobx";

export default class Filter {
  @observable blacklist: RegExp[];
  @observable whitelist: RegExp[];

  constructor(blacklist: RegExp[], whitelist: RegExp[]) {
    this.blacklist = blacklist;
    this.whitelist = whitelist;
  }

  serialize(): Object {
    return {
      blacklist: this.blacklist.map(item => item.source),
      whitelist: this.whitelist.map(item => item.source)
    }
  }

  @action setWhitelist(whitelist: RegExp[]) {
    this.whitelist = whitelist;
  }

  @action setBlacklist(blacklist: RegExp[]) {
    this.blacklist = blacklist;
  }

  @action addWhitelistItem(item: RegExp) {
    this.whitelist.push(item);
  }

  @action addBlacklistItem(item: RegExp) {
    this.blacklist.push(item);
  }

  @action removeWhitelistItem(item: string) {
    this.whitelist = this.whitelist.filter(i => i.source != item && i.toString() != item);
  }

  @action removeBlacklistItem(item: string) {
    this.blacklist = this.blacklist.filter(i => i.source != item && i.toString() != item);
  }
  
  deserialize(data: Object) {
    this.blacklist = data.blacklist.map(item => new RegExp(item, "i"));
    this.whitelist = data.whitelist.map(item => new RegExp(item, "i"));
    return this;
  }

  recipeFilter(recipe: Recipe): boolean {
    return !recipe.isBlacklisted(this.blacklist) && recipe.isWhitelisted(this.whitelist);
  }

  stackFilter(stack: Stack): boolean {
    return !stack.isBlacklisted(this.blacklist) && (stack.isWhitelisted(this.whitelist) || this.whitelist.length == 0);
  }
}
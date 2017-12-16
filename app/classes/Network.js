// @flow

import {observable, action, computed, toJS} from 'mobx';
import Stack from './Stack';
import uuidv4 from 'uuid/v4';
import INetworkAlgorithm from './NetworkAlgorithm/INetworkAlgorithm';
import Node from './Node';
import vis from 'vis';
import Recipes from '../stores/Recipes';
import { stores } from '../App';
import { NetworkAlgorithms } from './NetworkAlgorithm/NetworkAlgorithms';

export default class Network {
  @observable target: Stack;
  id: string;
  nodes: Node[];
  visNodes: vis.DataSet;
  visEdges: vis.DataSet;
  visOptions: {};
  @observable whitelist: RegExp[];
  @observable blacklist: RegExp[];
  algorithm: INetworkAlgorithm;
  algorithmInstance: INetworkAlgorithm;
  recipes: Recipes;
  visNetwork: vis.Network;

  constructor(target: Stack) {
    this.target = target;
    this.id = uuidv4();
    this.whitelist = [];
    this.blacklist = [];
    this.setAlgorithm(NetworkAlgorithms[0]);
  }

  setVisOptions(visOptions: {}) {
    this.visOptions = visOptions;
  }

  generate() {
    this.algorithmInstance = new this.algorithm({target: this.target, recipes: this.recipes, limit: 500, depth: 2, whitelist: this.whitelist, blacklist: this.blacklist});
    this.nodes = this.algorithmInstance.generateNetwork(); 
  }

  visReload() {
    this.nodes.forEach(node => {
      //console.log(node);
      if (node.stack.names.length > 0)
        node.setImage(`file://${stores.settings.list.path}/config/jeiexporter/items/${node.stack.names[0].replace(/:/g, "_")}.png`)
    })
    let visNodes = this.nodes.map(node => ({id: node.id, image: node.image}));
    let visEdges = [];

    this.nodes.forEach(node => {
      node.getParents().forEach(parent => {
        visEdges.push({from: node.id, to: parent.id});
      })
    })

    this.visNodes = new vis.DataSet(visNodes);
    this.visEdges = new vis.DataSet(visEdges);

    let container = document.getElementById(this.id);
    this.visNetwork = new vis.Network(container, {nodes: this.visNodes, edges: this.visEdges}, this.visOptions);
  }

  setRecipes(recipes: Recipes) {
    this.recipes = recipes;
  }

  setAlgorithm(algorithm: number) {
    this.algorithm = NetworkAlgorithms[algorithm];
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
    this.whitelist = this.whitelist.filter(i => i.toString() != item);
  }

  @action removeBlacklistItem(item: string) {
    this.blacklist = this.blacklist.filter(i => i.toString() != item);
  }

  @action setTarget(target: string) {
    this.target = new Stack([target]);
  }

  @computed get getTarget(): string {
    return this.target.names[0];
  }

  @computed get getWhitelist(): string[] {
    return this.whitelist.map(i => i.toString())
  }

  @computed get getBlacklist(): string[] {
    return this.blacklist.map(i => i.toString())
  }

  @computed get listAllAlgortihms(): string[] {
    return NetworkAlgorithms.map(algorithm => algorithm.name);
  }

  setOnclickCallback(cb: Function) {
    this.visNetwork.on("click", params => {
      cb(this.nodes.find(node => node.id == params.nodes[0]))
    });
  }

  setOnDoubleclickCallback(cb: Function) {
    this.visNetwork.on("doubleClick", params => {
      cb(this.nodes.find(node => node.id == params.nodes[0]))
    });
  }
}
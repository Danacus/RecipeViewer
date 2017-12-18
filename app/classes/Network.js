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
import Edge from './Edge';

export default class Network {
  @observable target: Stack;
  id: string;
  nodes: Node[];
  edges: Edge[];
  visNodes: vis.DataSet;
  visEdges: vis.DataSet;
  visOptions: {};
  @observable whitelist: RegExp[];
  @observable blacklist: RegExp[];
  @observable algorithm: INetworkAlgorithm;
  algorithmInstance: INetworkAlgorithm;
  recipes: Recipes;
  visNetwork: vis.Network;
  @observable limit: number;
  @observable depth: number;

  constructor(target: Stack) {
    this.target = target;
    this.id = uuidv4();
    this.whitelist = [];
    this.blacklist = [];
    this.limit = 100;
    this.depth = 10;
    this.setAlgorithm(NetworkAlgorithms[0]);
  }

  setVisOptions(visOptions: {}) {
    this.visOptions = visOptions;
  }

  generate() {
    this.algorithmInstance = new this.algorithm({target: this.target, recipes: this.recipes, limit: this.limit, depth: this.depth - 1, whitelist: this.whitelist, blacklist: this.blacklist});
    let obj = this.algorithmInstance.generateNetwork(); 
    this.nodes = obj.nodes;
    this.edges = obj.edges;
  }

  visReload() {
    this.nodes.forEach(node => {
      //console.log(node);
      if (node.stack.names.length > 0)
        node.setImage(`file://${stores.settings.list.path}/config/jeiexporter/items/${node.stack.names[0].replace(/:/g, "_")}.png`)
    })
    let visNodes = this.nodes.map(node => ({id: node.id, group: node.group, image: node.image, label: node.amount.toString()}));
    let visEdges = this.edges/*.filter(edge => edge.recipeIndex == 0)*/.map(edge => ({id: edge.id, from: edge.child.id, to: edge.parent.id}));

    /*this.nodes.forEach((node) => {
      node.getParents().filter(parent => node.recipes[0].inputs.some(input => input.equals(parent.stack))).forEach(parent => {
        visEdges.push({from: node.id, to: parent.id});
      })

      if (node.recipes[0]) {
        node.recipes[0].parents.forEach(parent => {
          visEdges.push({from: node.id, to: parent.id});
        })
      }
    })*/

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

  @action setLimit(limit: number) {
    this.limit = limit;
  }

  @action setDepth(depth: number) {
    this.depth = depth;
  }

  @action setTargetAmount(amount: number) {
    this.target.amount = amount;
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
    return NetworkAlgorithms.map(algorithm => algorithm.name());
  }

  setOnclickCallback(cb: Function) {
    this.visNetwork.on("click", params => {
      if (params.edges[0]) {
        console.log(this.visEdges.get(params.edges[0]))
      }
      cb(
        params.nodes.length == 1 ? this.nodes.find(node => node.id == params.nodes[0]): null,
        params.edges.length == 1 ? this.edges.find(edge => edge.id == params.edges[0]): null
      )
    });
  }

  setOnDoubleclickCallback(cb: Function) {
    this.visNetwork.on("doubleClick", params => {
      cb(this.nodes.find(node => node.id == params.nodes[0]))
    });
  }
}
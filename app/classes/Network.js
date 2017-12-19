// @flow

import {observable, action, computed, toJS} from 'mobx';
import Stack from './Stack';
import uuidv4 from 'uuid/v4';
import { INetworkAlgorithm } from './NetworkAlgorithm/INetworkAlgorithm';
import Node from './Node';
import vis from 'vis';
import Recipes from '../stores/Recipes';
import { stores } from '../App';
import { NetworkAlgorithms } from './NetworkAlgorithm/NetworkAlgorithms';
import Edge from './Edge';

export const NetworkLayouts = [
  {
    name: 'Normal',
    apply(options: Object) { 
      options.layout.hierarchical.enabled = false;
    }
  },
  {
    name: 'Hierarchical',
    apply(options: Object) {
      options.layout.hierarchical.enabled = true;
      options.layout.hierarchical.direction = 'DU';
    }
  }
]

export default class Network {
  @observable target: Stack;
  id: string;
  nodes: Node[];
  edges: Edge[];
  visNodes: vis.DataSet;
  visEdges: vis.DataSet;
  visOptions: any;
  @observable whitelist: RegExp[];
  @observable blacklist: RegExp[];
  @observable algorithm: number;
  algorithmInstance: INetworkAlgorithm;
  recipes: Recipes;
  visNetwork: vis.Network;
  @observable limit: number;
  @observable depth: number;
  @observable seed: ?number;
  @observable selectedLayout: number;

  constructor(target: Stack) {
    this.target = target;
    this.id = uuidv4();
    this.whitelist = [];
    this.blacklist = [];
    this.limit = 100;
    this.depth = 10;
    this.algorithm = 0;
  }

  setVisOptions(visOptions: {}) {
    this.visOptions = visOptions;
  }

  generate() {
    this.algorithmInstance = new NetworkAlgorithms[this.algorithm]();
    this.algorithmInstance.target = this.target;
    this.algorithmInstance.recipes = this.recipes;
    this.algorithmInstance.limit = this.limit;
    this.algorithmInstance.depth = this.depth - 1;
    this.algorithmInstance.whitelist = this.whitelist;
    this.algorithmInstance.blacklist = this.blacklist;

    let obj = this.algorithmInstance.generateNetwork(); 
    this.nodes = obj.nodes;
    this.edges = obj.edges;
  }

  visReload() {
    this.nodes.forEach(node => {
      if (node.stack.names.length > 0)
        node.setImage(`file://${stores.settings.list.path}/config/jeiexporter/items/${node.stack.names[0].replace(/:/g, "_")}.png`)
    });

    this.visOptions.layout.randomSeed = this.seed;

    let visNodes = this.nodes.map(node => ({id: node.id, group: node.group, image: node.image, label: node.amount.toString()}));
    let visEdges = this.edges.map(edge => ({id: edge.id, from: edge.child.id, to: edge.parent.id}));

    this.visNodes = new vis.DataSet(visNodes);
    this.visEdges = new vis.DataSet(visEdges);

    let container = document.getElementById(this.id);
    this.visNetwork = new vis.Network(container, {nodes: this.visNodes, edges: this.visEdges}, this.visOptions);

    this.seed = this.visNetwork.getSeed();
  }

  @action newSeed() {
    this.seed = undefined;
  }

  setRecipes(recipes: Recipes) {
    this.recipes = recipes;
  }

  @action setAlgorithm(algorithm: number) {
    this.algorithm = algorithm;
  }

  @action setLayout(layout: number) {
    this.selectedLayout = layout;
    NetworkLayouts[layout].apply(this.visOptions);
  }

  @action applyNetworkOptions(func: (options: Object) => mixed) {
    func(this.visOptions);
    if (this.nodes && this.edges) {
      this.visReload();
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
        params.edges.length > 0 ? this.edges.filter(edge => params.edges.includes(edge.id)): null
      )
    });
  }

  setOnDoubleclickCallback(cb: Function) {
    this.visNetwork.on("doubleClick", params => {
      cb(this.nodes.find(node => node.id == params.nodes[0]))
    });
  }
}
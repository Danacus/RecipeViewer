// @flow

import {observable, action, computed, toJS} from 'mobx';
import Stack from './Stack';
import uuidv4 from 'uuid/v4';
import { INetworkAlgorithm } from './NetworkAlgorithm/INetworkAlgorithm';
import Node from './Node';
import vis from 'vis';
import Recipes from '../stores/Recipes';
import { NetworkAlgorithms } from './NetworkAlgorithm/NetworkAlgorithms';
import Edge from './Edge';
import Filter from './Filter';
import { store } from '../App';
import Recipe from './Recipe';
import { ipcRenderer } from 'electron';

export const NetworkLayouts = [
  {
    name: 'Normal',
    apply(options: Object) { 
      options.layout.hierarchical.enabled = false;
      options.physics.solver = 'barnesHut';
      options.edges.smooth = {};
    }
  },
  {
    name: 'Hierarchical',
    apply(options: Object) {
      options.layout.hierarchical.enabled = true;
      options.layout.hierarchical.direction = 'DU';
      options.layout.hierarchical.sortMethod = 'directed';
      options.physics.solver = 'hierarchicalRepulsion';
      options.edges.smooth.enabled = false;
    }
  }
]

export default class Network {
  @observable target: Stack;
  @observable id: string;
  nodes: Node[];
  edges: Edge[];
  visNodes: vis.DataSet;
  visEdges: vis.DataSet;
  visOptions: any;
  @observable filter: Filter;
  @observable algorithm: number;
  algorithmInstance: INetworkAlgorithm;
  recipes: Recipes;
  filteredRecipes: Recipes;
  visNetwork: vis.Network;
  @observable limit: number;
  @observable depth: number;
  @observable seed: ?number;
  @observable selectedLayout: number;
  @observable collapsed: boolean;
  @observable isLoading: boolean;

  constructor() {
    this.target = new Stack([''])
    this.id = uuidv4();
    this.filter = new Filter();
    this.limit = 100;
    this.depth = 3;
    this.algorithm = 0;
    this.isLoading = false;
  }

  createNew() {
    this.setAlgorithm(0);
    this.setVisOptions({
      nodes: {
        shape: 'image'
      },
      edges: {
        width: 7,
        arrows: {
          middle: {enabled: true, scaleFactor: -1}
        },
        color: {inherit: 'to'}
      },
      physics: {
        enabled: true,
        barnesHut: {
          springLength: 250,
          springConstant: 0.003,
          damping: 0.1
        }
      },
      layout: {
        hierarchical: {
          enabled: false,
        }
      }
    });
    this.setLayout(0);
  }
  
  serialize(): Object {
    return {
      target: this.target.serialize(),
      visOptions: this.visOptions,
      id: this.id,
      filter: this.filter.serialize(),
      algorithm: this.algorithm,
      limit: this.limit,
      depth: this.depth,
      seed: this.seed,
      selectedLayout: this.selectedLayout
    }
  }

  deserialize(data: Object) {
    this.target.deserialize(data.target);
    this.visOptions = data.visOptions;
    this.id = data.id;
    if (data.filter) {
      this.filter = this.filter.deserialize(data.filter);
    }
    this.algorithm = data.algorithm;
    this.limit = data.limit;
    this.depth = data.depth;
    this.seed = data.seed;
    this.selectedLayout = data.selectedLayout;
    return this;
  }

  setVisOptions(visOptions: {}) {
    this.visOptions = visOptions;
  }

  generate(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.isLoading = true;

      ipcRenderer.send('start', {
        type: 'algorithm',
        network: this.id,
        algorithm: this.algorithm,
        target: this.target.serialize(),
        recipes: this.filteredRecipes.serialize(),
        limit: this.limit,
        depth: this.depth - 1
      })
  
      ipcRenderer.on('algorithm-response', (event, data) => {
        if (data.network === this.id) {
          this.nodes = data.nodes.map(node => new Node(new Stack(['']), -1, -1, -1).deserialize(node));
          this.edges = data.edges.map(edge => new Edge(new Node(new Stack(['']), -1, -1, -1), new Node(new Stack(['']), -1, -1, -1), new Recipe([], [], [], -1), -1, -1).deserialize(edge));
          this.visReload();
          resolve();
        }
      })
  
      store.saveSettings();
    }); 
  }

  visReload() {
    this.nodes.forEach(node => {
      if (node.stack.names.length > 0)
        node.setImage(`file://${store.getCurrentProfile().path}/config/jeiexporter/items/${node.stack.names[0].replace(/:/g, "_")}.png`)
    });

    this.visOptions.layout.randomSeed = this.seed;

    let visNodes = this.nodes.map(node => ({id: node.id, group: node.group, image: node.image, label: node.amount > 0 ? node.amount.toString() : undefined}));
    let visEdges = this.edges.map(edge => ({id: edge.id, from: edge.child.id, to: edge.parent.id}));

    this.visNodes = new vis.DataSet(visNodes);
    this.visEdges = new vis.DataSet(visEdges);

    let container = document.getElementById(this.id);
    this.visNetwork = new vis.Network(container, {nodes: this.visNodes, edges: this.visEdges}, this.visOptions);
    this.visNetwork.on("afterDrawing", () => {
      this.isLoading = false;
    })

    this.seed = this.visNetwork.getSeed();
  }

  @action reloadFilter() {
    this.filteredRecipes = new Recipes();
    this.filteredRecipes.recipes = this.recipes.recipes.slice();
    this.filteredRecipes.recipes = this.filteredRecipes.recipes.filter(recipe => this.filter.recipeFilter(recipe));
  }

  @action newSeed() {
    this.seed = undefined;
  }

  @action newId() {
    this.id = uuidv4();
  }

  @action setRecipes(recipes: Recipes) {
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

  @computed get getFilter(): Filter {
    return this.filter
  }

  @computed get listAllAlgortihms(): string[] {
    return NetworkAlgorithms.map(algorithm => algorithm.name());
  }

  setOnclickCallback(cb: Function) {
    this.visNetwork.on("click", params => {
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
// @flow

import INetworkAlgorithm from "./INetworkAlgorithm";
import type { AlgorithmOptions } from "./INetworkAlgorithm";
import Node from "../Node";
import Edge from "../Edge";

export default class DefaultAlgorithm extends INetworkAlgorithm {

  nodes: Node[];
  edges: Edge[];

  constructor(options: AlgorithmOptions) {
    super(options);

    this.nodes = [];
    this.edges = [];
  }

  static name(): string {
    let name = "Default Algorithm"; 
    return name;
  }

  generateNetwork(): any {
    let targetNode: Node = new Node(this.options.target, 0, this.options.target.amount);
    this.counter = 0;
    this.createNode(targetNode, 0);
    return {nodes: this.nodes, edges: this.edges};
  }

  createNode(node: Node, depth: number) {
    this.nodes.push(node);

    if (this.counter > this.options.limit || depth > this.options.depth) {
      return;
    }

    let parentRecipes = this.options.recipes.getRecipesWithOutput(node.stack)
    .filter(recipe => !recipe.isBlacklisted(this.options.blacklist))
    .filter(recipe => recipe.isWhitelisted(this.options.whitelist));

    parentRecipes.forEach((recipe, i, recipes) => {
      recipe.inputs.forEach(input => {
        if (input.names.length > 0) {
          let output = recipe.outputs.find(output => output.equals(node.stack));
          let outputAmount = output ? output.amount : 1;
          let n: Node = new Node(input, this.nodes.length + 1, Math.ceil(node.amount * (input.amount / outputAmount)), recipe.id);
          n.addChild(node);  
          node.addParent(n);
          this.edges.push(new Edge(n, node, recipe, i, this.edges.length + 1));
          this.createNode(n, depth + 1);
        } 
      });
    });
  }
}
// @flow

import { INetworkAlgorithm } from "./INetworkAlgorithm";
import PrimitiveStack from '../primitive/PrimitiveStack';
import PrimitiveRecipes from '../primitive/PrimitiveRecipes';
import PrimitiveNode from "../primitive/PrimitiveNode";
import PrimitiveEdge from "../primitive/PrimitiveEdge";

export default class DefaultAlgorithm implements INetworkAlgorithm {
  target: PrimitiveStack;
  recipes: PrimitiveRecipes;
  limit: number;
  depth: number;
  counter: number;
  nodes: PrimitiveNode[];
  edges: PrimitiveEdge[];

  constructor() {
    this.counter = 0;
    this.nodes = [];
    this.edges = [];
  }

  static name(): string {
    return "Default"
  }

  generateNetwork(): any {
    let targetNode: PrimitiveNode = new PrimitiveNode(this.target, 0, this.target.amount);
    this.counter = 0;
    this.createNode(targetNode, 0);
    return {nodes: this.nodes, edges: this.edges};
  }

  createNode(node: PrimitiveNode, depth: number) {
    this.nodes.push(node);
    this.counter++;

    if (this.counter > this.limit || depth > this.depth) {
      return;
    }

    let parentRecipes = this.recipes.getRecipesWithOutput(node.stack);

    parentRecipes.forEach((recipe, i, recipes) => {
      recipe.inputs.forEach(input => {
        if (input.names.length > 0 && !node.children.some(child => child.stack.equals(input))) {
          let output = recipe.outputs.find(output => output.equals(node.stack));
          let outputAmount = output ? output.amount : 1;
          let n: PrimitiveNode = new PrimitiveNode(input, this.nodes.length + 1, Math.round(100 * node.amount * (input.amount / outputAmount)) / 100, recipe.id);
          n.addChild(node);  
          node.addParent(n);
          this.edges.push(new PrimitiveEdge(n, node, recipe, i, this.edges.length + 1));
          this.createNode(n, depth + 1);
        } 
      });
    });
  }
}
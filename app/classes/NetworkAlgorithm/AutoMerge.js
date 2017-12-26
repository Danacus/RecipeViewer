// @flow

import { INetworkAlgorithm } from "./INetworkAlgorithm";
import Node from "../Node";
import Edge from "../Edge";
import Stack from '../Stack';
import Recipes from '../../worker/PrimitiveRecipes';

export default class AutoMerge implements INetworkAlgorithm {
  target: Stack;
  recipes: Recipes;
  limit: number;
  depth: number;
  counter: number;
  nodes: Node[];
  edges: Edge[];

  constructor() {
    this.counter = 0;
    this.nodes = [];
    this.edges = [];
  }

  static name(): string {
    return "Auto Merge"
  }

  generateNetwork(): any {
    let targetNode: Node = new Node(this.target, 0, this.target.amount);
    this.counter = 0;
    this.createNode(targetNode, 0, []);
    this.reduceEdges();
    return {nodes: this.nodes, edges: this.edges};
  }

  createNode(node: Node, depth: number, nodes: Node[]) {
    this.nodes.push(node);
    this.counter++;

    if (this.counter > this.limit || depth > this.depth) {
      return;
    }

    let parentRecipes = this.recipes.getRecipesWithOutput(node.stack);

    parentRecipes.forEach((recipe, i, recipes) => {
      recipe.inputs.forEach(input => {
        if (input.names.length > 0) {
          let equalNode = nodes.find(node => node.stack.equals(input))
          if (equalNode) {
            equalNode.addChild(node);  
            node.addParent(equalNode);
            nodes.push(equalNode);
            this.edges.push(new Edge(equalNode, node, recipe, i, this.edges.length + 1));
          } else {
            let n: Node = new Node(input, this.nodes.length + 1, 0, recipe.id);
            n.addChild(node);  
            node.addParent(n);
            nodes.push(n);
            this.edges.push(new Edge(n, node, recipe, i, this.edges.length + 1));
            this.createNode(n, depth + 1, nodes);
          }    
        } 
      });
    });
  }

  reduceEdges() {
    this.edges = this.edges.reduce((total, current) => {
      if (!total.some(edge => edge.child.stack.equals(current.child.stack) && edge.parent.stack.equals(current.parent.stack))) {
        total.push(current);
      }

      return total;
    }, [])
  }
}
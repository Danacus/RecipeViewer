// @flow

import { INetworkAlgorithm } from "./INetworkAlgorithm";
import Stack from '../../api/Stack';
import Recipes from '../../api/Recipes';
import Node from "../../api/Node";
import Edge from "../../api/Edge";
import Recipe from "../../api/Recipe";

export default class LeastMods implements INetworkAlgorithm {
  target: Stack;
  recipes: Recipes;
  limit: number;
  depth: number;
  counter: number;
  nodes: Node[];
  edges: Edge[];
  mods: string[];

  constructor() {
    this.counter = 0;
    this.nodes = [];
    this.edges = [];
    this.mods = ["minecraft"];
  }

  static name(): string {
    return "Least Mods"
  }

  generateNetwork(): any {
    let targetNode: Node = new Node(this.target, 0, this.target.amount);
    this.target.getMods().forEach(mod => this.mods.push(mod));
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

    if (parentRecipes.length == 0) {
      return;
    }

    let recipe = this.getBestRecipe(parentRecipes);

      recipe.inputs.forEach(input => {
        if (input.names.length > 0) {
          let equalNode = nodes.find(node => node.stack.equals(input))
          if (equalNode) {
            equalNode.addChild(node);  
            node.addParent(equalNode);
            nodes.push(equalNode);
            this.edges.push(new Edge(equalNode, node, recipe, 0, this.edges.length + 1));
          } else {
            let n: Node = new Node(input, this.nodes.length + 1, 0, recipe.id);
            n.addChild(node);  
            node.addParent(n);
            nodes.push(n);
            this.edges.push(new Edge(n, node, recipe, 0, this.edges.length + 1));
            this.createNode(n, depth + 1, nodes);
          }    
        } 
      });
  }

  getBestRecipe(recipes: Recipe[]) {
    let best: Recipe = recipes[0];

    recipes.forEach(recipe => {
      recipe.props.mods = new Set();

      recipe.outputs.forEach(output => output.getMods().forEach(mod => {
        if (this.mods.includes(mod)) {
          recipe.props.score += (1 / (this.mods.indexOf(mod))) * recipe.outputs.length;
        }
        recipe.props.mods.add(mod);
      }));

      recipe.inputs.forEach(input => input.getMods().forEach(mod => {
        if (this.mods.includes(mod)) {
          recipe.props.score += (1 / (this.mods.indexOf(mod))) * recipe.inputs.length;
        }
        recipe.props.mods.add(mod);
      }));

      recipe.catalysts.forEach(catalyst => catalyst.getMods().forEach(mod => {
        if (this.mods.includes(mod)) {
          recipe.props.score += (1 / (this.mods.indexOf(mod))) * recipe.catalysts.length;
        } else {
          recipe.props.score -= (1 / (this.mods.indexOf(mod))) * recipe.catalysts.length;
        }
        recipe.props.mods.add(mod);
      }));

      if (recipe.props.score > best.props.score) {
        best = recipe;
      }
    });

    best.props.mods.forEach(mod => {
      if (!this.mods.includes(mod)) {
        this.mods.push(mod);
      }
    })

    return best;
  }

  reduceEdges() {
    this.edges = this.edges.reduce((total, current) => {
      if (!total.some(edge => edge.child.stack.equals(current.child.stack))) {
        total.push(current);
      }

      if (!total.some(edge => edge.parent.stack.equals(current.parent.stack))) {
        total.push(current);
      }

      return total;
    }, [])
  }
}
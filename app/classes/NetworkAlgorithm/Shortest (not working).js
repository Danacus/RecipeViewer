// @flow

import { INetworkAlgorithm } from "./INetworkAlgorithm";
import Node from "../Node";
import Edge from "../Edge";
import Stack from '../Stack';
import Recipes from '../../stores/Recipes';
import Filter from "../Filter";

export default class Shortest implements INetworkAlgorithm {
  target: Stack;
  recipes: Recipes;
  filteredRecipes: Recipes;
  limit: number;
  depth: number;
  filter: Filter;
  counter: number;
  nodes: Node[];
  edges: Edge[];

  constructor() {
    this.counter = 0;
    this.nodes = [];
    this.edges = [];
  }

  static name(): string {
    return "Shortest (not working)"
  }

  generateNetwork(): any {
    let targetNode: Node = new Node(this.target, 0, this.target.amount);
    // When you realize you should be using Immutable instead
    this.filteredRecipes = new Recipes(this.recipes.list.slice());
    this.filteredRecipes.recipes = this.filteredRecipes.recipes.filter(recipe => this.filter.recipeFilter(recipe));
    this.counter = 0;
    this.createNode(targetNode, 0);
    this.eliminateResources();
    return {nodes: this.nodes, edges: this.edges};
  }

  createNode(node: Node, depth: number) {
    this.nodes.push(node);
    this.counter++;

    if (this.counter > this.limit || depth > this.depth) {
      return;
    }

    let parentRecipes = this.filteredRecipes.getRecipesWithOutput(node.stack);

    parentRecipes.forEach((recipe, i, recipes) => {
      recipe.inputs.forEach(input => {
        if (input.names.length > 0 && !node.children.some(child => child.stack.equals(input))) {
          let output = recipe.outputs.find(output => output.equals(node.stack));
          let outputAmount = output ? output.amount : 1;
          let n: Node = new Node(input, this.nodes.length + 1, Math.round(100 * node.amount * (input.amount / outputAmount)) / 100, recipe.id);
          n.addChild(node);  
          node.addParent(n);
          this.edges.push(new Edge(n, node, recipe, i, this.edges.length + 1));
          this.createNode(n, depth + 1);
        } 
      });
    });

    if (parentRecipes.length == 0) {
      node.props.distance = depth;
    }
  }

  eliminateResources() {
    let rawResources = this.nodes.filter(node => node.props.distance);

    rawResources = rawResources.sort((a, b) => (b.props.distance + b.amount / 100) - (a.props.distance + a.amount / 100));

    /*rawResources = rawResources.reduce((total, current) => {
      let other = total.find(node => current.children.every(child => node.children.some(c => c.stack.equals(child.stack))));

      if (other) {
        if (other.children.reduce((t, c) => t + c.amount / other.amount, 0) < current.children.reduce((t, c) => t + c.amount / current.amount, 0)) {
          total.push(current);
        } else {
          total.push(other);
        }
      } else {
        total.push(current);
      }  

      return total;
    }, [])*/

    //console.log(rawResources.length)

    rawResources.forEach(res => {
      this.isNotRequired(res);
    });

    rawResources = rawResources.filter(res => !res.props.disabled);

    //console.log(this.findShortest(rawResources[0], []).map(node => node.stack.names[0]));

    let enabledNodes = [];

    rawResources.forEach(resource => {
      this.findShortest(resource, []).forEach(node => {
        enabledNodes.push(node);
      })
    })

    this.nodes = this.nodes.filter(node => enabledNodes.some(enabledNode => enabledNode.id == node.id));

    console.log(this.nodes.length);
  }

  isNotRequired(node: Node) {
    let enabledParents = node.parents.filter(parent => !parent.props.disabled);
    let enabledChildren = node.children.filter(child => !child.props.disabled);

    if (enabledParents.length < 2) {
      node.props.disabled = enabledChildren.some(child => this.isNotRequired(child));
      return node.props.disabled;
    } else {
      node.props.disabled = true;
      return true;
    }
  }

  findShortest(node: Node, nodes: Node[]) {
    if (nodes.length == 0) {
      nodes.push(node);
    }

    if (!node.stack.equals(this.target)) {
      let bestChild = {child: null, length: null};
      
      node.children.forEach(child => {
        let find = this.findShortest(child, nodes)

        if (!bestChild.length || find.length < bestChild.length) {
          bestChild.length = find.length;
          bestChild.child = child;
        }
      })

      if (bestChild) {
        nodes.push(bestChild.child);
      }  
    }

    return nodes;
  }
}
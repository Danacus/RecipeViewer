// @flow

import INetworkAlgorithm from "./INetworkAlgorithm";
import type { AlgorithmOptions } from "./INetworkAlgorithm";
import Node from "../Node";

export default class DefaultAlgorithm extends INetworkAlgorithm {

  constructor(options: AlgorithmOptions) {
    super(options);

    this.name = "Default Algorithm";
  }

  generateNetwork(): Node[] {
    let nodes = [];
    let targetNode: Node = new Node(this.options.target, 0)
    this.counter = 0;
    nodes = this.createNode(targetNode, nodes, 0);
    return nodes;
  }

  createNode(node: Node, nodes: Node[], depth: number): Node[] {
    nodes.push(node);

    if (this.counter > this.options.limit || depth > this.options.depth)
      return nodes;

    this.options.recipes.getRecipesWithOutput(node.stack).forEach(recipe => {
      recipe.inputs.forEach(input => {
        if (!nodes.some(node => node.stack.matches(input)) 
          && !input.matchesRegexList(this.options.blacklist) 
          && (input.matchesRegexList(this.options.whitelist) || this.options.whitelist.length == 0)) {
          this.counter++;
          if (nodes.some(n => node.stack.matches(input))) {
            nodes.filter(n => node.stack.matches(input)).forEach(n => {
              n.addChild(node);
              node.addParent(n);
            })
          } else {
            let n: Node = new Node(input, nodes.length);
            n.addChild(node);
            node.addParent(n);
  
            nodes = this.createNode(new Node(input, nodes.length), nodes, depth + 1);
          } 
        } 
      })
    })
  
    return nodes;
  }
}
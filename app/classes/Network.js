// @flow

import Stack from './Stack';

export default class Network {
  target: Stack;
  constructor(target: Stack) {
    this.target = target;
  }
}
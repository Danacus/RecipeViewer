// @flow
import {observable, action, computed, toJS} from 'mobx';
import Network from '../classes/Network';

export default class Networks {
  @observable networks: Network[] = [];

  constructor() {
  }

  @computed get list(): Network[] {
    return this.networks;
  }

  @action addNetwork(network: Network) {
    this.networks.push(network);
    return network;
  }
}


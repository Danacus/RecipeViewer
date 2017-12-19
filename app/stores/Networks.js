// @flow
import {observable, action, computed, toJS} from 'mobx';
import Network from '../classes/Network';
import Stack from '../classes/Stack';

export default class Networks {
  @observable networks: Network[] = [];
  @observable selectedNetwork: ?string;

  serialize(): Object {
    return {networks: this.networks.map(network => network.serialize()), selectedNetwork: this.selectedNetwork};
  }

  deserialize(data: Object) {
    this.networks = data.networks.map(d => new Network(new Stack([''])).deserialize(d));
    this.selectedNetwork = data.selectedNetwork;
    return this;
  }

  @computed get list(): Network[] {
    return this.networks;
  }

  @action reset() {
    this.networks = [];
  }

  @action addNetwork(network: Network) {
    this.networks.push(network);
    return network;
  }
}


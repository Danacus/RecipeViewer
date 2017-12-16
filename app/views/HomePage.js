// @flow

import React, {PropTypes, Component} from 'react';
import { observer } from 'mobx-react';
import {Link} from 'react-router-dom';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import NetworkView from './NetworkView';
import Networks from '../stores/Networks';
import Network from '../classes/Network';
import Stack from '../classes/Stack';
import { stores } from '../App';
import { NetworkAlgorithms } from '../classes/NetworkAlgorithm/NetworkAlgorithms';

type Props = {
  networks: Networks  
}

type State = {
  activeKey: string
}

@observer
class HomePage extends Component<Props, State> {
  newTabIndex: number;

  constructor(props: Props) {
    super(props);
    this.newTabIndex = 0;
    this.state = {
      activeKey: '',
    };
  }

  update() {
    this.forceUpdate();
  }

  onChange = (activeKey: string) => {
    this.setState({ activeKey });
  }

  onEdit = (targetKey: string, action: any) => {
    this[action](targetKey);
  }

  add = () => {
    let network = this.props.networks.addNetwork(new Network(new Stack([''])));
    network.setRecipes(stores.recipes);
    //network.setAlgorithm(NetworkAlgorithms[0]);
    network.setVisOptions({
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
          nodeSpacing: 1000
        }
      }
    })
    this.setState({ activeKey: network.id });
  }
  
  remove = (targetKey: string) => {
    let activeKey = this.state.activeKey;
    let lastIndex: number = -1;
    this.props.networks.list.forEach((network, i) => {
      if (network.id === targetKey) {
        lastIndex = i - 1;
      }
    });
    const networks = this.props.networks.list.filter(network => network.id !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = networks[lastIndex].id;
    }
    this.props.networks.networks = this.props.networks.list.filter(network => network.id !== targetKey);
    this.setState({ activeKey });
  }

  render() {
    return (
      <Tabs 
        type="editable-card"
        onChange={this.onChange}
        activeKey={this.state.activeKey}
        onEdit={this.onEdit}
      >
        {this.props.networks.list.map((network, index) => 
          <TabPane 
            tab={stores.nameMaps.list[network.getTarget] ? stores.nameMaps.list[network.getTarget] : network.getTarget} 
            key={network.id}
          >
            <NetworkView network={network} updateParent={() => this.update()} />
          </TabPane>
        )}
      </Tabs>
    );
  }
}

export default HomePage;

// @flow

import React, {PropTypes, Component} from 'react';
import { observer } from 'mobx-react';
import { Link, Redirect } from 'react-router-dom';
import { Tabs, Layout, Row, Col, Select, Icon, Button } from 'antd';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

import NetworkView from './NetworkView';
import Networks from '../stores/Networks';
import Network from '../classes/Network';
import Stack from '../classes/Stack';
import { store, appInstance } from '../App';
import { NetworkAlgorithms } from '../classes/NetworkAlgorithm/NetworkAlgorithms';
import Settings from '../stores/Settings';
import style from './style/HomePage.css';
import uuidv4 from 'uuid/v4';

type Props = {
}

type State = {
  addProfile: boolean,
}

@observer
class HomePage extends Component<Props, State> {
  newTabIndex: number;

  constructor(props: Props) {
    super(props);
    this.newTabIndex = 0;
    this.state = {
      addProfile: false,
    };
  }

  toggle() {
    let networks = store.getCurrentProfile().networks
    networks.list.find(network => network.id == networks.selectedNetwork).collapsed = !networks.list.find(network => network.id == networks.selectedNetwork).collapsed;
  }

  update() {
    this.forceUpdate();
  }

  onChange = (activeKey: string) => {
    store.getCurrentProfile().networks.selectedNetwork = activeKey;
  }

  onEdit = (targetKey: string, action: any) => {
    this[action](targetKey);
  }

  changeProfile(profile: string) {
    if (profile == "add") {
      this.setState({addProfile: true});
    } else {
      if (appInstance) {
        store.saveSettings().then(() => {
          store.selectProfile(parseInt(profile));
          this.setState({}); 
        });
      }
    }
  }

  add = (stack: Stack = new Stack(['']), networkData: ?Object = null) => {
    let network = store.getCurrentProfile().networks.addNetwork(new Network());
    
    if (!networkData) {
      network.createNew();
    } else {
      networkData.id = uuidv4();
      network.deserialize(networkData);
      network.setTarget(stack.names[0]);
    }

    network.setRecipes(store.getCurrentProfile().recipes);
    store.getCurrentProfile().networks.selectedNetwork = network.id;
    
    this.setState({});
  }
  
  remove = (targetKey: number) => {
    let networks = store.getCurrentProfile().networks;
    if (networks.selectedNetwork == targetKey) {
      networks.selectedNetwork = networks.list[0].id;
    }
    networks.networks = networks.list.filter(network => network.id !== targetKey);
    this.setState({});
  }

  render() {
    return (
      this.state.addProfile ? <Redirect to="/firstlaunch" push={true} /> :
      <div>
        <Row>
          <Col span={16}>
            <Tabs 
              type="editable-card"
              onChange={this.onChange}
              activeKey={store.getCurrentProfile().networks.selectedNetwork}
              onEdit={this.onEdit}
              className='tabs'
            >
              {store.getCurrentProfile().networks.list.map((network, index) => 
                <TabPane 
                  tab={store.getCurrentProfile().nameMaps.list[network.getTarget] ? store.getCurrentProfile().nameMaps.list[network.getTarget] : network.getTarget} 
                  key={network.id}
                >
                  <NetworkView addNetwork={this.add.bind(this)} network={network} updateParent={() => this.update()} />
                </TabPane>
              )}
            </Tabs>
          </Col>
          <Col span={4} className="header-row">
            <Select className='select-profile' value={store.getCurrentProfile().name} onChange={value => this.changeProfile(value)}>
              {store.profiles.map((profile, i) => 
                <Option key={i} value={i}>{profile.name}</Option>
              )}
              <Option key='add' value='add'>New profile ...</Option>
            </Select>
          </Col>
          <Col span={2} className="header-row" style={{height: '50px'}}>
            <Link to='/settings'>
              <Button
                style={{float: 'right', marginRight: '12px'}} 
              >
                <Icon         
                  className="trigger"
                  type='setting'       
                />
              </Button>
            </Link>
          </Col>
          <Col span={2} className="header-row" style={{height: '50px'}}>
            <Button
              onClick={() => this.toggle()}
              style={{float: 'right', marginRight: '12px'}} 
            >
              <Icon         
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}       
              />
            </Button>
          </Col>       
        </Row>     
      </div>
    );
  }
}

export default HomePage;
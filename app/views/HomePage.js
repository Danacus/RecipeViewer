// @flow

import React, {PropTypes, Component} from 'react';
import { observer } from 'mobx-react';
import { Link, Redirect } from 'react-router-dom';
import { Tabs, Layout, Row, Col, Select, Icon, Button, Spin, Modal, Form, Tooltip } from 'antd';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

import NetworkView from './NetworkView';
import Networks from '../observables/Networks';
import Network from '../observables/Network';
import Stack from '../api/Stack';
import { store, appInstance } from '../App';
import { NetworkAlgorithms } from '../worker/NetworkAlgorithm/NetworkAlgorithms';
import Settings from '../observables/Settings';
import style from './style/HomePage.css';
import uuidv4 from 'uuid/v4';
import OptionField from './components/OptionField';
import CreateProfilePage, { createProfileInstance } from './CreateProfilePage';
import Profile from '../observables/Profile';

type Props = {
}

type State = {
  addProfile: boolean,
  showSettings: boolean,
  name: string,
  path: string,
}

@observer
class HomePage extends Component<Props, State> {
  newTabIndex: number;

  constructor(props: Props) {
    super(props);
    this.newTabIndex = 0;
    this.state = {
      addProfile: false,
      showSettings: false,
      name: '',
      path: ''
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

  closeSettings() {
    this.setState({
      name: '',
      path: ''
    });
    store.getCurrentProfile().name = this.state.name;
    store.getCurrentProfile().path = this.state.path;
    store.saveSettings().then(() => {
      this.setState({showSettings: false});
    });
  }

  cancelSettings() {
    this.setState({
      name: '',
      path: ''
    });
    this.setState({showSettings: false});
  }

  openSettings() {
    this.setState({
      name: store.getCurrentProfile().name,
      path: store.getCurrentProfile().path
    });
    this.setState({showSettings: true});
  }

  closeAddProfile() {
    store.saveSettings().then(() => {
      this.setState({addProfile: false});
    });
  }

  cancelAddProfile() {
    if (createProfileInstance) {
      createProfileInstance.reset();
    }
    store.setProfiles(store.profiles.filter((profile, i) => i != store.profiles.length - 1));
    this.setState({addProfile: false});
  }

  openAddProfile() {
    this.setState({addProfile: true});
  }

  changeProfile(profile: string) {
    if (profile == "add") {
      store.addProfile(new Profile('', '', new Networks()));
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

  componentDidMount() {
    if (store.profiles.length == 0) {
      store.addProfile(new Profile('', '', new Networks()));
      this.setState({addProfile: true});
    }
  }

  render() {
    return (
      <div>
        {store.tasks.length > 0 ? 
          <div className='loading-div'>
            <div className='blur' />
            <div className='spin'>
              <Spin size='large' /><br />
              {store.tasks.map((task, i) => 
                <span key={i}>{task}<br /></span>
              )}
            </div>
          </div> 
        : null}
        <Row>
          <Col span={14} className='tabs-container'>
              <Tabs 
                type="editable-card"
                onChange={this.onChange}
                activeKey={store.getCurrentProfile() ? store.getCurrentProfile().networks.selectedNetwork : ''}
                onEdit={this.onEdit}
                className='tabs'
              >
                {store.getCurrentProfile() ? store.getCurrentProfile().isLoaded ? store.getCurrentProfile().networks.list.map((network, index) => 
                  <TabPane 
                    tab={store.getCurrentProfile().nameMaps.titles[network.getTarget] ? store.getCurrentProfile().nameMaps.titles[network.getTarget] : network.getTarget} 
                    key={network.id}
                  >
                    <NetworkView addNetwork={this.add.bind(this)} network={network} updateParent={() => this.update()} />
                  </TabPane>
                ): null: null}
              </Tabs>        
          </Col>
          <Col span={4} className="header-row">
            <Select className='select-profile' value={store.getCurrentProfile() ? `${store.getCurrentProfile().name} ${store.getCurrentProfile().isLoaded ? '' : '(Not loaded)'}`: ''} onChange={value => this.changeProfile(value)}>
              {store.profiles.map((profile, i) => 
                <Option key={i} value={i}>{`${profile.name} ${profile.isLoaded ? '' : '(Not loaded)'}`}</Option>
              )}
              <Option key='add' value='add'>New profile ...</Option>
            </Select>
            <Modal
              title="Create a new profile"
              visible={this.state.addProfile}
              onCancel={this.cancelAddProfile.bind(this)}
              width="70vw"
              footer={null}
            >
              <CreateProfilePage onReady={this.closeAddProfile.bind(this)} />
            </Modal>
          </Col>
          <Col span={2} className="header-row" style={{height: '50px'}}>
            <Tooltip placement='bottom' title='Reload profile'>
              <Button
                className='navbar-button'
                onClick={() => {
                  store.getCurrentProfile().isLoaded = false;
                  this.changeProfile(store.selectedProfile.toString());
                }}
              >
                <Icon         
                  className="trigger"
                  type='reload'       
                />
              </Button>
            </Tooltip>
          </Col>
          <Col span={2} className="header-row" style={{height: '50px'}}>
            <Button
              className='navbar-button'
              onClick={() => this.openSettings()}
            >
              <Icon         
                className="trigger"
                type='setting'       
              />
            </Button>
            <Modal
              title="Settings"
              visible={this.state.showSettings}
              onOk={this.closeSettings.bind(this)}
              onCancel={this.cancelSettings.bind(this)}
            >
              <Form>
                <OptionField label='Name' type='text' onChange={value => this.setState({name: value})} onApply={() => {}} value={this.state.name} />
                <OptionField label='Path' type='text' onChange={value => this.setState({path: value})} onApply={() => {}} value={this.state.path} />
              </Form>
            </Modal>
          </Col>
          <Col span={2} className="header-row" style={{height: '50px'}}>
            <Button
              className='navbar-button'
              onClick={() => this.toggle()}
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
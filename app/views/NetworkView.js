// @flow

import React, {Component} from 'react';
import {Layout, Menu, List, Collapse, Input, Button, Row, Col, Icon, Select, Card, Avatar, Form, Tabs, Checkbox} from 'antd';
import Network, { NetworkLayouts } from '../classes/Network';
import { observer } from 'mobx-react';
import Node from '../classes/Node';
import Stack from '../classes/Stack';
import { stores } from '../App';
import Recipe from '../classes/Recipe';
import OptionField, { formItemLayout } from './components/OptionField';
import ItemList from './components/ItemList';
import EditableList from './components/EditableList';
const SubMenu = Menu.SubMenu;
const { Header, Content, Footer, Sider } = Layout;
const Option = Select.Option;
const InputGroup = Input.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { Meta } = Card;

import style from './style/NetworkView.css';
import { NetworkAlgorithms } from '../classes/NetworkAlgorithm/NetworkAlgorithms';

type Props = {
  network: Network,
  updateParent: any,
  addNetwork: Function
}

type State = {
  collapsed: boolean,
  whitelistAdd: string, 
  blacklistAdd: string,
  target: string,
  selectedNode: Node,
  selectedRecipes: Recipe[],
  limit: number,
  depth: number,
  targetAmount: number,
  blacklistInput: ?Input,
  whitelistInput: ?Input,
  selectedAlgorithm: number,
  selectedLayout: number,
  physicsEnabled: boolean
}

@observer
export default class NetworkView extends Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      collapsed: false,
      whitelistAdd: '',
      blacklistAdd: '',
      target: '',
      limit: this.props.network.limit,
      depth: this.props.network.depth,
      targetAmount: this.props.network.target.amount,
      selectedNode: new Node(new Stack(['']), -1),
      selectedRecipes: [],
      blacklistInput: null,
      whitelistInput: null,
      selectedAlgorithm: this.props.network.algorithm,
      selectedLayout: this.props.network.selectedLayout,
      physicsEnabled: this.props.network.visOptions.physics.enabled
    }


    //More hacks! Working better than expected
    window.onresize = () => {
      if (this.props.network.collapsed) {
        return;
      }

      this.props.network.collapsed = true;
      this.props.network.collapsed = false;
    }
  }

  addWhitelistItem() {
    this.props.network.addWhitelistItem(new RegExp(this.state.whitelistAdd, "i"));
    this.regenerate();
    if (this.state.whitelistInput) {
      this.state.whitelistInput.input.value = "";
      this.state.whitelistInput.focus();
    }
    this.setState({whitelistAdd: ''});
  }

  addBlacklistItem(input: any) {
    this.props.network.addBlacklistItem(new RegExp(this.state.blacklistAdd, "i"));
    this.regenerate();

    if (this.state.blacklistInput) {
      this.state.blacklistInput.input.value = "";
      this.state.blacklistInput.focus();
    }
    
    this.setState({blacklistAdd: ''});
  }

  removeWhitelistItem(item: string) {
    this.props.network.removeWhitelistItem(item);
    this.regenerate();
  }

  removeBlacklistItem(item: string) {
    this.props.network.removeBlacklistItem(item);
    this.regenerate();
  }

  setTarget(target: string) {
    this.props.network.setTarget(target);
    this.props.updateParent();
    this.setState({target});
  }

  setLimit(limit: number) {
    this.props.network.setLimit(limit);
    this.setState({limit});
  }

  setDepth(depth: number) {
    this.props.network.setDepth(depth);
    this.setState({depth});
  }

  setTargetAmount(targetAmount: number) {
    this.props.network.setTargetAmount(targetAmount);
    this.setState({targetAmount});
  }

  setAlgorithm(index: number) {
    this.props.network.setAlgorithm(index);
    this.setState({selectedAlgorithm: index})
    this.regenerate();
  }

  setLayout(index: number) {
    this.props.network.setLayout(index);
    this.setState({selectedLayout: index})
    this.regenerate();
  }

  togglePhysics() {
    this.props.network.applyNetworkOptions(options => options.physics.enabled = !options.physics.enabled);
    this.setState({physicsEnabled: this.props.network.visOptions.physics.enabled});
  }

  regenerate() {
    if (this.props.network.target.names[0] == '') {
      return;
    }

    this.props.network.generate();
    this.props.network.visReload();
    
    this.props.network.setOnclickCallback((node, edges) =>  {
      if (node) {
        this.setState({selectedNode: node})
      } else {
        this.setState({selectedNode: new Node(new Stack(['']), -1)})
      }
      
      if (edges) {
        let recipes = edges.map(edge => edge.recipe).reduce((total, current) => {
          if (!total.some(recipe => recipe.id == current.id)) {
            total.push(current);
          }
  
          return total;
        }, [])
        this.setState({selectedRecipes: recipes})
      }    
     });

    this.props.network.setOnDoubleclickCallback((node, edges) => {
      if (node) {
        /*node.stack.names.forEach(name => {
          this.props.network.addBlacklistItem(new RegExp(name, "i"));
        })*/
        this.props.addNetwork(node.stack, this.props.network.serialize());
        this.regenerate();
      }
    });
  }

  componentWillMount() {
    this.props.network.setAlgorithm(this.state.selectedAlgorithm);
    this.props.network.setLayout(this.state.selectedLayout);
    this.setState({target: this.props.network.getTarget});
  }

  componentDidMount() {
    this.regenerate();
  }

  render() {
    return (
      <Layout>
        <Content style={{height:"93vh", background: '#fff'}} id={this.props.network.id}>

        </Content>
        <Sider
          collapsible
          trigger={null}
          collapsedWidth={0}
          collapsed={this.props.network.collapsed}
          width={window.innerWidth / 4}
          style={{background: '#fff', overflow: "auto", position: "fixed", right: "0" }}
        >
          <Collapse bordered={false} onChange={() => {}} style={{overflow: "auto", overflowX: "hidden", maxHeight: '93vh', background: 'rgba(0, 0, 0, 0)'}}>
            {/* 
              ***
              Target
              ***
            */}
            <Collapse.Panel header="Target">    
              <Form>
                {/*<OptionField label='Target' type='text' onChange={this.setTarget.bind(this)} onApply={this.regenerate.bind(this)} value={this.state.target} />*/}
                <FormItem {...formItemLayout} label="Target">
                  <Select
                    showSearch
                    filterOption={false}
                    style={{ width: '100%' }}
                    placeholder="Search an item"
                    value={this.state.target}
                    onSearch={value => this.setTarget(value)}
                    onChange={value => {this.setTarget(value); this.regenerate()}}
                    onSelect={value => {this.setTarget(value); this.regenerate()}}
                  >
                    {Object.entries(stores.nameMaps.list)
                      .filter(item => (this.state.target.toLowerCase().replace('@', '').split(' ').every(input => (item[0].includes(input) || item[1].toLowerCase().includes(input)))
                        /*|| (this.state.target.includes("@"))*/) 
                        && this.state.target !== '')
                      .slice(0, 20).map((item, i) => 
                      <Option key={i} value={item[0]}>{item[1]}</Option>
                    )}
                  </Select>
                </FormItem>
                <OptionField label='Amount' type='number' onChange={this.setTargetAmount.bind(this)} onApply={this.regenerate.bind(this)} value={this.state.targetAmount.toString()} />
              </Form>
            </Collapse.Panel>

            {/* 
              ***
              Algorithm
              ***
            */}
            <Collapse.Panel header="Algorithm">
              <Form>
                <FormItem {...formItemLayout} label="Algorithm">
                  <Select
                    placeholder="Select an algorithm"
                    onSelect={key => this.setAlgorithm(key)}
                    value={NetworkAlgorithms[this.state.selectedAlgorithm].name}
                  >
                    {NetworkAlgorithms.map((alg, index) => 
                      <Option key={index}>{alg.name}</Option>
                    )}
                  </Select>
                </FormItem>
                <OptionField label='Limit' type='number' onChange={this.setLimit.bind(this)} onApply={this.regenerate.bind(this)} value={this.state.limit.toString()} />
                <OptionField label='Depth' type='number' onChange={this.setDepth.bind(this)} onApply={this.regenerate.bind(this)} value={this.state.depth.toString()} />
              </Form>
            </Collapse.Panel>

            {/*
              ***
              Network
              ***
            */}
            <Collapse.Panel header="Network">    
              <Form>
                <FormItem {...formItemLayout} label="Layout">
                  <Select
                    placeholder="Select a layout"
                    onSelect={key => this.setLayout(key)}
                    value={NetworkLayouts[this.state.selectedLayout].name}
                  >
                    {NetworkLayouts.map((lay, index) => 
                      <Option key={index}>{lay.name}</Option>
                    )}
                  </Select>
                </FormItem>
                <Checkbox checked={this.state.physicsEnabled} onChange={() => this.togglePhysics()}>Enable physics</Checkbox>
                <br /><br />
                <p style={{fontSize: '12px'}}>More options coming soon! :) </p>
              </Form>
            </Collapse.Panel>
          

            {/* 
              ***
              Blacklist
              ***
            */}
            <Collapse.Panel header="Blacklist">       
              <EditableList 
                items={this.props.network.getBlacklist} 
                onAdd={this.addBlacklistItem.bind(this)} 
                onRemove={this.removeBlacklistItem.bind(this)} 
                onChange={x => this.setState({blacklistAdd: x})} 
                current={this.state.blacklistAdd}
                inputRef={el => this.state.blacklistInput = el}
              />
            </Collapse.Panel>
            
            {/* 
              ***
              Whitelist
              ***
            */}
            <Collapse.Panel header="Whitelist">
              <EditableList 
                items={this.props.network.getWhitelist} 
                onAdd={this.addWhitelistItem.bind(this)} 
                onRemove={this.removeWhitelistItem.bind(this)} 
                onChange={x => this.setState({whitelistAdd: x})} 
                current={this.state.whitelistAdd}
                inputRef={el => this.state.whitelistInput = el}
              />
            </Collapse.Panel>    

            {/* 
              ***
              Actions
              ***
            */}
            <Collapse.Panel header="Actions" className="actions">
              <Button onClick={() => this.regenerate()}>Reload Network</Button><br />
              <Button onClick={() => {this.props.network.newSeed(); this.regenerate()}}>Randomize seed</Button>
            </Collapse.Panel>

            {/* 
              ***
              Selected Node
              ***
            */}
            {this.state.selectedNode.stack && this.state.selectedNode.id !== -1 ? 
              <Collapse.Panel header="Selected Node">
                <ItemList onClick={item => this.props.addNetwork(item, this.props.network.serialize())} label="" items={[this.state.selectedNode.stack]} />
              </Collapse.Panel> : ''
            }

            {/* 
              ***
              Selected Recipe
              ***
            */}
            {this.state.selectedRecipes.length > 0 ? 
              <Collapse.Panel header="Selected Recipes">
                <Tabs
                  defaultActiveKey="0"
                > 
                  {this.state.selectedRecipes.map((recipe, i) =>    
                    <TabPane tab={<Avatar src={
                      `file://${stores.settings.getCurrentProfile().path}/config/jeiexporter/items/${recipe.outputs[0].names[0].replace(/:/g, "_")}.png`
                    } />} key={i}>
                      <ItemList onClick={item => this.props.addNetwork(item, this.props.network.serialize())} label="Catalysts" items={recipe.catalysts} />
                      <ItemList onClick={item => this.props.addNetwork(item, this.props.network.serialize())} label="Inputs" items={recipe.inputs.filter(item => item.names.length > 0 && item.amount > 0)} />
                      <ItemList onClick={item => this.props.addNetwork(item, this.props.network.serialize())} label="Outputs" items={recipe.outputs.filter(item => item.names.length > 0 && item.amount > 0)} />   
                    </TabPane>
                  )}
                </Tabs>
              </Collapse.Panel> : ''
            }
            
          </Collapse>
        </Sider>
      </Layout>
    )
  }
}
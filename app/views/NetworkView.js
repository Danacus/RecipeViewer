// @flow

import React from 'react';
import { Layout, Menu, Collapse, Input, Button, Select, Card, Avatar, Form, Tabs, Checkbox, Spin } from 'antd';
import Network, { NetworkLayouts } from '../classes/Network';
import Node from '../classes/Node';
import Stack from '../classes/Stack';
import { store } from '../App';
import Recipe from '../classes/Recipe';
import OptionField from './components/OptionField';
import OptionSelect, { formItemLayout } from './components/OptionSelect';
import ItemList from './components/ItemList';
const SubMenu = Menu.SubMenu;
const { Header, Content, Footer, Sider } = Layout;
const Option = Select.Option;
const InputGroup = Input.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { Meta } = Card;
import style from './style/NetworkView.css';
import { NetworkAlgorithms } from '../classes/NetworkAlgorithm/NetworkAlgorithms';
import { observer } from 'mobx-react';
import ItemSelect from './components/ItemSelect';
import FilterList from './components/FilterList';
import FilterItem from '../classes/FilterItem';
import CategoryList from './components/CategoryList';
import CategorySelect from './components/CategorySelect';
import ModSelect from './components/ModSelect';

type Props = {
  network: Network,
  updateParent: any,
  addNetwork: Function
}

type State = {
  collapsed: boolean,
  filterAdd: string[],
  selectedNode: ?Node,
  selectedRecipes: Recipe[],
  blacklistInput: ?Input,
  whitelistInput: ?Input,
}

const collapseStyle = {
  overflow: "auto", 
  overflowX: "hidden", 
  maxHeight: '93vh', 
  background: 'rgba(0, 0, 0, 0)'
}

let networkViewInstance;

@observer
export default class NetworkView extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    networkViewInstance = this;

    this.state = {
      collapsed: false,
      filterAdd: ['', '', '', ''],
      selectedNode: null,
      selectedRecipes: [],
      blacklistInput: null,
      whitelistInput: null,
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

  setFilterState(index: number, value: string) {
    let newFilter = this.state.filterAdd; 
    newFilter[index] = value; 
    this.setState({filterAdd: newFilter})
  }

  filterAdd(index: number, item: FilterItem) {
    this.props.network.filter.add(index, item);
  }

  filterRemove(index: number, item: FilterItem) {
    this.props.network.filter.remove(index, item);
  }

  toggleInverse(index: number, item: FilterItem) {
    this.props.network.filter.toggleInverse(index, item);
    this.setState({});
  }

  setTarget(target: string) {
    this.props.network.setTarget(target);
    this.props.updateParent();
  }

  setAlgorithm(index: number) {
    this.props.network.setAlgorithm(index);
  }

  setLayout(index: number) {
    this.props.network.setLayout(index);
  }

  togglePhysics() {
    this.props.network.applyNetworkOptions(options => options.physics.enabled = !options.physics.enabled);
  }

  regenerate() {
    if (this.props.network.target.names[0] == '') {
      return;
    }

    this.props.network.generate().then(() => {
      this.props.network.setOnclickCallback((node, edges) =>  {
        if (node) {
          this.setState({selectedNode: node})
        } else {
          this.setState({selectedNode: null})
        }
        
        if (edges) {
          let recipes = edges.map(edge => edge.recipe).reduce((total, current) => {
            if (!total.some(recipe => recipe.id == current.id)) {
              total.push(current);
            }
    
            return total;
          }, [])
          this.setState({selectedRecipes: recipes})
        } else {
          this.setState({selectedRecipes: []})
        }    
       });
  
      this.props.network.setOnDoubleclickCallback((node, edges) => {
        if (node) {
          this.props.addNetwork(node.stack, this.props.network.serialize());
        }
      });
    });
  }

  componentDidMount() {
    this.setState({});
  }

  render() {
    return (
      <Layout className='nv-layout'>
        {this.props.network.isLoading ? 
          <div className='loading-div'>
            <div className='blur' />
            <div className='spin'>
              <Spin size='large' /><br />
              {store.tasks.map((task, i) => 
                <span key={i}>{task}<br /></span>
              )}
            </div>
          </div> 
        : <p></p>}
        <Content style={{height:"calc(100vh - 50px)", background: '#fff'}} id={this.props.network.id}>
          
        </Content>
        <Sider
          collapsible
          trigger={null}
          collapsedWidth={0}
          collapsed={this.props.network.collapsed}
          width={window.innerWidth / 4}
          style={{background: '#fff', overflow: "auto", position: "fixed", right: "0", zIndex: "3" }}
        >
          <Collapse bordered={false} style={collapseStyle}>
            {/* 
              ***
              Target
              ***
            */}
            <Collapse.Panel header="Target">    
              <Form>
                <ItemSelect label="Target" placeholder="Search an item" value={this.props.network.target.names[0]} onSearch={this.setTarget.bind(this)} onSelect={this.setTarget.bind(this)} onChange={this.setTarget.bind(this)} />
                <OptionField label='Amount' type='number' onChange={this.props.network.setTargetAmount.bind(this.props.network)} onApply={this.regenerate.bind(this)} value={this.props.network.target.amount.toString()} />
              </Form>
            </Collapse.Panel>

            {/* 
              ***
              Algorithm
              ***
            */}
            <Collapse.Panel header="Algorithm">
              <Form>
                <OptionSelect label='Algorithm' placeholder='Select an algorithm' onSelect={this.setAlgorithm.bind(this)} current={this.props.network.algorithm} items={NetworkAlgorithms.map(alg => alg.name())} />
                <OptionField label='Limit' type='number' onChange={this.props.network.setLimit.bind(this.props.network)} onApply={this.regenerate.bind(this)} value={this.props.network.limit.toString()} />
                <OptionField label='Depth' type='number' onChange={this.props.network.setDepth.bind(this.props.network)} onApply={this.regenerate.bind(this)} value={this.props.network.depth.toString()} />
              </Form>
            </Collapse.Panel>

            {/*
              ***
              Network
              ***
            */}
            <Collapse.Panel header="Network">    
              <Form>
                <OptionSelect label='Layout' placeholder='Select a layout' onSelect={this.setLayout.bind(this)} current={this.props.network.selectedLayout} items={NetworkLayouts.map(lay => lay.name)} />
                <Checkbox checked={this.props.network.visOptions.physics.enabled} onChange={() => this.togglePhysics()}>Enable physics</Checkbox>
                <br /><br />
                <p style={{fontSize: '12px'}}>More options coming soon! :) </p>
              </Form>
            </Collapse.Panel>

            {/* 
              ***
              Filter
              ***
            */}
            <Collapse.Panel header="Filter">
              <Collapse bordered={false} style={collapseStyle}>
                <Collapse.Panel header="Items">    
                  <Form>
                    <FilterList 
                      nameMap={store.getCurrentProfile().nameMaps.titles} 
                      onChange={item => this.toggleInverse(0, item)} 
                      onRemove={item => this.filterRemove(0, item)} 
                      items={this.props.network.filter.lists[0]} 
                    />
                    <ItemSelect 
                      label="Add" 
                      placeholder="Search an item" 
                      value={this.state.filterAdd[0]} 
                      onSearch={value => this.setFilterState(0, value)} 
                      onChange={value => this.setFilterState(0, value)} 
                      onSelect={value => this.filterAdd(0, new FilterItem(value))} 
                    />
                  </Form>
                </Collapse.Panel>
              </Collapse>    
              <Collapse bordered={false} style={collapseStyle}>
                <Collapse.Panel header="Catalysts">    
                  <Form>
                    <FilterList 
                      nameMap={store.getCurrentProfile().nameMaps.titles} 
                      onChange={item => this.toggleInverse(1, item)} 
                      onRemove={item => this.filterRemove(1, item)} 
                      items={this.props.network.filter.lists[1]} 
                    />
                    <ItemSelect 
                      label="Add" 
                      placeholder="Search an item" 
                      value={this.state.filterAdd[1]} 
                      onSearch={value => this.setFilterState(1, value)} 
                      onChange={value => this.setFilterState(1, value)} 
                      onSelect={value => this.filterAdd(1, new FilterItem(value))} 
                    />
                  </Form>
                </Collapse.Panel>
              </Collapse>
              <Collapse bordered={false} style={collapseStyle}>
                <Collapse.Panel header="Mods">    
                  <Form>
                    <FilterList 
                      nameMap={store.getCurrentProfile().nameMaps.mods} 
                      onChange={item => this.toggleInverse(2, item)} 
                      onRemove={item => this.filterRemove(2, item)} 
                      items={this.props.network.filter.lists[2]} 
                    />
                    <ModSelect 
                      label="Add" 
                      placeholder="Search a mod" 
                      value={this.state.filterAdd[2]} 
                      onSearch={value => this.setFilterState(2, value)} 
                      onChange={value => this.setFilterState(2, value)} 
                      onSelect={value => this.filterAdd(2, new FilterItem(value))} 
                    />
                  </Form>
                </Collapse.Panel>
              </Collapse>
              <Collapse bordered={false} style={collapseStyle}>
                <Collapse.Panel header="Categories">    
                  <Form>
                    <CategoryList 
                      onChange={item => this.toggleInverse(3, item)} 
                      onRemove={item => this.filterRemove(3, item)} 
                      items={this.props.network.filter.lists[3]} 
                    />
                    <CategorySelect 
                      label="Add" 
                      placeholder="Search a category" 
                      value={this.state.filterAdd[3]} 
                      onSearch={value => this.setFilterState(3, value)} 
                      onChange={value => this.setFilterState(3, value)} 
                      onSelect={value => this.filterAdd(3, new FilterItem(value))} 
                    />
                  </Form>
                </Collapse.Panel>
              </Collapse>
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
            {this.state.selectedNode ? 
              <Collapse.Panel header="Selected Node">
                <ItemList onClick={item => this.props.addNetwork(item, this.props.network.serialize())} label="" items={[new Stack(this.state.selectedNode.stack.names, this.state.selectedNode.amount)]} />
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
                      `file://${store.getCurrentProfile().path}/config/jeiexporter/items/${recipe.outputs[0].names[0].replace(/:/g, "_")}.png`
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

export { networkViewInstance }
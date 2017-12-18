// @flow

import React, {Component} from 'react';
import {Layout, Menu, List, Collapse, Input, Button, Row, Col, Icon, Select, Card, Avatar, Form} from 'antd';
import Network from '../classes/Network';
import { observer } from 'mobx-react';
import Node from '../classes/Node';
import Stack from '../classes/Stack';
import { stores } from '../App';
import Recipe from '../classes/Recipe';
const SubMenu = Menu.SubMenu;
const { Header, Content, Footer, Sider } = Layout;
const Option = Select.Option;
const InputGroup = Input.Group;
const FormItem = Form.Item;
const { Meta } = Card;

import style from './style/NetworkView.css';

type Props = {
  network: Network,
  updateParent: any
}

type State = {
  collapsed: boolean,
  whitelistAdd: string, 
  blacklistAdd: string,
  target: string,
  selectedNode: Node,
  selectedRecipe: any,
  limit: number,
  depth: number,
  targetAmount: number
}

const formItemLayout = {
  labelCol: {
    sm: { span: 6 },
  },
  wrapperCol: {
    sm: { span: 18 },
  },
};

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
      selectedRecipe: null
    }
  }
  onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  addWhitelistItem() {
    this.props.network.addWhitelistItem(new RegExp(this.state.whitelistAdd, "i"));
    this.regenerate();
    this.refs.whitelistInput.value = "";
    this.refs.whitelistInput.focus();
    this.setState({whitelistAdd: ''});
  }

  addBlacklistItem() {
    this.props.network.addBlacklistItem(new RegExp(this.state.blacklistAdd, "i"));
    this.regenerate();
    this.refs.blacklistInput.value = "";
    this.refs.blacklistInput.focus();
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
    this.regenerate();
  }

  regenerate() {
    this.props.network.generate();
    this.props.network.visReload();
    
    this.props.network.setOnclickCallback((node, edge) =>  {
      if (node) {
        this.setState({selectedNode: node})
      } else {
        this.setState({selectedNode: new Node(new Stack(['']), -1)})
      }
      
      if (edge) {
        this.setState({selectedRecipe: edge.recipe})
      } else {
        this.setState({selectedRecipe: null});
      }
     });

    this.props.network.setOnDoubleclickCallback(node => {
      if (node) {
        node.stack.names.forEach(name => {
          this.props.network.addBlacklistItem(new RegExp(name, "i"));
        })
        this.regenerate();
      }
    });
  }

  componentWillMount() {
    this.setState({target: this.props.network.getTarget});
    console.log(this.state)
  }

  render() {
    return (
      <Layout>
        <Content style={{height:"93vh", background: '#fff'}} id={this.props.network.id}>

        </Content>
        <Sider
          width="400"
          style={{ background: '#fff', overflow: "auto", position: "fixed", right: "0" }}
        >
          <Collapse onChange={() => {}} style={{overflow: "auto", maxHeight: '93vh'}}>
            {/* 
              ***
              Target
              ***
            */}
            <Collapse.Panel header="Target">    
              <Form>
                <FormItem {...formItemLayout} label="Target">
                  <Input onChange={e => this.setTarget(e.target.value)} value={this.state.target} onPressEnter={() => this.regenerate()}></Input>
                </FormItem>
                <FormItem {...formItemLayout} label="Amount">
                  <Input type="number" onChange={e => this.setTargetAmount(e.target.value)} value={this.state.targetAmount} onPressEnter={() => this.regenerate()}></Input>
                </FormItem>
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
                  >
                    {this.props.network.listAllAlgortihms.map((alg, index) => 
                      <Option key={index}>{alg}</Option>
                    )}
                  </Select>
                </FormItem>
                <FormItem {...formItemLayout} label="Limit">
                  <Input type="number" onChange={e => this.setLimit(e.target.value)} value={this.state.limit} onPressEnter={() => this.regenerate()} />
                </FormItem>
                <FormItem {...formItemLayout} label="Depth">
                  <Input type="number" onChange={e => this.setDepth(e.target.value)} value={this.state.depth} onPressEnter={() => this.regenerate()}></Input>
                </FormItem>
              </Form>
            </Collapse.Panel>

            {/* 
              ***
              Blacklist
              ***
            */}
            <Collapse.Panel header="Blacklist">
              <List
                size="small"
                bordered
                dataSource={this.props.network.getBlacklist}
                renderItem={item => (
                  <List.Item actions={[<Icon type="close" onClick={() => this.removeBlacklistItem(item)} />]}>         
                    {item}
                  </List.Item>
                )}
                footer={(
                  <Row>
                    <Col span={18}>
                      <Input
                        placeholder="Add Item"
                        onChange={e => this.setState({blacklistAdd: e.target.value})}
                        value={this.state.blacklistAdd}
                        ref="blacklistInput"
                        onPressEnter={() => this.addBlacklistItem()}
                      />
                    </Col>
                    <Col span={6}>
                      <Button onClick={() => this.addBlacklistItem()}>Add</Button>
                    </Col> 
                  </Row>
                )}
              />
            </Collapse.Panel>
            
            {/* 
              ***
              Whitelist
              ***
            */}
            <Collapse.Panel header="Whitelist">
              <List
                size="small"
                bordered
                dataSource={this.props.network.getWhitelist}
                renderItem={item => (
                  <List.Item actions={[<Icon type="close" onClick={() => this.removeWhitelistItem(item)} />]}>         
                    {item}
                  </List.Item>
                )}
                footer={(
                  <Row>
                    <Col span={18}>
                      <Input
                        placeholder="Add Item"
                        onChange={e => this.setState({whitelistAdd: e.target.value})}
                        value={this.state.whitelistAdd}
                        ref="whitelistInput"
                        onPressEnter={() => this.addWhitelistItem()}
                      />
                    </Col>
                    <Col span={6}>
                      <Button onClick={() => this.addWhitelistItem()}>Add</Button>
                    </Col> 
                  </Row>
                )}
              />
            </Collapse.Panel>    

            {/* 
              ***
              Actions
              ***
            */}
            <Collapse.Panel header="Actions">
              <Button onClick={() => this.regenerate()}>Reload Network</Button>
            </Collapse.Panel>

            {/* 
              ***
              Selected Node
              ***
            */}
            {this.state.selectedNode.stack && this.state.selectedNode.id !== -1 ? 
              <Collapse.Panel header="Selected Node">
                <List
                  itemLayout="horizontal"
                  dataSource={[this.state.selectedNode]}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={item.image} />}
                        title={stores.nameMaps.list[item.stack.names[0]]}
                        description={item.stack.names[0]}
                      />
                    </List.Item>
                  )}
                />
              </Collapse.Panel> : ''
            }

            {/* 
              ***
              Selected Recipe
              ***
            */}
            {this.state.selectedRecipe ? 
              <Collapse.Panel header="Selected Recipe">
                <h3>Catalysts</h3>
                <List
                  itemLayout="horizontal"
                  dataSource={this.state.selectedRecipe.catalysts}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={
                          `file://${stores.settings.list.path}/config/jeiexporter/items/${item.names[0].replace(/:/g, "_")}.png`
                        } />}
                        title={stores.nameMaps.list[item.names[0]]}
                        description={item.names[0]}
                      />
                    </List.Item>
                  )}
                />

                <h3>Inputs</h3>
                <List
                  itemLayout="horizontal"
                  dataSource={this.state.selectedRecipe.inputs.filter(item => item.names.length > 0 && item.amount > 0)}
                  renderItem={item => (
                    <List.Item>
                      {console.log(item)}
                      <List.Item.Meta
                        avatar={<Avatar src={
                          `file://${stores.settings.list.path}/config/jeiexporter/items/${item.names[0].replace(/:/g, "_")}.png`
                        } />}
                        title={item.amount + ' x ' + stores.nameMaps.list[item.names[0]]}
                        description={item.names[0]}
                      />
                    </List.Item>
                  )}
                />

                <h3>Outputs</h3>
                <List
                  itemLayout="horizontal"
                  dataSource={this.state.selectedRecipe.outputs.filter(item => item.names.length > 0 && item.amount > 0)}
                  renderItem={item => (
                    <List.Item>
                      {console.log(item)}
                      <List.Item.Meta
                        avatar={<Avatar src={
                          `file://${stores.settings.list.path}/config/jeiexporter/items/${item.names[0].replace(/:/g, "_")}.png`
                        } />}
                        title={item.amount + ' x ' + stores.nameMaps.list[item.names[0]]}
                        description={item.names[0]}
                      />
                    </List.Item>
                  )}
                />
              </Collapse.Panel> : ''
            }
            
          </Collapse>
        </Sider>
      </Layout>
    )
  }
}
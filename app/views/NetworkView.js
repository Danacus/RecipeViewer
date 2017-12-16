// @flow

import React, {Component} from 'react';
import {Layout, Menu, List, Collapse, Input, Button, Row, Col, Icon, Select, Card} from 'antd';
import Network from '../classes/Network';
import { observer } from 'mobx-react';
import Node from '../classes/Node';
import Stack from '../classes/Stack';
import { stores } from '../App';
const SubMenu = Menu.SubMenu;
const { Header, Content, Footer, Sider } = Layout;
const Option = Select.Option;
const { Meta } = Card;


type Props = {
  network: Network,
  updateParent: any
}

type State = {
  collapsed: boolean,
  whitelistAdd: string, 
  blacklistAdd: string,
  target: string,
  selectedNode: Node
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
      selectedNode: new Node(new Stack(['']), -1)
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

  setAlgorithm(index: number) {
    this.props.network.setAlgorithm(index);
    this.regenerate();
  }

  regenerate() {
    this.props.network.generate();
    this.props.network.visReload();
    
    this.props.network.setOnclickCallback(node => node ? 
      this.setState({selectedNode: node}) : 
      this.setState({selectedNode: new Node(new Stack(['']), -1)})
    );

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
            <Collapse.Panel header="Target">
              <Input onChange={e => this.setTarget(e.target.value)} value={this.state.target} onPressEnter={() => this.regenerate()}></Input>
            </Collapse.Panel>

            <Collapse.Panel header="Algorithm">
              <Select
                placeholder="Select an algorithm"
                style={{width: "300px"}}
                onSelect={key => this.setAlgorithm(key)}
              >
                {this.props.network.listAllAlgortihms.map((alg, index) => 
                  <Option key={index}>{alg}</Option>
                )}
              </Select>
            </Collapse.Panel>

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

            <Collapse.Panel header="Actions">
              <Button onClick={() => this.regenerate()}>Reload Network</Button>
            </Collapse.Panel>

            {this.state.selectedNode.id !== -1 ? 
              <Collapse.Panel header="Selected Node">
                <Card
                  style={{ width: 200, height: 245 }}
                  cover={<img src={this.state.selectedNode.image} style={{height: "140px", width: "140px", margin: "auto", marginTop: "5px"}} />}
                >
                  <Meta
                    title={stores.nameMaps.list[this.state.selectedNode.stack.names[0]]}
                    description={this.state.selectedNode.stack.names[0]}
                  />
                </Card>
              </Collapse.Panel> : ''
            }
            
          </Collapse>
        </Sider>
      </Layout>
    )
  }
}
import React, {PropTypes, Component} from 'react';
import { observer } from 'mobx-react';
import {Link} from 'react-router-dom';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

@observer
class HomePage extends Component {

  componentWillMount() {

  }

  componentDidMount() {

  }

  render() {
    return (
      <Tabs defaultActiveKey="1" onChange={() => {}}>
        {this.props.networks.list.map((network, index) => 
          <TabPane tab={network.target.names[0]} key={index}>This is a network</TabPane>
        )}
      </Tabs>
    );
  }
}

export default HomePage;

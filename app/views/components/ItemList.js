// @flow

import React, { Component } from 'react';
import { List, Avatar } from 'antd';
import Stack from '../../classes/Stack';
import { stores } from '../../App';

type Props = {
  items: Array<Stack>,
  label: string
}

export default class ItemList extends Component<Props> {
  render() {return (
    <div>
      <h3>{this.props.label}</h3>
        <List
          itemLayout="horizontal"
          dataSource={this.props.items}
          renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={
                `file://${stores.settings.getCurrentProfile().path}/config/jeiexporter/items/${item.names[0].replace(/:/g, "_")}.png`
              } />}
              title={item.amount > 0 ? item.amount + ' x ' + stores.nameMaps.list[item.names[0]] : stores.nameMaps.list[item.names[0]]}
              description={item.names[0]}
              />
            </List.Item>
          )}
        />
    </div>
  )}
}
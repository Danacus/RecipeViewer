// @flow

import React, { Component } from 'react';
import { List, Avatar, Icon } from 'antd';
import Stack from '../../classes/Stack';
import { stores } from '../../App';

type Props = {
  mods: Array<string>,
  label: string,
  onClick: Function,
  onRemove: ?Function
}

export default class ModList extends Component<Props> {
  render() {return (
    <div>
      <h3>{this.props.label}</h3>
        <List
          size="small"
          bordered={false}
          dataSource={this.props.mods}
          renderItem={mod => (
          <List.Item onClick={() => this.props.onClick(mod)} actions={this.props.onRemove ? [<Icon type="close" onClick={() => this.props.onRemove(mod)} />]: []}>
            <List.Item.Meta
              title={stores.nameMaps.mods[mod]}
              description={mod}
              />
            </List.Item>
          )}
        />
    </div>
  )}
}
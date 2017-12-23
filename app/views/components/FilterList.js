// @flow

import React, { Component } from 'react';
import { List, Avatar, Icon, Checkbox } from 'antd';
import Stack from '../../classes/Stack';
import { stores } from '../../App';
import FilterItem from '../../classes/FilterItem';

type Props = {
  items: Array<FilterItem>,
  nameMap: Object,
  onRemove: Function,
  onChange: Function
}

export default class FilterList extends Component<Props> {
  render() {return (
    <div>
        <List
          size="small"
          bordered={false}
          dataSource={this.props.items}
          renderItem={item => (
          <List.Item actions={[<Checkbox onChange={e => this.props.onChange(item)} checked={!item.inverse}></Checkbox>, <Icon type="close" onClick={() => this.props.onRemove(item)} />]}>
            <List.Item.Meta
              title={this.props.nameMap[item.value]}
              description={item.value}
              />
            </List.Item>
          )}
        />
    </div>
  )}
}
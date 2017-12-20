// @flow

import React, { Component } from 'react';
import { List, Row, Col, Input, Icon, Button } from 'antd';
import Stack from '../../classes/Stack';
import { stores } from '../../App';

type Props = {
  items: Array<string>,
  onAdd: Function,
  onRemove: Function,
  onChange: Function,
  current: string,
  inputRef: Function
}

export default class EditableList extends Component<Props> {
  render() {return (
    <List
      size="small"
      bordered={false}
      dataSource={this.props.items}
      renderItem={item => (
        <List.Item actions={[<Icon type="close" onClick={() => this.props.onRemove(item)} />]}>         
          {item}
        </List.Item>
      )}
      footer={(
        <Row gutter={8}>
          <Col span={18}>
            <Input
              placeholder="Add Item"
              onChange={e => this.props.onChange(e.target.value)}
              ref={input => this.props.inputRef(input)}
              onPressEnter={() => this.props.onAdd()}
            />
          </Col>
          <Col span={6}>
            <Button onClick={() => this.props.onAdd()}>Add</Button>
          </Col> 
        </Row>
      )}
    />
  )}
}
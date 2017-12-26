// @flow

import React, { Component } from 'react';
import { Input, Form } from 'antd';
const FormItem = Form.Item;
import { formItemLayout } from './OptionSelect';

type Props = {
  onChange: Function,
  onApply?: Function,
  value: string,
  type: string,
  label: string
}

export default class OptionField extends Component<Props> {
  render() {return (
    <FormItem {...formItemLayout} label={this.props.label}>
      <Input type={this.props.type} onChange={e => this.props.onChange(e.target.value)} value={this.props.value} onPressEnter={this.props.onApply}></Input>
    </FormItem>
  )}
}
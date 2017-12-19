// @flow

import React, { Component } from 'react';
import { Input, Form } from 'antd';
const FormItem = Form.Item;

type Props = {
  onChange: Function,
  onApply: Function,
  value: string,
  type: string,
  label: string
}

export const formItemLayout = {
  labelCol: {
    sm: { span: 6 },
  },
  wrapperCol: {
    sm: { span: 18 },
  },
};

export default class OptionField extends Component<Props> {
  render() {return (
    <FormItem {...formItemLayout} label={this.props.label}>
      <Input type={this.props.type} onChange={e => this.props.onChange(e.target.value)} value={this.props.value} onPressEnter={() => this.props.onApply()}></Input>
    </FormItem>
  )}
}
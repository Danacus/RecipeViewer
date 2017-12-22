// @flow

import React, { Component } from 'react';
import { Form, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

type Props = {
  onSelect: Function,
  current: number,
  items: Array<any>,
  label: string,
  placeholder: string
}

export const formItemLayout = {
  labelCol: {
    sm: { span: 6 },
  },
  wrapperCol: {
    sm: { span: 18 },
  },
};

export default class OptionSelect extends Component<Props> {
  render() {return (
    <FormItem {...formItemLayout} label={this.props.label}>
      <Select
        placeholder={this.props.placeholder}
        onSelect={key => this.props.onSelect(key)}
        value={this.props.items[this.props.current]}
        {...this.props.selectProps}
      >
        {this.props.items.map((item, index) => 
          <Option key={index}>{item}</Option>
        )}
      </Select>
    </FormItem>
  )}
}
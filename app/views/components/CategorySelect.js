// @flow

import React, { Component } from 'react';
import { Select, Form } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
import { formItemLayout } from './OptionSelect';
import { store } from '../../App';

type Props = {
  onSelect: Function,
  onChange: Function,
  onSearch: Function,
  value: string,
  placeholder: string,
  label: string
}

export default class CategorySelect extends Component<Props> {
  render() {return (
    <FormItem {...formItemLayout} label={this.props.label}>
      <Select
        showSearch
        filterOption={false}
        style={{ width: '100%' }}
        placeholder={this.props.placeholder}
        value={this.props.value}
        onSearch={value => this.props.onSearch(value)}
        onChange={value => this.props.onChange(value)}
        onSelect={value => this.props.onSelect(value)}
      >
        {store.getCurrentProfile().recipes.categories
          .filter(item => 
            item.toLowerCase().includes(this.props.value.toLowerCase())
            && this.props.value !== ''
          ).slice(0, 30).map((item, i) => 
          <Option key={i} value={item}>{item}</Option>
        )}
      </Select>
    </FormItem>
  )}
}
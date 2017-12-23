// @flow

import React, { Component } from 'react';
import { Select, Form } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
import { formItemLayout } from './OptionSelect';
import { stores } from '../../App';

type Props = {
  onSelect: Function,
  onChange: Function,
  onSearch: Function,
  value: string,
  placeholder: string,
  label: string
}

export default class ModSelect extends Component<Props> {
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
        {Object.entries(stores.nameMaps.mods)
          .filter(item => 
            this.props.value.toLowerCase().replace('@', '').split(' ').every(input => 
              item[0].includes(input) || (typeof item[1] == 'string' ? item[1] : '').toLowerCase().includes(input)
            ) 
            && this.props.value !== ''
          ).slice(0, 300).map((item, i) => 
          <Option key={i} value={item[0]}>{item[1]}</Option>
        )}
      </Select>
    </FormItem>
  )}
}
// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Steps, Icon, Form } from 'antd';
const Step = Steps.Step;
import Settings from '../stores/Settings';
import OptionField from './components/OptionField';
import { observer } from 'mobx-react';
import { store } from '../App';
import style from './style/SettingsPage.css'

type Props = {

}

type State = {
  name: string,
  path: string
}

@observer
class SettingsPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      name: store.getCurrentProfile().name,
      path: store.getCurrentProfile().path
    };
  }

  setName(name: string) {
    store.getCurrentProfile().name = name;
    this.setState({name});
  }

  setPath(path: string) {
    store.getCurrentProfile().path = path;
    this.setState({path});
  }

  saveSettings() {
    store.saveSettings();
  }

  render() {
    return (
      <div className="settings-container">
        <Link to="/" onClick={() => store.saveSettings()}><Icon className="close-icon" type="close" /></Link>
        <Layout className='settingsLayout'>
          <Form>
            <OptionField label='Name' type='text' onChange={this.setName.bind(this)} onApply={this.saveSettings.bind(this)} value={this.state.name} />
            <OptionField label='Path' type='text' onChange={this.setPath.bind(this)} onApply={this.saveSettings.bind(this)} value={this.state.path} />
          </Form>
        </Layout>
      </div>
    );
  }
}

export default SettingsPage;

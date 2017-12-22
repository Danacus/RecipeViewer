// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Steps, Icon, Form } from 'antd';
const Step = Steps.Step;
import Settings from '../stores/Settings';
import OptionField from './components/OptionField';


type Props = {
  settings: Settings 
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
      name: this.props.settings.getCurrentProfile().name,
      path: this.props.settings.getCurrentProfile().path
    };
  }

  setName(name: string) {
    this.props.settings.getCurrentProfile().name = name;
    this.setState({name});
  }

  setPath(path: string) {
    this.props.settings.getCurrentProfile().path = path;
    this.setState({path});
  }

  saveSettings() {
    this.props.settings.saveSettings();
  }

  render() {
    return (
      <div className="settings-container">
        <Link to="/" onClick={() => this.props.settings.saveSettings()}><Icon className="close-icon" type="close" /></Link>
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

// @flow

import React, {PropTypes, Component} from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Layout, Steps, Input, Row, Col, Button } from 'antd';
const Step = Steps.Step;
import { stores } from '../App';
import Settings from '../stores/Settings';
import style from './style/FirstLaunchPage.css';
import jetpack from 'fs-jetpack';
import electron from 'electron';
const app = electron.remote.app;

type Props = {
  settings: Settings 
}

type State = {
  steps: Array<any>,
  currentStep: number,
  path: string,
  inputValue: string,
  exporterInstalled: boolean
}

@observer
class FirstLaunchPage extends Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      path: '',
      steps: [],
      currentStep: 0,
      inputValue: '',
      exporterInstalled: false
    };
  }

  onChangePath(path: string) {
    this.setState({inputValue: path});
    jetpack.existsAsync(path + '/mods').then(result => {
      console.log(result);
      if (result == 'dir') {
        this.setState({path});
      } else {
        this.setState({path: ''});
      }
    });
  }

  browseDirectory() {
    electron.remote.dialog.showOpenDialog({title: "Select minecraft instance folder", properties: ['openDirectory']}, filePaths => {
      this.setState({inputValue: filePaths[0]});
      this.onChangePath(filePaths[0]);
    })
  }

  setCurrentStep(currentStep: number) {
    this.setState({currentStep});
    if (currentStep == 1) { 
      this.checkExporter();
    }
  }

  checkExporter() {
    jetpack.existsAsync(this.state.path + '/config/jeiexporter/exports').then(result => {
      if (result == 'dir') {
        this.setState({exporterInstalled: true});
        this.setCurrentStep(2);
        this.props.settings.setSettings({path: this.state.path});
        this.props.settings.saveSettings();
      } else {
        this.setState({exporterInstalled: false});
      }
    });
  }

  componentWillMount() { 
    this.setState({
      steps: [
        {
          title: "Select game directory",
          content: () => (
            <div>
              <Row>
                <Col span={18}><Input ref='pathInput' value={this.state.inputValue} onChange={(e) => this.onChangePath(e.target.value)} placeholder="Path to game data directory (with mods, config, ...)" /></Col>
                <Col span={3}><Button style={{width: "95%"}} onClick={() => this.browseDirectory()}>Browse</Button></Col>
                <Col span={3}><Button style={{width: "95%"}} type='primary' disabled={this.state.path == ''} onClick={() => this.setCurrentStep(1)}>Next</Button></Col>
              </Row>      
            </div>
          )
        },
        {
          title: "Install and run JEIExporter",
          content: () => {
            return <div>
              <p style={{width: "100%"}}>Please download and run the JEIExporter mod to continue</p>
              <Button style={{margin: 'auto'}} onClick={() => this.checkExporter()}>Refresh</Button>
            </div>
          }
        },
        {
          title: "Done",
          content: () => <div>
            You're ready to start using Minecraft Recipe Viewer!<br />
            You can always change your game directory in the settings.<br /><br />
            <Link to="/homepage"><Button type='primary'>Let's go</Button></Link>
          </div>
        }
      ],
    });
  }

  render() {

    return (
      <Layout className='flpLayout'>
        <Steps current={this.state.currentStep}>
          {this.state.steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">{this.state.steps[this.state.currentStep].content(this.state)}</div>
      </Layout>
    );
  }
}

export default FirstLaunchPage;

// @flow

import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Layout, Steps, Input, Row, Col, Button, Icon, Spin } from 'antd';
const Step = Steps.Step;
import { appInstance } from '../App';
import Settings from '../stores/Settings';
import style from './style/CreateProfilePage.css';
import jetpack from 'fs-jetpack';
import electron from 'electron';
import Networks from '../stores/Networks';
const app = electron.remote.app;
import { observer } from 'mobx-react';
import { store } from '../App';
import Profile from '../classes/Profile';

type Props = {

}

type State = {
  steps: Array<any>,
  currentStep: number,
  path: string,
  inputValue: string,
  exporterInstalled: boolean,
  nameInputValue: string,
  profileIndex: number
}

@observer
class CreateProfilePage extends Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      path: '',
      steps: [],
      currentStep: 0,
      inputValue: '',
      exporterInstalled: false,
      nameInputValue: '',
      profileIndex: store.profiles.length
    };
  }

  cancel() {
    store.setProfiles(store.profiles.filter((profile, i) => i != this.state.profileIndex));
  }

  onChangeName(path: string) {
    this.setState({nameInputValue: path, profileIndex: store.profiles.length});
  }

  onChangePath(path: string) {
    this.setState({inputValue: path});
    jetpack.existsAsync(path + '/mods').then(result => {
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
      store.addProfile(new Profile(this.state.nameInputValue, '', new Networks()))
    }

    if (currentStep == 2) { 
      this.checkExporter();
    }
  }

  checkExporter() {
    jetpack.existsAsync(this.state.path + '/config/jeiexporter/exports').then(result => {
      if (result == 'dir') {
        this.setState({exporterInstalled: true});   
        store.getProfile(this.state.profileIndex).path = this.state.path;
        store.saveSettings().then(store.loadSettings.bind(store)).then(() => {
          this.setCurrentStep(3);
        })
      } else {
        this.setState({exporterInstalled: false});
      }
    });
  }

  componentWillMount() { 
    this.setState({
      steps: [
        {
          title: "Choose a name",
          content: () => (
            <div>
              <Row>
                <Col span={18}><Input ref='nameInput' value={this.state.nameInputValue} onChange={(e) => this.onChangeName(e.target.value)} placeholder="Name of the profile" /></Col>
                <Col span={3}><Button style={{width: "95%"}} type='primary' onClick={() => this.setCurrentStep(1)}>Next</Button></Col>
              </Row>      
            </div>
          )
        },
        {
          title: "Select game directory",
          content: () => (
            <div>
              <Row>
                <Col span={18}><Input ref='pathInput' value={this.state.inputValue} onChange={(e) => this.onChangePath(e.target.value)} placeholder="Path to game data directory (with mods, config, ...)" /></Col>
                <Col span={3}><Button style={{width: "95%"}} onClick={() => this.browseDirectory()}>Browse</Button></Col>
                <Col span={3}><Button style={{width: "95%"}} type='primary' disabled={this.state.path == ''} onClick={() => this.setCurrentStep(2)}>Next</Button></Col>
              </Row>      
            </div>
          )
        },
        {
          title: "Install and run JEIExporter",
          content: () => {
            return <div>
              <p style={{width: "100%"}}>Please download and run the JEIExporter mod to continue</p>
              {store.isLoading ? <Spin /> : <Button style={{margin: 'auto'}} onClick={() => this.checkExporter()}>Refresh</Button>}
            </div>
          }
        },
        {
          title: "Done",
          content: () => <div>
            Sucessfully added a new profile!<br /><br />
            <Link to="/"><Button type='primary'>Let's go</Button></Link>
          </div>
        }
      ],
    });
  }

  render() {

    return (
      <div className="create-profile">
        <Link to="/" onClick={() => this.cancel()}><Icon className="close-icon" type="close" /></Link>
        <Layout className='flpLayout'>
          <Steps current={this.state.currentStep}>
            {this.state.steps.map(item => <Step key={item.title} title={item.title} />)}
          </Steps>
          <div className="steps-content">{this.state.steps[this.state.currentStep].content(this.state)}</div>
        </Layout>
      </div>
    );
  }
}

export default CreateProfilePage;

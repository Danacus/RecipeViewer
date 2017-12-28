// @flow

require("react-hot-loader/patch");

import React, {Component}from 'react';
import {HashRouter, Route, Link, Redirect} from 'react-router-dom';
import {Provider} from 'mobx-react';
import HomePage from './views/HomePage';
import CreateProfilePage from './views/CreateProfilePage';
import SettingsPage from './views/SettingsPage';
import Network from './observables/Network';
import Stack from './api/Stack';
import Settings from './observables/Settings';
import { withRouter } from "react-router";
import NameMaps from "./observables/NameMaps";
import { networkViewInstance } from "./views/NetworkView";
import { Spin } from 'antd';
import { ipcRenderer } from "electron";
import jetpack from 'fs-jetpack';
import { transpile, evaluate } from "./crafttweaker/zenscript/SimpleTranspiler";

export const store = new Settings();

let appInstance;

if (!window.location.href.match(/(index\.html)$/)) window.location.href = './index.html';

//window.observables = observables;

type Props = {

}

type State = {
  ready: boolean
}

export default class App extends Component<Props, State> {

  constructor() {
    super();

    appInstance = this;

    this.state = {
      ready: false
    };

    store.loadSettings().then(() => {
      this.setState({ready: true});
    })

    jetpack.findAsync('/home/daan/.local/share/multimc/instances/Enigmatica 2 Expert-0.02/minecraft/scripts/', { matching: '*.zs' }).then(files => {
      let promises = files.map(f => {
        let file = jetpack.read(f)
        evaluate(transpile(file));
      })
    }) 
  }
  
  render() {
    return (
      <Provider store>
        <HashRouter>
          <div>
            <Route exact path="/homepage"
              render={(routeProps) => (
                <HomePage {...routeProps} />
              )}
            />
            <Route exact path="/"
              render={(routeProps) => (
                <div>
                {this.state.ready ?   
                  <Redirect to="/homepage" push={true} /> :
                  <div></div> 
                }
                </div>
              )}
            />
          </div>
        </HashRouter>
      </Provider>
    )
  }
}

export { appInstance };





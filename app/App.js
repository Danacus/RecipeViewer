// @flow

require("react-hot-loader/patch");

import React, {Component}from 'react';
import {HashRouter, Route, Link, Redirect} from 'react-router-dom';
import {Provider} from 'mobx-react';

import Networks from './stores/Networks';
import Recipes from './stores/Recipes';
import HomePage from './views/HomePage';
import CreateProfilePage from './views/CreateProfilePage';
import SettingsPage from './views/SettingsPage';
import Network from './classes/Network';
import Stack from './classes/Stack';
import Settings from './stores/Settings';
import { withRouter } from "react-router";
import NameMaps from "./stores/NameMaps";
import { networkViewInstance } from "./views/NetworkView";
import { Spin } from 'antd';
import { ipcRenderer } from "electron";

export const store = new Settings();

let appInstance;

if (!window.location.href.match(/(index\.html)$/)) window.location.href = './index.html';

//window.stores = stores;

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





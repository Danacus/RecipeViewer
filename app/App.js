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
import DefaultAlgorithm from './classes/NetworkAlgorithm/DefaultAlgorithm';
import { withRouter } from "react-router";
import NameMaps from "./stores/NameMaps";
import { networkViewInstance } from "./views/NetworkView";

export const stores = {
  //networks: new Networks(),
  recipes: new Recipes([]),
  settings: new Settings(),
  nameMaps: new NameMaps()
}

let appInstance;

if (!window.location.href.match(/(index\.html)$/)) window.location.href = './index.html';

//window.stores = stores;

type Props = {

}

type State = {
  ready: boolean,
  firstLaunch: boolean
}

export default class App extends Component<Props, State> {

  constructor() {
    super();

    appInstance = this;

    this.reset();
  }

  reset(selectedProfile: ?number = undefined): Promise<any> {
    return new Promise((resolve, reject) => {
      this.state = {
        ready: false,
        firstLaunch: false
      };
  
      stores.recipes.recipes = [];
  
      stores.settings.loadSettings().then(settings => {
        if (settings) {
          if (!selectedProfile) {
            selectedProfile = stores.settings.settings.selectedProfile;
          }

          stores.recipes.loadRecipes(stores.settings.getProfile(selectedProfile).path).then(() => {
            stores.nameMaps.loadAll(stores.settings.getProfile(selectedProfile).path).then(() => {
              resolve();
              this.setState({ready: true});
            });
          });
        } else {
          this.setState({firstLaunch: true})
        }
      });
    })
  }
  
  render() {
    return (
      <Provider {...stores}>
        <HashRouter>
          <div>
            <Route exact path="/homepage"
              render={(routeProps) => (
                <HomePage {...routeProps} settings={stores.settings} />
              )}
            />
            <Route exact path="/firstlaunch"
              render={(routeProps) => (
                <CreateProfilePage settings={stores.settings} />
              )}
            />
            <Route exact path="/settings"
              render={(routeProps) => (
                <SettingsPage settings={stores.settings} />
              )}
            />
            <Route exact path="/"
              render={(routeProps) => (
                <div>
                {this.state.ready ? 
                  <Redirect to="/homepage" push={true} /> : 
                  this.state.firstLaunch ? 
                    <Redirect to="/firstlaunch" push={true} /> : <div />
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





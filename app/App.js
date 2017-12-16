// @flow

require("react-hot-loader/patch");

import React, {Component}from 'react';
import {HashRouter, Route, Link, Redirect} from 'react-router-dom';
import {Provider} from 'mobx-react';

import Networks from './stores/Networks';
import Recipes from './stores/Recipes';
import HomePage from './views/HomePage';
import Network from './classes/Network';
import Stack from './classes/Stack';
import Settings from './stores/Settings';
import DefaultAlgorithm from './classes/NetworkAlgorithm/DefaultAlgorithm';
import { withRouter } from "react-router";
import NameMaps from "./stores/NameMaps";

export const stores = {
  networks: new Networks(),
  recipes: new Recipes([]),
  settings: new Settings(),
  nameMaps: new NameMaps()
}

//window.stores = stores;

type Props = {

}

type State = {
  ready: boolean
}

export default class App extends Component<Props, State> {

  constructor() {
    super();

    this.state = {
      ready: false
    };

    stores.settings.loadSettings().then(settings => {
      stores.recipes.loadRecipes(settings.path).then(() => {
        stores.nameMaps.loadTooltipMap(settings.path).then(() => {
          this.setState({ready: true});
        });
      });
    });
  }

  render() {
    return (
      <Provider {...stores}>
        <HashRouter>
          <div>
            <Route exact path="/homepage"
              render={(routeProps) => (
                <HomePage {...routeProps} networks={stores.networks} />
              )}
            />
            <Route exact path="/"
              render={(routeProps) => (
                <p>Loading...{this.state.ready ? <Redirect to="/homepage" push={true} /> : <span></span>}</p>
              )}
            />
          </div>
        </HashRouter>
      </Provider>
    )
  }
}






import React, {Component}from 'react';
import {HashRouter, Route, Link} from 'react-router-dom';
import {Provider} from 'mobx-react';

import Networks from './stores/Networks';

import HomePage from './views/HomePage';
import TodoPage from './views/TodoPage';
import Network from './classes/Network';
import Stack from './classes/Stack';

const stores = {
  networks: new Networks(),
  recipes: new Recipes()
}

window.stores = stores;

export default  class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <HashRouter>
          <div>
            <Route exact path="/"
              render={(routeProps) => (
                <HomePage {...routeProps} networks={stores.networks} />
              )}
            />
          </div>
        </HashRouter>
      </Provider>
    )
  }
}

stores.networks.addNetwork(new Network(new Stack(['test'])))

window.setTimeout(() => stores.networks.addNetwork(new Network(new Stack(['test']))), 2000)
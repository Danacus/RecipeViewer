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
import { Spin } from 'antd';
/*import cluster from 'cluster';
import http from 'http';
const numCPUs = require('os').cpus().length;*/

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

    /*if (cluster.isMaster) {
      console.log(`Master ${process.pid} is running`);
    
      // Fork workers.
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
    
      cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
      });
    } else {
      // Workers can share any TCP connection
      // In this case it is an HTTP server
      http.createServer((req, res) => {
        res.writeHead(200);
        res.end('hello world\n');
      }).listen(8000);
    
      console.log(`Worker ${process.pid} started`);
    }*/

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
            <Route exact path="/firstlaunch"
              render={(routeProps) => (
                <CreateProfilePage />
              )}
            />
            <Route exact path="/settings"
              render={(routeProps) => (
                <SettingsPage />
              )}
            />
            <Route exact path="/"
              render={(routeProps) => (
                <div>
                {this.state.ready ?   
                  store.profiles.length < 0 ? 
                    <Redirect to="/firstlaunch" push={true} /> : 
                    <Redirect to="/homepage" push={true} /> :
                  <div className='loading-div'>
                    <div className='blur' />
                    <Spin className='spin' size='large' />
                  </div> 
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





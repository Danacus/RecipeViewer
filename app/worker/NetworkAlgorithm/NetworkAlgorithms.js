// @flow

import DefaultAlgorithm from './DefaultAlgorithm';
import AutoMerge from './AutoMerge';
import { INetworkAlgorithm } from './INetworkAlgorithm';

export const NetworkAlgorithms = [
  new DefaultAlgorithm(),
  new AutoMerge()
  //Shortest
];
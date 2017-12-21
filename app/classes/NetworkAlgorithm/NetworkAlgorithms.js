// @flow

import DefaultAlgorithm from './DefaultAlgorithm';
import AutoMerge from './AutoMerge';
import Shortest from './Shortest';
import { INetworkAlgorithm } from './INetworkAlgorithm';
import ResourceFriendly from './ResourceFriendly';

export const NetworkAlgorithms = [
  DefaultAlgorithm,
  AutoMerge,
  Shortest,
  ResourceFriendly
];
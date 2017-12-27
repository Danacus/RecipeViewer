// @flow

import DefaultAlgorithm from './DefaultAlgorithm';
import AutoMerge from './AutoMerge';
import { INetworkAlgorithm } from './INetworkAlgorithm';
import LeastMods from './LeastMods';

export const NetworkAlgorithms = [
  DefaultAlgorithm,
  AutoMerge,
  LeastMods
];
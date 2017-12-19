exports.id = 0;
exports.modules = {

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NetworkLayouts = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;

var _mobx = __webpack_require__(60);

var _Stack = __webpack_require__(26);

var _Stack2 = _interopRequireDefault(_Stack);

var _v = __webpack_require__(812);

var _v2 = _interopRequireDefault(_v);

var _INetworkAlgorithm = __webpack_require__(208);

var _Node = __webpack_require__(67);

var _Node2 = _interopRequireDefault(_Node);

var _vis = __webpack_require__(813);

var _vis2 = _interopRequireDefault(_vis);

var _Recipes = __webpack_require__(87);

var _Recipes2 = _interopRequireDefault(_Recipes);

var _App = __webpack_require__(36);

var _NetworkAlgorithms = __webpack_require__(121);

var _Edge = __webpack_require__(206);

var _Edge2 = _interopRequireDefault(_Edge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var NetworkLayouts = exports.NetworkLayouts = [{
  name: 'Normal',
  apply: function apply(options) {
    options.layout.hierarchical.enabled = false;
  }
}, {
  name: 'Hierarchical',
  apply: function apply(options) {
    options.layout.hierarchical.enabled = true;
    options.layout.hierarchical.direction = 'DU';
  }
}];

var Network = (_class = function () {
  function Network(target) {
    _classCallCheck(this, Network);

    _initDefineProp(this, 'target', _descriptor, this);

    _initDefineProp(this, 'whitelist', _descriptor2, this);

    _initDefineProp(this, 'blacklist', _descriptor3, this);

    _initDefineProp(this, 'algorithm', _descriptor4, this);

    _initDefineProp(this, 'limit', _descriptor5, this);

    _initDefineProp(this, 'depth', _descriptor6, this);

    _initDefineProp(this, 'seed', _descriptor7, this);

    _initDefineProp(this, 'selectedLayout', _descriptor8, this);

    this.target = target;
    this.id = (0, _v2.default)();
    this.whitelist = [];
    this.blacklist = [];
    this.limit = 100;
    this.depth = 10;
    this.algorithm = 0;
  }

  _createClass(Network, [{
    key: 'serialize',
    value: function serialize() {
      return {
        target: this.target.serialize(),
        visOptions: this.visOptions,
        id: this.id,
        whitelist: this.whitelist.map(function (item) {
          return item.source;
        }),
        blacklist: this.blacklist.map(function (item) {
          return item.source;
        }),
        algorithm: this.algorithm,
        limit: this.limit,
        depth: this.depth,
        seed: this.seed,
        selectedLayout: this.selectedLayout
      };
    }
  }, {
    key: 'deserialize',
    value: function deserialize(data) {
      this.target.deserialize(data.target);
      this.visOptions = data.visOptions;
      this.id = data.id;
      this.whitelist = data.whitelist.map(function (item) {
        return new RegExp(item, "i");
      });
      this.blacklist = data.blacklist.map(function (item) {
        return new RegExp(item, "i");
      });
      this.limit = data.limit;
      this.depth = data.depth;
      this.seed = data.seed;
      this.selectedLayout = data.selectedLayout;
      return this;
    }
  }, {
    key: 'setVisOptions',
    value: function setVisOptions(visOptions) {
      this.visOptions = visOptions;
    }
  }, {
    key: 'generate',
    value: function generate() {
      this.algorithmInstance = new _NetworkAlgorithms.NetworkAlgorithms[this.algorithm]();
      this.algorithmInstance.target = this.target;
      this.algorithmInstance.recipes = this.recipes;
      this.algorithmInstance.limit = this.limit;
      this.algorithmInstance.depth = this.depth - 1;
      this.algorithmInstance.whitelist = this.whitelist;
      this.algorithmInstance.blacklist = this.blacklist;

      var obj = this.algorithmInstance.generateNetwork();
      this.nodes = obj.nodes;
      this.edges = obj.edges;

      _App.stores.settings.saveSettings();
    }
  }, {
    key: 'visReload',
    value: function visReload() {
      this.nodes.forEach(function (node) {
        if (node.stack.names.length > 0) node.setImage('file://' + _App.stores.settings.getCurrentProfile().path + '/config/jeiexporter/items/' + node.stack.names[0].replace(/:/g, "_") + '.png');
      });

      this.visOptions.layout.randomSeed = this.seed;

      var visNodes = this.nodes.map(function (node) {
        return { id: node.id, group: node.group, image: node.image, label: node.amount.toString() };
      });
      var visEdges = this.edges.map(function (edge) {
        return { id: edge.id, from: edge.child.id, to: edge.parent.id };
      });

      this.visNodes = new _vis2.default.DataSet(visNodes);
      this.visEdges = new _vis2.default.DataSet(visEdges);

      var container = document.getElementById(this.id);
      this.visNetwork = new _vis2.default.Network(container, { nodes: this.visNodes, edges: this.visEdges }, this.visOptions);

      this.seed = this.visNetwork.getSeed();
    }
  }, {
    key: 'newSeed',
    value: function newSeed() {
      this.seed = undefined;
    }
  }, {
    key: 'setRecipes',
    value: function setRecipes(recipes) {
      this.recipes = recipes;
    }
  }, {
    key: 'setAlgorithm',
    value: function setAlgorithm(algorithm) {
      this.algorithm = algorithm;
    }
  }, {
    key: 'setLayout',
    value: function setLayout(layout) {
      this.selectedLayout = layout;
      NetworkLayouts[layout].apply(this.visOptions);
    }
  }, {
    key: 'applyNetworkOptions',
    value: function applyNetworkOptions(func) {
      func(this.visOptions);
      if (this.nodes && this.edges) {
        this.visReload();
      }
    }
  }, {
    key: 'setWhitelist',
    value: function setWhitelist(whitelist) {
      this.whitelist = whitelist;
    }
  }, {
    key: 'setBlacklist',
    value: function setBlacklist(blacklist) {
      this.blacklist = blacklist;
    }
  }, {
    key: 'addWhitelistItem',
    value: function addWhitelistItem(item) {
      this.whitelist.push(item);
    }
  }, {
    key: 'addBlacklistItem',
    value: function addBlacklistItem(item) {
      this.blacklist.push(item);
    }
  }, {
    key: 'removeWhitelistItem',
    value: function removeWhitelistItem(item) {
      this.whitelist = this.whitelist.filter(function (i) {
        return i.toString() != item;
      });
    }
  }, {
    key: 'removeBlacklistItem',
    value: function removeBlacklistItem(item) {
      this.blacklist = this.blacklist.filter(function (i) {
        return i.toString() != item;
      });
    }
  }, {
    key: 'setTarget',
    value: function setTarget(target) {
      this.target = new _Stack2.default([target]);
    }
  }, {
    key: 'setLimit',
    value: function setLimit(limit) {
      this.limit = limit;
    }
  }, {
    key: 'setDepth',
    value: function setDepth(depth) {
      this.depth = depth;
    }
  }, {
    key: 'setTargetAmount',
    value: function setTargetAmount(amount) {
      this.target.amount = amount;
    }
  }, {
    key: 'setOnclickCallback',
    value: function setOnclickCallback(cb) {
      var _this = this;

      this.visNetwork.on("click", function (params) {
        if (params.edges[0]) {
          console.log(_this.visEdges.get(params.edges[0]));
        }
        cb(params.nodes.length == 1 ? _this.nodes.find(function (node) {
          return node.id == params.nodes[0];
        }) : null, params.edges.length > 0 ? _this.edges.filter(function (edge) {
          return params.edges.includes(edge.id);
        }) : null);
      });
    }
  }, {
    key: 'setOnDoubleclickCallback',
    value: function setOnDoubleclickCallback(cb) {
      var _this2 = this;

      this.visNetwork.on("doubleClick", function (params) {
        cb(_this2.nodes.find(function (node) {
          return node.id == params.nodes[0];
        }));
      });
    }
  }, {
    key: 'getTarget',
    get: function get() {
      return this.target.names[0];
    }
  }, {
    key: 'getWhitelist',
    get: function get() {
      return this.whitelist.map(function (i) {
        return i.toString();
      });
    }
  }, {
    key: 'getBlacklist',
    get: function get() {
      return this.blacklist.map(function (i) {
        return i.toString();
      });
    }
  }, {
    key: 'listAllAlgortihms',
    get: function get() {
      return _NetworkAlgorithms.NetworkAlgorithms.map(function (algorithm) {
        return algorithm.name();
      });
    }
  }]);

  return Network;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'target', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'whitelist', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'blacklist', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'algorithm', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'limit', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, 'depth', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, 'seed', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, 'selectedLayout', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, 'newSeed', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'newSeed'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setAlgorithm', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'setAlgorithm'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setLayout', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'setLayout'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'applyNetworkOptions', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'applyNetworkOptions'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setWhitelist', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'setWhitelist'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setBlacklist', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'setBlacklist'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'addWhitelistItem', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'addWhitelistItem'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'addBlacklistItem', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'addBlacklistItem'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'removeWhitelistItem', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'removeWhitelistItem'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'removeBlacklistItem', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'removeBlacklistItem'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setTarget', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'setTarget'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setLimit', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'setLimit'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setDepth', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'setDepth'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setTargetAmount', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'setTargetAmount'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getTarget', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'getTarget'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getWhitelist', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'getWhitelist'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getBlacklist', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'getBlacklist'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'listAllAlgortihms', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'listAllAlgortihms'), _class.prototype)), _class);
exports.default = Network;

/***/ })

};
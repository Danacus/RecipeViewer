exports.id = 0;
exports.modules = {

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor;

var _mobx = __webpack_require__(60);

var _Network = __webpack_require__(86);

var _Network2 = _interopRequireDefault(_Network);

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

var Networks = (_class = function () {
  function Networks() {
    _classCallCheck(this, Networks);

    _initDefineProp(this, 'networks', _descriptor, this);
  }

  _createClass(Networks, [{
    key: 'serialize',
    value: function serialize() {
      return this.networks.map(function (network) {
        return network.serialize();
      });
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.networks = [];
    }
  }, {
    key: 'addNetwork',
    value: function addNetwork(network) {
      this.networks.push(network);
      return network;
    }
  }, {
    key: 'list',
    get: function get() {
      return this.networks;
    }
  }]);

  return Networks;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'networks', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class.prototype, 'list', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'list'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'reset', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'reset'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'addNetwork', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'addNetwork'), _class.prototype)), _class);
exports.default = Networks;

/***/ })

};
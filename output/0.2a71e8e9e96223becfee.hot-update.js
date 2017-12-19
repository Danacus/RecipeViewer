exports.id = 0;
exports.modules = {

/***/ 210:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor, _descriptor2;

var _mobx = __webpack_require__(60);

var _fsJetpack = __webpack_require__(98);

var _fsJetpack2 = _interopRequireDefault(_fsJetpack);

var _electron = __webpack_require__(344);

var _electron2 = _interopRequireDefault(_electron);

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

var app = _electron2.default.remote.app;

var Settings = (_class = function () {
  function Settings() {
    _classCallCheck(this, Settings);

    _initDefineProp(this, 'settings', _descriptor, this);

    _initDefineProp(this, 'currentProfile', _descriptor2, this);
  }

  _createClass(Settings, [{
    key: 'loadSettings',
    value: function loadSettings() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var file = app.getPath('userData') + "/settings.json";
        if (_fsJetpack2.default.exists(file) !== "file") {
          _this.settings = { profiles: [] };
          resolve(null);
        } else {
          _this.readFile(file).then(function (settings) {
            return resolve(settings);
          });
        }
      });
    }
  }, {
    key: 'readFile',
    value: function readFile(path) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _fsJetpack2.default.readAsync(path, 'json').then(function (settings) {
          _this2.settings = settings;
          resolve(settings);
        });
      });
    }
  }, {
    key: 'setSettings',
    value: function setSettings(settings) {
      this.settings = settings;
    }
  }, {
    key: 'changeSettings',
    value: function changeSettings(func) {
      func(this.settings);
    }
  }, {
    key: 'saveSettings',
    value: function saveSettings() {
      var file = app.getPath('userData') + "/settings.json";
      _fsJetpack2.default.writeAsync(file, this.settings);
    }
  }, {
    key: 'list',
    get: function get() {
      return this.settings;
    }
  }]);

  return Settings;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'settings', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'currentProfile', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, 'list', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'list'), _class.prototype)), _class);
exports.default = Settings;

/***/ })

};
exports.id = 0;
exports.modules = {

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.stores = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(200);

var _mobxReact = __webpack_require__(108);

var _Networks = __webpack_require__(209);

var _Networks2 = _interopRequireDefault(_Networks);

var _Recipes = __webpack_require__(87);

var _Recipes2 = _interopRequireDefault(_Recipes);

var _HomePage = __webpack_require__(373);

var _HomePage2 = _interopRequireDefault(_HomePage);

var _FirstLaunchPage = __webpack_require__(372);

var _FirstLaunchPage2 = _interopRequireDefault(_FirstLaunchPage);

var _Network = __webpack_require__(86);

var _Network2 = _interopRequireDefault(_Network);

var _Stack = __webpack_require__(26);

var _Stack2 = _interopRequireDefault(_Stack);

var _Settings = __webpack_require__(210);

var _Settings2 = _interopRequireDefault(_Settings);

var _DefaultAlgorithm = __webpack_require__(207);

var _DefaultAlgorithm2 = _interopRequireDefault(_DefaultAlgorithm);

var _reactRouter = __webpack_require__(777);

var _NameMaps = __webpack_require__(371);

var _NameMaps2 = _interopRequireDefault(_NameMaps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(761);

var stores = exports.stores = {
  networks: new _Networks2.default(),
  recipes: new _Recipes2.default([]),
  settings: new _Settings2.default(),
  nameMaps: new _NameMaps2.default()

  //window.stores = stores;

};
var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.state = {
      ready: false,
      firstLaunch: false
    };

    stores.settings.loadSettings().then(function (settings) {
      if (settings) {
        stores.recipes.loadRecipes(settings.path).then(function () {
          stores.nameMaps.loadTooltipMap(settings.path).then(function () {
            _this.setState({ ready: true });
          });
        });
      } else {
        console.log(_this.state.ready);
        _this.setState({ firstLaunch: true });
      }
    });
    return _this;
  }

  _createClass(App, [{
    key: 'reset',
    value: function reset() {
      var _this2 = this;

      this.state = {
        ready: false,
        firstLaunch: false
      };

      stores.settings.loadSettings().then(function (settings) {
        if (settings) {
          stores.recipes.loadRecipes(settings.path).then(function () {
            stores.nameMaps.loadTooltipMap(settings.path).then(function () {
              _this2.setState({ ready: true });
            });
          });
        } else {
          console.log(_this2.state.ready);
          _this2.setState({ firstLaunch: true });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        _mobxReact.Provider,
        stores,
        _react2.default.createElement(
          _reactRouterDom.HashRouter,
          null,
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/homepage',
              render: function render(routeProps) {
                return _react2.default.createElement(_HomePage2.default, _extends({}, routeProps, { networks: stores.networks }));
              }
            }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/firstlaunch',
              render: function render(routeProps) {
                return _react2.default.createElement(_FirstLaunchPage2.default, { settings: stores.settings });
              }
            }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/',
              render: function render(routeProps) {
                return _react2.default.createElement(
                  'div',
                  null,
                  _this3.state.ready ? _react2.default.createElement(_reactRouterDom.Redirect, { to: '/homepage', push: true }) : _this3.state.firstLaunch ? _react2.default.createElement(_reactRouterDom.Redirect, { to: '/firstlaunch', push: true }) : _react2.default.createElement('div', null)
                );
              }
            })
          )
        )
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;

/***/ })

};
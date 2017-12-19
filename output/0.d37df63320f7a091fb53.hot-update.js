exports.id = 0;
exports.modules = {

/***/ 373:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _row = __webpack_require__(231);

var _row2 = _interopRequireDefault(_row);

var _col = __webpack_require__(216);

var _col2 = _interopRequireDefault(_col);

var _select = __webpack_require__(124);

var _select2 = _interopRequireDefault(_select);

var _tabs = __webpack_require__(125);

var _tabs2 = _interopRequireDefault(_tabs);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

__webpack_require__(232);

__webpack_require__(217);

__webpack_require__(233);

__webpack_require__(126);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(108);

var _reactRouterDom = __webpack_require__(200);

var _NetworkView = __webpack_require__(374);

var _NetworkView2 = _interopRequireDefault(_NetworkView);

var _Networks = __webpack_require__(209);

var _Networks2 = _interopRequireDefault(_Networks);

var _Network = __webpack_require__(86);

var _Network2 = _interopRequireDefault(_Network);

var _Stack = __webpack_require__(26);

var _Stack2 = _interopRequireDefault(_Stack);

var _App = __webpack_require__(36);

var _NetworkAlgorithms = __webpack_require__(121);

var _Settings = __webpack_require__(210);

var _Settings2 = _interopRequireDefault(_Settings);

var _HomePage = __webpack_require__(818);

var _HomePage2 = _interopRequireDefault(_HomePage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabPane = _tabs2.default.TabPane;
var Option = _select2.default.Option;

var HomePage = (0, _mobxReact.observer)(_class = function (_Component) {
  _inherits(HomePage, _Component);

  function HomePage(props) {
    _classCallCheck(this, HomePage);

    var _this = _possibleConstructorReturn(this, (HomePage.__proto__ || Object.getPrototypeOf(HomePage)).call(this, props));

    _this.onChange = function (activeKey) {
      _this.props.settings.getCurrentProfile().networks.selectedNetwork = activeKey;
    };

    _this.add = function () {
      var network = _this.props.settings.getCurrentProfile().networks.addNetwork(new _Network2.default(new _Stack2.default([''])));
      network.setRecipes(_App.stores.recipes);
      //network.setAlgorithm(NetworkAlgorithms[0]);
      network.setVisOptions({
        nodes: {
          shape: 'image'
        },
        edges: {
          width: 7,
          arrows: {
            middle: { enabled: true, scaleFactor: -1 }
          },
          color: { inherit: 'to' }
        },
        physics: {
          enabled: true,
          barnesHut: {
            springLength: 250,
            springConstant: 0.003,
            damping: 0.1
          }
        },
        layout: {
          hierarchical: {
            enabled: false,
            nodeSpacing: 1000
          }
        }
      });
      _this.setState({ activeKey: network.id });
    };

    _this.newTabIndex = 0;
    _this.state = {
      activeKey: _this.props.settings.getCurrentProfile().networks.selectedNetwork,
      addProfile: false
    };

    console.log(_this.props.settings.list);
    return _this;
  }

  _createClass(HomePage, [{
    key: 'update',
    value: function update() {
      this.forceUpdate();
    }
  }, {
    key: 'changeProfile',


    /*onEdit = (targetKey: string, action: any) => {
      this[action](targetKey);
    }*/

    value: function changeProfile(profile) {
      if (profile == "add") {
        this.setState({ addProfile: true });
        //this.setState({addProfile: false});
      } else {
        this.props.settings.selectProfile(parseInt(profile));
        this.setState({});
        if (_App.appInstance) {
          _App.appInstance.reset();
        }
      }
    }
  }, {
    key: 'remove',
    value: function remove() {
      var networks = this.props.settings.getCurrentProfile().networks.list.filter(function (network) {
        return network.id !== targetKey;
      });
      this.props.settings.getCurrentProfile().networks.selectedNetwork = this.props.settings.getCurrentProfile().networks.list[0].id;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return this.state.addProfile ? _react2.default.createElement(_reactRouterDom.Redirect, { to: '/firstlaunch', push: true }) : _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _row2.default,
          null,
          _react2.default.createElement(
            _col2.default,
            { span: 21 },
            _react2.default.createElement(
              _tabs2.default,
              {
                type: 'editable-card',
                onChange: this.onChange,
                activeKey: this.state.activeKey,
                className: 'tabs'
              },
              this.props.settings.getCurrentProfile().networks.list.map(function (network, index) {
                return _react2.default.createElement(
                  TabPane,
                  {
                    tab: _App.stores.nameMaps.list[network.getTarget] ? _App.stores.nameMaps.list[network.getTarget] : network.getTarget,
                    key: network.id
                  },
                  _react2.default.createElement(_NetworkView2.default, { network: network, updateParent: function updateParent() {
                      return _this2.update();
                    } })
                );
              })
            )
          ),
          _react2.default.createElement(
            _col2.default,
            { span: 3, className: 'header-row' },
            _react2.default.createElement(
              _select2.default,
              { className: 'select-profile', value: this.props.settings.getCurrentProfile().name, onChange: function onChange(value) {
                  return _this2.changeProfile(value);
                } },
              this.props.settings.list.profiles.map(function (profile, i) {
                return _react2.default.createElement(
                  Option,
                  { key: i, value: i },
                  profile.name
                );
              }),
              _react2.default.createElement(
                Option,
                { key: 'add', value: 'add' },
                'New profile ...'
              )
            )
          )
        )
      );
    }
  }]);

  return HomePage;
}(_react.Component)) || _class;

exports.default = HomePage;

/***/ })

};
exports.id = 0;
exports.modules = {

/***/ 372:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _layout = __webpack_require__(226);

var _layout2 = _interopRequireDefault(_layout);

var _steps = __webpack_require__(414);

var _steps2 = _interopRequireDefault(_steps);

var _button = __webpack_require__(88);

var _button2 = _interopRequireDefault(_button);

var _row = __webpack_require__(231);

var _row2 = _interopRequireDefault(_row);

var _col = __webpack_require__(216);

var _col2 = _interopRequireDefault(_col);

var _input = __webpack_require__(90);

var _input2 = _interopRequireDefault(_input);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

__webpack_require__(227);

__webpack_require__(415);

__webpack_require__(122);

__webpack_require__(232);

__webpack_require__(217);

__webpack_require__(52);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(108);

var _reactRouterDom = __webpack_require__(200);

var _App = __webpack_require__(36);

var _Settings = __webpack_require__(210);

var _Settings2 = _interopRequireDefault(_Settings);

var _CreateProfilePage = __webpack_require__(792);

var _CreateProfilePage2 = _interopRequireDefault(_CreateProfilePage);

var _fsJetpack = __webpack_require__(98);

var _fsJetpack2 = _interopRequireDefault(_fsJetpack);

var _electron = __webpack_require__(344);

var _electron2 = _interopRequireDefault(_electron);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Step = _steps2.default.Step;

var app = _electron2.default.remote.app;

var CreateProfilePage = (0, _mobxReact.observer)(_class = function (_Component) {
  _inherits(CreateProfilePage, _Component);

  function CreateProfilePage(props) {
    _classCallCheck(this, CreateProfilePage);

    var _this = _possibleConstructorReturn(this, (CreateProfilePage.__proto__ || Object.getPrototypeOf(CreateProfilePage)).call(this, props));

    _this.state = {
      path: '',
      steps: [],
      currentStep: 0,
      inputValue: '',
      exporterInstalled: false
    };
    return _this;
  }

  _createClass(CreateProfilePage, [{
    key: 'onChangePath',
    value: function onChangePath(path) {
      var _this2 = this;

      this.setState({ inputValue: path });
      _fsJetpack2.default.existsAsync(path + '/mods').then(function (result) {
        console.log(result);
        if (result == 'dir') {
          _this2.setState({ path: path });
        } else {
          _this2.setState({ path: '' });
        }
      });
    }
  }, {
    key: 'browseDirectory',
    value: function browseDirectory() {
      var _this3 = this;

      _electron2.default.remote.dialog.showOpenDialog({ title: "Select minecraft instance folder", properties: ['openDirectory'] }, function (filePaths) {
        _this3.setState({ inputValue: filePaths[0] });
        _this3.onChangePath(filePaths[0]);
      });
    }
  }, {
    key: 'setCurrentStep',
    value: function setCurrentStep(currentStep) {
      this.setState({ currentStep: currentStep });
      if (currentStep == 1) {
        this.checkExporter();
      }
    }
  }, {
    key: 'checkExporter',
    value: function checkExporter() {
      var _this4 = this;

      _fsJetpack2.default.existsAsync(this.state.path + '/config/jeiexporter/exports').then(function (result) {
        if (result == 'dir') {
          _this4.setState({ exporterInstalled: true });
          _this4.setCurrentStep(2);
          _this4.props.settings.changeSettings(function (settings) {
            return settings.profiles.push({ path: _this4.state.path });
          });
          _this4.props.settings.saveSettings();
          if (_App.appInstance) {
            _App.appInstance.reset();
          }
        } else {
          _this4.setState({ exporterInstalled: false });
        }
      });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this5 = this;

      this.setState({
        steps: [{
          title: "Select game directory",
          content: function content() {
            return _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                _row2.default,
                null,
                _react2.default.createElement(
                  _col2.default,
                  { span: 18 },
                  _react2.default.createElement(_input2.default, { ref: 'pathInput', value: _this5.state.inputValue, onChange: function onChange(e) {
                      return _this5.onChangePath(e.target.value);
                    }, placeholder: 'Path to game data directory (with mods, config, ...)' })
                ),
                _react2.default.createElement(
                  _col2.default,
                  { span: 3 },
                  _react2.default.createElement(
                    _button2.default,
                    { style: { width: "95%" }, onClick: function onClick() {
                        return _this5.browseDirectory();
                      } },
                    'Browse'
                  )
                ),
                _react2.default.createElement(
                  _col2.default,
                  { span: 3 },
                  _react2.default.createElement(
                    _button2.default,
                    { style: { width: "95%" }, type: 'primary', disabled: _this5.state.path == '', onClick: function onClick() {
                        return _this5.setCurrentStep(1);
                      } },
                    'Next'
                  )
                )
              )
            );
          }
        }, {
          title: "Install and run JEIExporter",
          content: function content() {
            return _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'p',
                { style: { width: "100%" } },
                'Please download and run the JEIExporter mod to continue'
              ),
              _react2.default.createElement(
                _button2.default,
                { style: { margin: 'auto' }, onClick: function onClick() {
                    return _this5.checkExporter();
                  } },
                'Refresh'
              )
            );
          }
        }, {
          title: "Done",
          content: function content() {
            return _react2.default.createElement(
              'div',
              null,
              'You\'re ready to start using Minecraft Recipe Viewer!',
              _react2.default.createElement('br', null),
              'You can always change your game directory in the settings.',
              _react2.default.createElement('br', null),
              _react2.default.createElement('br', null),
              _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/' },
                _react2.default.createElement(
                  _button2.default,
                  { type: 'primary' },
                  'Let\'s go'
                )
              )
            );
          }
        }]
      });
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        _layout2.default,
        { className: 'flpLayout' },
        _react2.default.createElement(
          _steps2.default,
          { current: this.state.currentStep },
          this.state.steps.map(function (item) {
            return _react2.default.createElement(Step, { key: item.title, title: item.title });
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'steps-content' },
          this.state.steps[this.state.currentStep].content(this.state)
        )
      );
    }
  }]);

  return CreateProfilePage;
}(_react.Component)) || _class;

exports.default = CreateProfilePage;

/***/ })

};
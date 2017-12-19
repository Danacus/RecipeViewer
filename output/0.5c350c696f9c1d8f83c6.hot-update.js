exports.id = 0;
exports.modules = {

/***/ 374:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _layout = __webpack_require__(226);

var _layout2 = _interopRequireDefault(_layout);

var _collapse = __webpack_require__(392);

var _collapse2 = _interopRequireDefault(_collapse);

var _tabs = __webpack_require__(125);

var _tabs2 = _interopRequireDefault(_tabs);

var _avatar = __webpack_require__(213);

var _avatar2 = _interopRequireDefault(_avatar);

var _button = __webpack_require__(88);

var _button2 = _interopRequireDefault(_button);

var _form = __webpack_require__(220);

var _form2 = _interopRequireDefault(_form);

var _checkbox = __webpack_require__(389);

var _checkbox2 = _interopRequireDefault(_checkbox);

var _select = __webpack_require__(124);

var _select2 = _interopRequireDefault(_select);

var _card = __webpack_require__(386);

var _card2 = _interopRequireDefault(_card);

var _input = __webpack_require__(90);

var _input2 = _interopRequireDefault(_input);

var _menu = __webpack_require__(406);

var _menu2 = _interopRequireDefault(_menu);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

__webpack_require__(227);

__webpack_require__(393);

__webpack_require__(126);

__webpack_require__(214);

__webpack_require__(122);

__webpack_require__(221);

__webpack_require__(390);

__webpack_require__(233);

__webpack_require__(387);

__webpack_require__(52);

__webpack_require__(407);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Network = __webpack_require__(86);

var _Network2 = _interopRequireDefault(_Network);

var _mobxReact = __webpack_require__(108);

var _Node = __webpack_require__(67);

var _Node2 = _interopRequireDefault(_Node);

var _Stack = __webpack_require__(26);

var _Stack2 = _interopRequireDefault(_Stack);

var _App = __webpack_require__(36);

var _Recipe = __webpack_require__(68);

var _Recipe2 = _interopRequireDefault(_Recipe);

var _OptionField = __webpack_require__(377);

var _OptionField2 = _interopRequireDefault(_OptionField);

var _ItemList = __webpack_require__(376);

var _ItemList2 = _interopRequireDefault(_ItemList);

var _EditableList = __webpack_require__(375);

var _EditableList2 = _interopRequireDefault(_EditableList);

var _NetworkView = __webpack_require__(793);

var _NetworkView2 = _interopRequireDefault(_NetworkView);

var _NetworkAlgorithms = __webpack_require__(121);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SubMenu = _menu2.default.SubMenu;
var Header = _layout2.default.Header,
    Content = _layout2.default.Content,
    Footer = _layout2.default.Footer,
    Sider = _layout2.default.Sider;

var Option = _select2.default.Option;
var InputGroup = _input2.default.Group;
var FormItem = _form2.default.Item;
var TabPane = _tabs2.default.TabPane;
var Meta = _card2.default.Meta;

var NetworkView = (0, _mobxReact.observer)(_class = function (_Component) {
  _inherits(NetworkView, _Component);

  function NetworkView(props) {
    _classCallCheck(this, NetworkView);

    var _this = _possibleConstructorReturn(this, (NetworkView.__proto__ || Object.getPrototypeOf(NetworkView)).call(this, props));

    _this.onCollapse = function (collapsed) {
      console.log(collapsed);
      _this.setState({ collapsed: collapsed });
    };

    _this.state = {
      collapsed: false,
      whitelistAdd: '',
      blacklistAdd: '',
      target: '',
      limit: _this.props.network.limit,
      depth: _this.props.network.depth,
      targetAmount: _this.props.network.target.amount,
      selectedNode: new _Node2.default(new _Stack2.default(['']), -1),
      selectedRecipes: [],
      blacklistInput: null,
      whitelistInput: null,
      selectedAlgorithm: 0,
      selectedLayout: 0,
      physicsEnabled: true
    };
    return _this;
  }

  _createClass(NetworkView, [{
    key: 'addWhitelistItem',
    value: function addWhitelistItem() {
      this.props.network.addWhitelistItem(new RegExp(this.state.whitelistAdd, "i"));
      this.regenerate();
      if (this.state.whitelistInput) {
        this.state.whitelistInput.input.value = "";
        this.state.whitelistInput.focus();
      }
      this.setState({ whitelistAdd: '' });
    }
  }, {
    key: 'addBlacklistItem',
    value: function addBlacklistItem(input) {
      this.props.network.addBlacklistItem(new RegExp(this.state.blacklistAdd, "i"));
      this.regenerate();

      if (this.state.blacklistInput) {
        this.state.blacklistInput.input.value = "";
        this.state.blacklistInput.focus();
      }

      this.setState({ blacklistAdd: '' });
    }
  }, {
    key: 'removeWhitelistItem',
    value: function removeWhitelistItem(item) {
      this.props.network.removeWhitelistItem(item);
      this.regenerate();
    }
  }, {
    key: 'removeBlacklistItem',
    value: function removeBlacklistItem(item) {
      this.props.network.removeBlacklistItem(item);
      this.regenerate();
    }
  }, {
    key: 'setTarget',
    value: function setTarget(target) {
      this.props.network.setTarget(target);
      this.props.updateParent();
      this.setState({ target: target });
    }
  }, {
    key: 'setLimit',
    value: function setLimit(limit) {
      this.props.network.setLimit(limit);
      this.setState({ limit: limit });
    }
  }, {
    key: 'setDepth',
    value: function setDepth(depth) {
      this.props.network.setDepth(depth);
      this.setState({ depth: depth });
    }
  }, {
    key: 'setTargetAmount',
    value: function setTargetAmount(targetAmount) {
      this.props.network.setTargetAmount(targetAmount);
      this.setState({ targetAmount: targetAmount });
    }
  }, {
    key: 'setAlgorithm',
    value: function setAlgorithm(index) {
      this.props.network.setAlgorithm(index);
      this.setState({ selectedAlgorithm: index });
      this.regenerate();
    }
  }, {
    key: 'setLayout',
    value: function setLayout(index) {
      this.props.network.setLayout(index);
      this.setState({ selectedLayout: index });
      this.regenerate();
    }
  }, {
    key: 'togglePhysics',
    value: function togglePhysics() {
      this.props.network.applyNetworkOptions(function (options) {
        return options.physics.enabled = !options.physics.enabled;
      });
      this.setState({ physicsEnabled: this.props.network.visOptions.physics.enabled });
    }
  }, {
    key: 'regenerate',
    value: function regenerate() {
      var _this2 = this;

      this.props.network.generate();
      this.props.network.visReload();

      this.props.network.setOnclickCallback(function (node, edges) {
        if (node) {
          _this2.setState({ selectedNode: node });
        } else {
          _this2.setState({ selectedNode: new _Node2.default(new _Stack2.default(['']), -1) });
        }

        if (edges) {
          var recipes = edges.map(function (edge) {
            return edge.recipe;
          }).reduce(function (total, current) {
            if (!total.some(function (recipe) {
              return recipe.id == current.id;
            })) {
              total.push(current);
            }

            return total;
          }, []);
          _this2.setState({ selectedRecipes: recipes });
        }
      });

      this.props.network.setOnDoubleclickCallback(function (node) {
        if (node) {
          node.stack.names.forEach(function (name) {
            _this2.props.network.addBlacklistItem(new RegExp(name, "i"));
          });
          _this2.regenerate();
        }
      });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.network.setAlgorithm(this.state.selectedAlgorithm);
      this.props.network.setLayout(this.state.selectedLayout);
      this.setState({ target: this.props.network.getTarget });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.regenerate();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        _layout2.default,
        null,
        _react2.default.createElement(Content, { style: { height: "93vh", background: '#fff' }, id: this.props.network.id }),
        _react2.default.createElement(
          Sider,
          {
            width: 400,
            style: { background: '#fff', overflow: "auto", position: "fixed", right: "0" }
          },
          _react2.default.createElement(
            _collapse2.default,
            { onChange: function onChange() {}, style: { overflow: "auto", maxHeight: '93vh' } },
            _react2.default.createElement(
              _collapse2.default.Panel,
              { header: 'Target' },
              _react2.default.createElement(
                _form2.default,
                null,
                _react2.default.createElement(_OptionField2.default, { label: 'Target', type: 'text', onChange: this.setTarget.bind(this), onApply: this.regenerate.bind(this), value: this.state.target }),
                _react2.default.createElement(_OptionField2.default, { label: 'Amount', type: 'number', onChange: this.setTargetAmount.bind(this), onApply: this.regenerate.bind(this), value: this.state.targetAmount.toString() })
              )
            ),
            _react2.default.createElement(
              _collapse2.default.Panel,
              { header: 'Algorithm' },
              _react2.default.createElement(
                _form2.default,
                null,
                _react2.default.createElement(
                  FormItem,
                  _extends({}, _OptionField.formItemLayout, { label: 'Algorithm' }),
                  _react2.default.createElement(
                    _select2.default,
                    {
                      placeholder: 'Select an algorithm',
                      onSelect: function onSelect(key) {
                        return _this3.setAlgorithm(key);
                      },
                      value: _NetworkAlgorithms.NetworkAlgorithms[this.state.selectedAlgorithm].name
                    },
                    _NetworkAlgorithms.NetworkAlgorithms.map(function (alg, index) {
                      return _react2.default.createElement(
                        Option,
                        { key: index },
                        alg.name
                      );
                    })
                  )
                ),
                _react2.default.createElement(_OptionField2.default, { label: 'Limit', type: 'number', onChange: this.setLimit.bind(this), onApply: this.regenerate.bind(this), value: this.state.limit.toString() }),
                _react2.default.createElement(_OptionField2.default, { label: 'Depth', type: 'number', onChange: this.setDepth.bind(this), onApply: this.regenerate.bind(this), value: this.state.depth.toString() })
              )
            ),
            _react2.default.createElement(
              _collapse2.default.Panel,
              { header: 'Network' },
              _react2.default.createElement(
                _form2.default,
                null,
                _react2.default.createElement(
                  FormItem,
                  _extends({}, _OptionField.formItemLayout, { label: 'Layout' }),
                  _react2.default.createElement(
                    _select2.default,
                    {
                      placeholder: 'Select a layout',
                      onSelect: function onSelect(key) {
                        return _this3.setLayout(key);
                      },
                      value: _Network.NetworkLayouts[this.state.selectedLayout].name
                    },
                    _Network.NetworkLayouts.map(function (lay, index) {
                      return _react2.default.createElement(
                        Option,
                        { key: index },
                        lay.name
                      );
                    })
                  )
                ),
                _react2.default.createElement(
                  _checkbox2.default,
                  { checked: this.state.physicsEnabled, onChange: function onChange() {
                      return _this3.togglePhysics();
                    } },
                  'Enable physics'
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'p',
                  { style: { fontSize: '12px' } },
                  'More options coming soon! :) '
                )
              )
            ),
            _react2.default.createElement(
              _collapse2.default.Panel,
              { header: 'Blacklist' },
              _react2.default.createElement(_EditableList2.default, {
                items: this.props.network.getBlacklist,
                onAdd: this.addBlacklistItem.bind(this),
                onRemove: this.removeBlacklistItem.bind(this),
                onChange: function onChange(x) {
                  return _this3.setState({ blacklistAdd: x });
                },
                current: this.state.blacklistAdd,
                inputRef: function inputRef(el) {
                  return _this3.state.blacklistInput = el;
                }
              })
            ),
            _react2.default.createElement(
              _collapse2.default.Panel,
              { header: 'Whitelist' },
              _react2.default.createElement(_EditableList2.default, {
                items: this.props.network.getWhitelist,
                onAdd: this.addWhitelistItem.bind(this),
                onRemove: this.removeWhitelistItem.bind(this),
                onChange: function onChange(x) {
                  return _this3.setState({ whitelistAdd: x });
                },
                current: this.state.whitelistAdd,
                inputRef: function inputRef(el) {
                  return _this3.state.whitelistInput = el;
                }
              })
            ),
            _react2.default.createElement(
              _collapse2.default.Panel,
              { header: 'Actions' },
              _react2.default.createElement(
                _button2.default,
                { onClick: function onClick() {
                    return _this3.regenerate();
                  } },
                'Reload Network'
              ),
              _react2.default.createElement('br', null),
              _react2.default.createElement('br', null),
              _react2.default.createElement(
                _button2.default,
                { onClick: function onClick() {
                    _this3.props.network.newSeed();_this3.regenerate();
                  } },
                'Randomize seed'
              )
            ),
            this.state.selectedNode.stack && this.state.selectedNode.id !== -1 ? _react2.default.createElement(
              _collapse2.default.Panel,
              { header: 'Selected Node' },
              _react2.default.createElement(_ItemList2.default, { label: '', items: [this.state.selectedNode.stack] })
            ) : '',
            this.state.selectedRecipes.length > 0 ? _react2.default.createElement(
              _collapse2.default.Panel,
              { header: 'Selected Recipes' },
              _react2.default.createElement(
                _tabs2.default,
                {
                  defaultActiveKey: '0'
                },
                this.state.selectedRecipes.map(function (recipe, i) {
                  return _react2.default.createElement(
                    TabPane,
                    { tab: _react2.default.createElement(_avatar2.default, { src: 'file://' + _App.stores.settings.getCurrentProfile().path + '/config/jeiexporter/items/' + recipe.outputs[0].names[0].replace(/:/g, "_") + '.png' }), key: i },
                    _react2.default.createElement(_ItemList2.default, { label: 'Catalysts', items: recipe.catalysts }),
                    _react2.default.createElement(_ItemList2.default, { label: 'Inputs', items: recipe.inputs.filter(function (item) {
                        return item.names.length > 0 && item.amount > 0;
                      }) }),
                    _react2.default.createElement(_ItemList2.default, { label: 'Outputs', items: recipe.outputs.filter(function (item) {
                        return item.names.length > 0 && item.amount > 0;
                      }) })
                  );
                })
              )
            ) : ''
          )
        )
      );
    }
  }]);

  return NetworkView;
}(_react.Component)) || _class;

exports.default = NetworkView;

/***/ })

};
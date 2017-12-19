exports.id = 0;
exports.modules = {

/***/ 376:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _list = __webpack_require__(228);

var _list2 = _interopRequireDefault(_list);

var _avatar = __webpack_require__(213);

var _avatar2 = _interopRequireDefault(_avatar);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(229);

__webpack_require__(214);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Stack = __webpack_require__(26);

var _Stack2 = _interopRequireDefault(_Stack);

var _App = __webpack_require__(36);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ItemList = function (_Component) {
  _inherits(ItemList, _Component);

  function ItemList() {
    _classCallCheck(this, ItemList);

    return _possibleConstructorReturn(this, (ItemList.__proto__ || Object.getPrototypeOf(ItemList)).apply(this, arguments));
  }

  _createClass(ItemList, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h3',
          null,
          this.props.label
        ),
        _react2.default.createElement(_list2.default, {
          itemLayout: 'horizontal',
          dataSource: this.props.items,
          renderItem: function renderItem(item) {
            return _react2.default.createElement(
              _list2.default.Item,
              null,
              _react2.default.createElement(_list2.default.Item.Meta, {
                avatar: _react2.default.createElement(_avatar2.default, { src: 'file://' + _App.stores.settings.getCurrentProfile().path + '/config/jeiexporter/items/' + item.names[0].replace(/:/g, "_") + '.png' }),
                title: item.amount > 0 ? item.amount + ' x ' + _App.stores.nameMaps.list[item.names[0]] : _App.stores.nameMaps.list[item.names[0]],
                description: item.names[0]
              })
            );
          }
        })
      );
    }
  }]);

  return ItemList;
}(_react.Component);

exports.default = ItemList;

/***/ })

};
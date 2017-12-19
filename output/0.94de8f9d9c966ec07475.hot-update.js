exports.id = 0;
exports.modules = {

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stack = function () {
  function Stack(names) {
    var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Stack);

    this.names = names;
    this.amount = amount;
  }

  _createClass(Stack, [{
    key: "serialize",
    value: function serialize() {
      return {
        names: this.names,
        amount: this.amount
      };
    }
  }, {
    key: "deserialize",
    value: function deserialize(data) {
      this.names = data.names;
      this.amount = data.amount;
      return this;
    }
  }, {
    key: "equals",
    value: function equals(stack) {
      var _this = this;

      return this.names.some(function (name) {
        return stack.names.includes(name);
      }) || stack.names.some(function (name) {
        return _this.names.includes(name);
      });
    }
  }, {
    key: "isWhitelisted",
    value: function isWhitelisted(list) {
      var _this2 = this;

      return list.some(function (regex) {
        return _this2.names.some(function (name) {
          return name.match(regex);
        }) || _this2.names.length == 0;
      });
    }
  }, {
    key: "isBlacklisted",
    value: function isBlacklisted(list) {
      var _this3 = this;

      return list.some(function (regex) {
        return _this3.names.some(function (name) {
          return name.match(regex);
        });
      });
    }
  }]);

  return Stack;
}();

exports.default = Stack;

/***/ })

};
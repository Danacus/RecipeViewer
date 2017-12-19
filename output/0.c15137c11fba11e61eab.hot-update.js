exports.id = 0;
exports.modules = {

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor;

var _mobx = __webpack_require__(60);

var _Recipe = __webpack_require__(68);

var _Recipe2 = _interopRequireDefault(_Recipe);

var _Stack = __webpack_require__(26);

var _Stack2 = _interopRequireDefault(_Stack);

var _fsJetpack = __webpack_require__(98);

var _fsJetpack2 = _interopRequireDefault(_fsJetpack);

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

var Recipes = (_class = function () {
  function Recipes(recipes) {
    _classCallCheck(this, Recipes);

    _initDefineProp(this, "recipes", _descriptor, this);

    this.recipes = recipes;
  }

  _createClass(Recipes, [{
    key: "getRecipesWithOutput",
    value: function getRecipesWithOutput(output) {
      return this.recipes.filter(function (recipe) {
        return recipe.outputs.some(function (recipeOutput) {
          return recipeOutput.equals(output);
        });
      });
    }
  }, {
    key: "getRecipesWithInput",
    value: function getRecipesWithInput(input) {
      return this.recipes.filter(function (recipe) {
        return recipe.inputs.some(function (recipeInput) {
          return recipeInput.equals(input);
        });
      });
    }
  }, {
    key: "getRecipesWithOutputs",
    value: function getRecipesWithOutputs(outputs) {
      return this.recipes.filter(function (recipe) {
        return recipe.outputs.some(function (recipeOutput) {
          return outputs.some(function (output) {
            return recipeOutput.equals(output);
          });
        });
      });
    }
  }, {
    key: "getRecipesWithInputs",
    value: function getRecipesWithInputs(inputs) {
      return this.recipes.filter(function (recipe) {
        return recipe.outputs.some(function (recipeInput) {
          return inputs.some(function (input) {
            return recipeInput.equals(input);
          });
        });
      });
    }
  }, {
    key: "loadRecipes",
    value: function loadRecipes(gamePath) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.recipes = [];
        var recipePath = gamePath + "/config/jeiexporter/exports/recipes/";

        _fsJetpack2.default.findAsync(recipePath, { matching: "*.json" }).then(function (files) {
          return Promise.all(files.map(function (file) {
            return _this.readRecipeFile(file);
          })).then(function () {
            return resolve();
          });
        });
      });
    }
  }, {
    key: "readRecipeFile",
    value: function readRecipeFile(file) {
      var _this2 = this;

      return _fsJetpack2.default.readAsync(file, 'json').then(function (file) {
        return _this2.loadRecipeFile(file);
      });
    }
  }, {
    key: "loadRecipeFile",
    value: function loadRecipeFile(file) {
      var _this3 = this;

      file.recipes.forEach(function (recipe, i) {
        _this3.recipes.push(new _Recipe2.default(recipe.input.items.map(function (item) {
          return new _Stack2.default(item.stacks.map(function (stack) {
            return stack.name;
          }), item.amount);
        }), recipe.output.items.map(function (item) {
          return new _Stack2.default(item.stacks.map(function (stack) {
            return stack.name;
          }), item.amount);
        }), file.catalysts.map(function (catalyst) {
          return new _Stack2.default([catalyst]);
        }), i));
      });

      this.recipes.forEach(function (recipe) {
        recipe.inputs = reduceStacks(recipe.inputs);
        recipe.outputs = reduceStacks(recipe.outputs);
      });
    }
  }, {
    key: "list",
    get: function get() {
      return this.recipes;
    }
  }]);

  return Recipes;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "recipes", [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class.prototype, "list", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "list"), _class.prototype)), _class);
exports.default = Recipes;


var reduceStacks = function reduceStacks(stacks) {
  return stacks.reduce(function (total, current) {
    var other = total.find(function (stack) {
      return stack.equals(current);
    });

    if (!other) {
      total.push(current);
    } else {
      other.amount += current.amount;
    }

    return total;
  }, []);
};

/***/ })

};
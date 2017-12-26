import jetpack from "fs-jetpack";
import Recipe from "../classes/Recipe";
import Stack from "../classes/Stack";

export default class RecipeLoader {
  paths: string[];
  recipes: Recipe[];
  categories: string[];

  constructor(paths: string[]) {
    this.paths = paths;
    this.recipes = [];
    this.categories = [];
  }

  readRecipeFiles(): Promise<any> {
    return Promise.all(this.paths.map(path => this.readRecipeFile(path)))
  }

  readRecipeFile(path): Promise<any> {
    return new Promise((resolve, reject) => {
      jetpack.readAsync(path, 'json').then(file => {
        this.recipes = this.recipes.concat(this.loadRecipeFile(file));
        resolve(this.recipes);
      }).catch(() => resolve([]));
    });
  }

  loadRecipeFile(file: Object) {
    let recipes: Recipe[] = [];
    file.recipes.forEach((recipe, i) => {
      let recipeObj = new Recipe(
        recipe.input.items.map(item => new Stack(item.stacks.map(stack => stack.name), item.amount)),
        recipe.output.items.map(item => new Stack(item.stacks.map(stack => stack.name), item.amount)),
        file.catalysts.map(catalyst => new Stack([catalyst])),
        i
      );
      recipeObj.category = file.title;
      recipes.push(recipeObj);
    })

    recipes.forEach(recipe => {
      recipe.inputs = reduceStacks(recipe.inputs);
    })

    if (file.title) {
      this.categories.push(file.title);
    }
    
    recipes = recipes.map(recipe => recipe.serialize());

    return recipes;
  }
}

const reduceStacks = (stacks: Stack[]) => {
  return stacks.reduce((total: Array<Stack>, current: Stack) => {
    let other = total.find(stack => stack.equals(current));
  
    if (!other) {
      total.push(current);
    } else {
      other.amount += current.amount;
    }
  
    return total;
  }, [])
}
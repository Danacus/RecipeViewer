// @flow

export default class Stack {
  names: string[];
  constructor(names: string[]) {
    this.names = names;
  }

  matches(stack: Stack): boolean {
    return this.names.some(name => stack.names.includes(name))
  }

  matchesRegexList(list: RegExp[]) {
    return list.some(regex => 
      this.names.some(name => 
        name.match(regex)
      )
    )
  }
}
// @flow

export default class Stack {
  names: string[];
  amount: number;
  constructor(names: string[], amount: number = 0) {
    this.names = names;
    this.amount = amount;
  }

  serialize(): Object {
    return {
      names: this.names,
      amount: this.amount
    }
  }

  deserialize(data: Object) {
    this.names = data.names;
    this.amount = data.amount;
    return this;
  }

  equals(stack: Stack): boolean {
    return this.names.some(name => stack.names.includes(name)) || stack.names.some(name => this.names.includes(name))
  }

  isWhitelisted(list: RegExp[]) {
    return list.some(regex => 
      this.names.some(name => 
        name.match(regex)
      ) || this.names.length == 0
    )
  }

  isBlacklisted(list: RegExp[]) {
    return list.some(regex => 
      this.names.some(name => 
        name.match(regex)
      )
    )
  }
}
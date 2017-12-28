// @flow

import safeEval from 'notevil';
import { context } from './Context';

/*
A very, very naive way to transpile zenscript to javascript
*/

const transpiler = new Map([
  [/oreDict\.((?!get).*);/g, "new CTItemStack(\"ore:$1\")"],
  [/<([\w|:|\.|\*|\-]*)> *\* *((\d|\w)+)/g, "new CTItemStack(\"$1\", $2)"],
  [/((\d|\w)+) *\* *<([\w|:|\.|\*|\-]*)>/g, "new CTItemStack(\"$3\", $1)"],
  [/<([\w|:|\.|\*|\-]*)>/g, "new CTItemStack(\"$1\")"],
  [/import (crafttweaker).+ as (\w+);/g, ""],
  [/import (crafttweaker).+;/g, ""],
  [/import ([^ ]*) as (\w*);/g, "var $2 = $1;"],
  [/import ([^ ]*\.)(\w*);/g, "var $2 = $1$2;"],
  [/ as .[^(;|\)|,|})]*/g, ""],
  [/#[^\n]*[\n\\e]/g, ""],
  [/\/\/[^\n]*[\n\\e]/g, ""],
  [/\/\*[^\*]*(\*|\*[^/\*][^\*]*)*\*\//g, ""],
  [/val/g, "var"],
  [/for* (\w*) in (\d*) \.\. (\d*)/g, "for (var $1 = $2; $1 <= $3; $1++)"],
  [/for (\w+), (\w+) in (\w+) {([^}]*)}/g, "$3.forEach(function($2, $1) {$4});"],
  [/for (\w+) in (\w+) {([^}]*)}/g, "$2.forEach(function($1) {$3});"],
  [/if *\(((\w|\.)+) in ([^)]+)\)/, "if ($1.includes($3))"],
  [/if *\(((\w|\.)+) ([^\)]+)\)/, "if ($1($3))"]
]);

export const transpile = (source: string) => {
  let output = source
  transpiler.forEach((value, key) => {
    output = output.replace(key, value)
  })

  console.log(output)

  return output
};

export const evaluate = (code: string) => {
  safeEval(code, context);
}
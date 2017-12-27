// @flow

/*
A very, very naive way to transpile zenscript to javascript
*/

const transpiler = new Map([
  [/</g, "new CTItemStack(\""],
  [/(>)(\..+?\))/g, "\")$2"],
  [/>/g, "\")"],
  [/import ([^ ]*) as (\w*);/g, "var $2 = $1;"],
  [/import ([^ ]*\.)(\w*);/g, "var $2 = $1$2;"],
  [/ as .[^(;|\)|,|})]*/g, ""],
  [/#[^\n]*[\n\\e]/g, ""],
  [/\/\/[^\n]*[\n\\e]/g, ""],
  [/\/\*[^\*]*(\*|\*[^/\*][^\*]*)*\*\//g, ""],
  [/val/g, "var"],
  [/print/g, "console.log"],
  [/for* (\w*) in (\d*) \.\. (\d*)/g, "for (var $1 = $2; $1 <= $3; $1++)"],
  [/for (\w+), (\w+) in (\w+) {([^}]*)}/g, "$3.forEach(($2, $1) => {$4});"],
  [/for (\w+) in (\w+) {([^}]*)}/g, "$2.forEach($1 => {$3});"],
  [/if *\((\w+) in ([^)]+)\)/, "if ($1.inculdes($2))"]
]);

export const transpile = (source: string) => {
  let output = source
  transpiler.forEach((value, key) => {
    output = output.replace(key, value)
  })

  console.log(output)

  return output
};

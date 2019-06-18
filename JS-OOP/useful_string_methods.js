String.prototype.startsWith = function(substring) {
  const str_part = this.substring(0, substring.length);
  return str_part === substring;
};

String.prototype.endsWith = function(substring) {
  const str_part = this.substring(this.length - substring.length);
  return str_part === substring;
}

String.prototype.left = function(count) {
  return this.substring(0, count);
}

String.prototype.right = function(count) {
  return this.substring(this.length - count);
}

String.prototype.repeat = function(count) {
  return new Array(count + 1).join(this);
}


//
// Examples
//

console.log(' --- startsWith ---');
var example = "This is an example string used only for demonstration purposes.";
console.log(example.startsWith("This"));
console.log(example.startsWith("this"));

console.log(' --- endsWith ---');
var example = "This is an example string used only for demonstration purposes.";
console.log(example.endsWith("poses."));
console.log(example.endsWith("example"));

console.log(' --- left ---');
var example = "This is an example string used only for demonstration purposes.";
console.log(example.left(9));
console.log(example.left(90));

console.log(' --- right ---');
var example = "This is an example string used only for demonstration purposes.";
console.log(example.right(9));
console.log(example.right(90));

console.log(' --- combination of left and right ---');
var example = "abcdefgh";
console.log(example.left(5).right(2));

console.log(' --- repeat --- ');
var character = "*";
console.log(character.repeat(5));
// Alternative syntax
console.log("~".repeat(3))

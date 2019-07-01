const map = f => from => to => from(x => to(f(x)));

module.exports = map;

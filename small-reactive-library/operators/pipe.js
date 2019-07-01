const pipe = (...fs) => {
  let res = fs[0];
  for (let i = 1, n = fs.length; i < n; i++) {
    res = fs[i](res);
  }

  return res;
};

module.exports = pipe;

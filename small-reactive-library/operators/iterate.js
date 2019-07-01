const iterate = f => from => {
  let ask;

  const listen = x => {
    f(x);
    ask('next');
  };

  ask = from(listen);
  ask('next');

  return ask;
};

module.exports = iterate;

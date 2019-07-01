const filter = predicate => from => to => {
  let ask;

  const listen = x => {
    if (predicate(x)) {
      to(x);
    } else {
      ask('next');
    }
  };

  ask = from(listen);

  return ask;
};

module.exports = filter;

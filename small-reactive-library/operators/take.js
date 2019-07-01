const take = count => from => to => {
  let taken = 0;
  let ask;
  const listen = x => {
    if (taken < count) {
      taken++;
      to(x);
      if (taken === count) ask('stop');
    }
  };

  ask = from(listen);

  return ask;
};

module.exports = take;

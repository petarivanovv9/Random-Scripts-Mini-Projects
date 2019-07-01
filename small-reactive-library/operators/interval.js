const interval = period => to => {
  let i = 0;

  const id = setInterval(() => {
    to(i++);
  }, period);

  return (q) => {
    if (q === 'stop') {
      clearInterval(id);
    }
  };
};

module.exports = interval;

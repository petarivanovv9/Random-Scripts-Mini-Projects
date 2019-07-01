const { filter, interval, map, pipe, iterate, take } = require('../index');

pipe(
  interval(1000),
  map(x => x + 1),
  filter(x => x % 2 == 0),
  take(5),
  iterate(x => console.log(x))
);

// 2
// 4
// 6
// 8
// 10

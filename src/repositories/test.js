// test.js
const { Flight } = require('../models');

(async () => {
  console.log('before');
  await Flight.update(
    { totalSeats: 10 },
    { where: { id: 1 } }
  );
  console.log('after');
})();

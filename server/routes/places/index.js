const { mocks, addMockImage } = require('./mock');
const url = require('url');

module.exports.placesRequest = (req, res) => {
  const { location } = Object.assign({}, url.parse(req.url, true).query); // or req.query
  if (!location) return res.status(400).send('Please provide location');

  const data = mocks[location];
  if (!data) return res.status(404).send('location not found...');

  data.results = data.results.map(addMockImage);
  res.json(data);
};

const { mocks, addMockImage } = require('./mock');
const url = require('url');

module.exports.placesRequest = (req, res) => {
  const { location } = Object.assign({}, url.parse(req.url, true).query); // or req.query

  const data = mocks[location];
  if (data) data.results = data.results.map(addMockImage);

  res.json(data);
};

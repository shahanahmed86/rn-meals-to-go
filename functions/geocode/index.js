const { locations: locationsMock } = require('./geocode.mock');
const url = require('url');

module.exports.geocodeRequest = (req, res) => {
  const { city } = Object.assign({}, url.parse(req.url, true).query); // or req.query
  const locationMock = locationsMock[city.toLowerCase()];
  res.json(locationMock);
};

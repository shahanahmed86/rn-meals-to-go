const { locations: locationsMock } = require('./geocode.mock');
const url = require('url');

module.exports.geocodeRequest = (req, res) => {
  const { city } = Object.assign({}, url.parse(req.url, true).query); // or req.query
  if (!city) return res.status(400).send('Please provide city');

  const locationMock = locationsMock[city.toLowerCase()];
  if (!locationMock) return res.status(404).send('location not found...');

  res.status(200).json(locationMock);
};

const placesRoutes = require('./places');
const geocodeRoutes = require('./geocode');
const paymentRoutes = require('./payment');

module.exports = {
  ...placesRoutes,
  ...geocodeRoutes,
  ...paymentRoutes,
};

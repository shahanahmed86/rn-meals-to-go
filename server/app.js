const os = require('os');
const express = require('express');
const morgan = require('morgan');
const { geocodeRequest, placesRequest, createTokenRequest, paymentRequest } = require('./routes');

const app = express();

// logs
morgan.token('host', () => os.hostname);
app.use(morgan(':host :method :url :response-time'));

// parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// x-powered-by
app.disable('x-powered-by');

app.get('/api/geocode', geocodeRequest);
app.get('/api/placesNearby', placesRequest);
app.post('/api/payment/create-token', createTokenRequest);
app.post('/api/payment/pay', paymentRequest);

module.exports = app;

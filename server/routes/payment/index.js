const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_API_KEY);

module.exports.createTokenRequest = async (req, res) => {
  try {
    const token = await stripe.tokens.create({ card: req.body });
    res.status(200).json(token.id);
  } catch (error) {
    console.error('ERROR: ', error);
    res.status(400).json(error);
  }
};

module.exports.paymentRequest = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'USD',
      payment_method_types: ['card'],
      payment_method_data: {
        type: 'card',
        card: {
          token: req.body.token,
        },
      },
      confirm: true,
    });
    res.status(200).json(paymentIntent);
  } catch (error) {
    console.error('ERROR: ', error);
    res.status(400).json(error);
  }
};

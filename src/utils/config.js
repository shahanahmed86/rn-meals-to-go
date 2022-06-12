export const isDevelopment = process.env.NODE_ENV === 'development';

const localHost = 'http://10.0.2.2:5001/mealstogo-352207/us-central1';
const liveHost = 'http://localhost:5001/mealstogo-352207/us-central1';

export const host = isDevelopment ? localHost : liveHost;

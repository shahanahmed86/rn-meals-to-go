export const isDevelopment = process.env.NODE_ENV === 'development';

const localHost = 'http://192.168.1.218:5001/api';
const liveHost = 'http://localhost:5001/api';

export const host = isDevelopment ? localHost : liveHost;

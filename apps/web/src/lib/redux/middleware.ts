import { apiSlice } from './slices/apiSlice';

const middleware = [apiSlice.middleware];

export { middleware };

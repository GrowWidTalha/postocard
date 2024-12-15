import { hc } from 'hono/client';
// assign the client to a variable to calculate the type when compiling
const client = hc('');
export const hcWithType = (...args) => hc(...args);

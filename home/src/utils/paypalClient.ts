// utils/paypalClient.js
import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

const environment = new checkoutNodeJssdk.core.SandboxEnvironment(
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
  process.env.PAYPAL_CLIENT_SECRET!
);
const client = new checkoutNodeJssdk.core.PayPalHttpClient(environment);

export default client;

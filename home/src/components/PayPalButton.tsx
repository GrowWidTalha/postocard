// components/PayPalButton.js
'use client';

import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalButton = ({price, onSuccess}: {price: string, disabled: boolean, onSuccess: (values: any) => Promise<void>}) => (
  <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}>
    <PayPalButtons
      createOrder={async () => {
        const res = await fetch('/api/paypal/createOrder', { method: 'POST', body: JSON.stringify({ price:price }) });
        const data = await res.json();
        console.log(data.orderID)
        return data.orderID;
      }}
      onApprove={async (data) => {
        console.log("From the onApprove function", data.orderID);
        const res = await fetch('/api/paypal/captureOrder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderID: data.orderID }),
        });
        const details = await res.json();
        console.log(details)
        if(details.success){
            onSuccess(details?.data?.id)
        }
      }}
    />
  </PayPalScriptProvider>
);

export default PayPalButton;

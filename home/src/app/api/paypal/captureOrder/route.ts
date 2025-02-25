import { NextRequest, NextResponse } from 'next/server'
import paypal from '@paypal/checkout-server-sdk'
import client from '@/utils/paypalClient'

export async function POST(req: NextRequest) {
  try {
    // Parse the request body correctly
    const { orderID } = await req.json(); // ✅ Extract orderID correctly
    if (!orderID) {
      return NextResponse.json({ error: 'Missing orderID' }, { status: 400 });
    }

    const PaypalClient = client;
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    // @ts-ignore
    request.requestBody({});

    const response = await PaypalClient.execute(request);
    if (!response) {
      return NextResponse.json({ error: 'PayPal capture failed' }, { status: 500 });
    }

    // Return success response
    return NextResponse.json({ success: true, data: response.result });
  } catch (error) {
    console.error('Error capturing order:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

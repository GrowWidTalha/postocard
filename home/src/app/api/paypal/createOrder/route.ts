import paypal from "@paypal/checkout-server-sdk";
import client from "@/utils/paypalClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const PaypalClient = client;
  //This code is lifted from https://github.com/paypal/Checkout-NodeJS-SDK
  const { price } = await req.json(); // ✅ Extract orderID correctly
  if (!price) {
    return NextResponse.json({ error: "Missing price" }, { status: 400 });
  }

  const request = new paypal.orders.OrdersCreateRequest();
  request.headers["Prefer"] = "return=representation";
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: price,
        },
      },
    ],
  });
  const response = await PaypalClient.execute(request);
  if (response.statusCode !== 201) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
  return NextResponse.json({ orderID: response.result.id }, { status: 200});
}

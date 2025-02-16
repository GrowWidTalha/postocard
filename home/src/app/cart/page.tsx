"use client";


import React, { useState } from "react";
import Image from "next/image";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const page = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Happy Valentine's Day",
      price: 2500,
      quantity: 1,
      image: "/1.jpg",
    },
  ]);

  const handleQuantityChange = (
    id: number,
    type: "increment" | "decrement"
  ) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:   
                type === "increment"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <div>
      <div className="bg-gray-100 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Table */}
            <div className="lg:col-span-2">
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow-lg">
                  <thead>
                    <tr className="bg-[#F9F1E7] text-left text-gray-600">
                      <th className="p-4">Product</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Quantity</th>
                      <th className="p-4">Subtotal</th>
                      <th className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="p-4 flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-lg"
                          />
                          <span className="text-gray-700">{item.name}</span>
                        </td>
                        <td className="p-4 text-gray-600">
                          Rs. {item.price.toLocaleString()}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2 border rounded-lg px-3 py-2">
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, "decrement")
                              }
                              className="text-gray-600 hover:text-black"
                            >
                              -
                            </button>
                            <span className="text-gray-700">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, "increment")
                              }
                              className="text-gray-600 hover:text-black"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="p-4 text-gray-700">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cart Totals */}
            <div>
              <div className="bg-[#F9F1E7] p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Cart Totals</h2>
                <div className="flex justify-between text-gray-600 mb-2">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-800 font-bold mb-6">
                  <span>Total</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800">
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;


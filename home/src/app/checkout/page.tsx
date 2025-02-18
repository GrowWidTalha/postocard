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
  
  return (
    <div>
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="max-w-5xl w-full bg-white shadow-md rounded-lg p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Billing Details */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Billing details</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300 w-full"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300 w-full"
                />
              </div>
              <input
                type="text"
                placeholder="Company Name (Optional)"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300 w-full"
              />
              <select className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300 w-full">
                <option>Country / Region</option>
                <option>Sri Lanka</option>
              </select>
              <input
                type="text"
                placeholder="Street address"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300 w-full"
              />
              <input
                type="text"
                placeholder="Town / City"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300 w-full"
              />
              <select className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300 w-full">
                <option>Province</option>
                <option>Western Province</option>
              </select>
              <input
                type="text"
                placeholder="ZIP code"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300 w-full"
              />
              <input
                type="text"
                placeholder="Phone"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300 w-full"
              />
              <input
                type="email"
                placeholder="Email address"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300 w-full"
              />
              <textarea
                placeholder="Additional information"
                rows={4}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300 w-full"
              />
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Product</h2>
            <div className="border-b border-gray-200 pb-4 mb-6">
              <div className="flex justify-between">
                <img src="/1.jpg" alt="card" className="w-10 h-10" />
                <span>Happy Valentine's Day</span>
                <span>$. 2500</span>
              </div>
              <div className="flex justify-between font-semibold text-lg mt-4">
                <span>Total</span>
                <span className="text-orange-500">$. 2500</span>
              </div>
            </div>
            <h3 className="font-medium mb-4">Payment Method</h3>
            <div className="space-y-4">
              <label className="flex items-center">
                <input type="radio" name="payment" className="mr-2" />
                Direct Bank Transfer
              </label>
            </div>
            <p className="text-gray-600 text-sm mt-4">
              Your personal data will be used to support your experience
              throughout this website.
            </p>
            <button className="bg-blue-600 text-white font-medium py-3 px-6 rounded-lg mt-6 w-full">
              Place order
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
};

export default page;

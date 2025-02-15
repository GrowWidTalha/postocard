// import React from 'react'

// const orderpage = () => {
//     function toggleCart() {
//         throw new Error('Function not implemented.');
//     }

//     return (
//         <div onClick={(e) => {
//             const target = e.target as HTMLDivElement;
//             if (target.classList.contains("parent-cart-div")) {
//                 toggleCart();
//             }
//         }}
//             className={`${!isOpen ? "translate-x-full bg-opacity-0" : "translate-x-0 bg-opacity-50"
//                 } parent-cart-div fixed inset-0 z-30 bg-black transition-all duration-500 ease-in-out`}
//         >
//             <div className={`${!isOpen
//                     ? "right-[-100%] w-0 overflow-hidden"
//                     : "right-0 w-full sm:w-[70%] md:w-[50%] lg:w-[30%]"
//                 } bg-white fixed h-full sm:h-auto py-5 px-8 transition-all duration-500 ease-in-out`}
//             >

//                 <div className="flex justify-between items-center">
//                     <h1 className='font-semibold text-2xl sm:text-xl md:text-2xl'>Your Cart</h1>
//                     <button onClick={toggleCart}>
//                         <img src="/close-cart.svg"
//                             alt="close"
//                             width={20}
//                             height={20}
//                         />
//                     </button>
//                 </div>
//                 <span className='h-[1px] w-9/12 block bg-[#D9D9D9] my-6" '>
//                     {/* {cart Items} */}
//                     <div className='h-[calc(100vh-300px)] overflow-y-auto flex flex-col gap-10'>
//                         {!cartItems.length ? (
//                             <p className='text-xl text-center font-medium opacity-60'>
//                                 Your cart is empty
//                             </p>
//                         ) : (
//                             cartItems.map(item:any) => (
//                                 <div
//                                 ></div>
//                             )
//                         )}
//                     </div>

//                 </span>
//             </div>

//         </div>
//     )
// }

// export default orderpage

import { useState } from 'react';

const OrderPage = () => {
  const [cartItems, setCartItems] = useState([]);

  // Add sample product (you can modify this to match your actual product structure)
  const addToCart = () => {
    const newProduct = {
      id: Date.now(),
      name: 'Sample Product',
      price: 29.99,
      quantity: 1,
    };
    setCartItems([...cartItems, newProduct]);
  };

  // Remove product from cart
  const removeFromCart = (productId: any) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {/* Add Product Button (for demo) */}
        <button
          onClick={addToCart}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Sample Product
        </button>

        {cartItems.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 text-lg">Your cart is empty</p>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-200 py-4"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-lg font-semibold">${item.price.toFixed(2)}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Total Price */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
              <h2 className="text-xl font-bold">Total:</h2>
              <p className="text-xl font-bold">${calculateTotal().toFixed(2)}</p>
            </div>

            {/* Checkout Button */}
            <button className="w-full mt-6 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
import React from 'react'

const page = () => {
  return (
    <div className="max-w-10xl mx-auto p-10 bg-gray-50 rounded-lg shadow-md">
         <h1 className="text-5xl font-extrabold text-center mb-4 text-yellow-500 font-serif">Refund & Return Policy</h1>        
        <h1>Here's a <span className='font-semibold'>Refund & Returns Policy</span>for <span className='font-semibold'>PostoCard</span> based on your guidelines:</h1>
        <br />
      <p>At <span className='font-extrabold text-yellow-500'>PostoCard</span>, we take great care in printing and delivering your personalized greeting cards. Because each card is custom-made just for you, <span className='font-semibold'>we do not accept refunds or returns.</span> However, we understand that issues may arise during postal delivery, and we are here to help.</p>
      <h1 className='font-semibold'>1. No Refunds or Returns </h1>
      <p>Due to the <span className='font-semibold'>customized nature</span>of our products, all sales are <span className='font-semibold'>final</span>Once an order is placed and printed, it cannot be canceled, refunded, or returned.</p>
      <br />
    <h1 className='font-semibold'>2. Damaged or Lost Cards – Free Replacement</h1>
    <p>If your card:</p>
    <p>✔ Arrives <span className='font-semibold'>damaged</span> during postal delivery, or <span className='font-semibold'>Does not reach its destination</span>within <span className='font-semibold'>one month</span> of the order date,
    We will send a free replacement of the same card to the same address.</p>
    <h1 className='font-semibold'>How to Request a Replacement</h1>
    <p>To file a claim for a replacement card, please visit:
    <span className='font-semibold'>🔗 [link here]</span></p>
    <p>You will need to provide:</p>
    <li>Your <span className='font-semibold'>Order Number</span></li>
    <li>A <span className='font-semibold'>photo</span>of the damaged card (if applicable)</li>
    <li>The recipient’s <span className='font-semibold'>shipping address</span></li>
    {/* 3 */}
    <br />
    <h1 className='font-semibold'>3. Contact Us</h1>
    <p>If you have any questions or concerns, feel free to reach out:</p>
    <p className='font-semibold'>📧 Email: [support@PostoCard.com]</p>
    <p className='font-semibold'>🌐 Website: [www.PostoCard.com]</p>
    <div className='mt-10 p-6 bg-yellow-50 rounded-lg border-l-4 border-yellow-600'>
    <p>We appreciate your understanding and thank you for choosing <span className='font-semibold'>PostoCard!</span></p>
</div>
</div>
  )
}

export default page
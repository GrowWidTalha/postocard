import React from 'react'

const page = () => {
    return (
        <div className="max-w-10xl mx-auto p-10 bg-gray-50 rounded-lg shadow-md">
            <h1 className="text-5xl font-extrabold text-center mb-4 text-yellow-500 font-serif">Shipping Policy</h1>
            <p className=''>At <span className='font-semibold text-yellow-500'>PostoCard</span>, we ensure that your custom greeting cards are printed and shipped with care. Please review our shipping policy below for details on delivery methods and timelines.</p>
            <br />
            <h1 className='font-semibold'>1. Shipping Method</h1>
            <p className=''>All orders are shipped via <span className='font-semibold'>First-Class US Postage</span>through the <span className='font-semibold'> United States Postal Service (USPS).</span>This method provides an affordable and efficient way to send your personalized greeting cards both <span className='font-semibold'>domestically and internationally.</span></p>
            <br />
            <h1 className='font-semibold'>2. Shipping Timeframes</h1>
            <p className=''>Delivery times may vary depending on the destination, but generally, USPS First-Class Mail takes:</p>
            <li><span className='font-semibold'>Within the U.S.: 3-7 business days </span> after processing</li>
            <li><span className='font-semibold'>International Orders: 7-21 business days,</span> depending on the destination country and local postal service.</li>
            <br />
            <h1 className='font-semibold'>3. No Tracking Information Available</h1>
            <p>At this time, tracking information is <span className='font-semibold'>not available</span>for orders shipped via USPS First-Class Mail. We may introduce tracking services in the future to enhance customer experience.</p>
            <br />
            <h1 className='font-semibold'>4. Lost or Delayed Cards</h1>
            <p>If your card <span className='font-semibold'>does not arrive within one month</span>of the shipping date, please contact us for a <span className='font-semibold'>free replacement</span> to the same address. You can submit a claim here:</p>
            <p className='font-semibold'>🔗 [Insert Link to Replacement Request Form]            </p>
            <br />
            <h1 className='font-semibold'>5. Address Accuracy</h1>
            <p>Please ensure that you provide the correct <span className='font-semibold'>shipping address</span> at checkout. We are <span className='font-semibold'>not responsible</span> for orders shipped to incorrect or incomplete addresses provided by the customer</p>
        <br />
        <h1 className='font-semibold'>6. International Shipping Considerations</h1>
        <p>For international orders, <span className='font-semibold'>customs processing and local postal delays</span> may extend delivery times. Please note that <span className='font-semibold'>PostoCard is not responsible</span> for any additional customs fees, duties, or taxes that may be applied by the recipient's country.        </p>
        <br />
        <h1 className='font-semibold'>7. Contact Us</h1>
        <p>For any shipping-related inquiries, please reach out to us:</p>
        <li className='font-semibold'>📧 Email: [support@PostoCard.com]</li>
        <li className='font-semibold'>🌐 Website: [www.PostoCard.com]</li>
        <br />
        <div className='mt-10 p-6 bg-yellow-50 rounded-lg border-l-4 border-yellow-600'>
        <p>Thank you for choosing <span className='font-semibold'>PostoCard!</span> We appreciate your business and look forward to helping you send heartfelt messages effortlessly.        </p>
        </div>
        </div>
    
    )
}

export default page
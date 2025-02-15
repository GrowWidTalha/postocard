import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 text-gray-800">
      {/* How It Works */}
      <section className="text-center py-16 px-6">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 font-serif">How It Works</h2>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-700 shadow-md p-6 bg-white rounded-lg">
          <span className="block mb-4">1- <span className="font-semibold text-pink-600">Choose Your Card</span> – Pick from a stunning collection of designs tailored to birthdays, holidays, and more.</span>
          <span className="block mb-4">2- <span className="font-semibold text-pink-600">Enjoy a Thoughtful Verse</span> – The inside of the front page includes a <span className="font-semibold">pre-printed quote, poem, or verse</span> relevant to your occasion.</span>
          <span className="block mb-4">3- <span className="font-semibold text-pink-600">Add Your Personal Message</span> – Customize the inside back page with your own words, making each card uniquely yours.</span>
          <span className="block">4 - <span className="font-semibold text-pink-600">Print & Ship</span> – We’ll print and deliver your card with care, ensuring it reaches your loved one just the way you intended.</span>
        </p>
      </section>
      
      {/* Why Choose PostoCards? */}
      <section className="text-center py-12 px-6 bg-white shadow-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 font-serif">Why Choose PostoCards?</h3>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-700">
          <span className="block mb-2">✔ <span className="font-semibold text-pink-600">Save Time & Effort</span> – No more trips to the store or buying stamps.</span>
          <span className="block mb-2">✔ <span className="font-semibold text-pink-600">Ultimate Convenience</span> – Personalize, purchase, and send your card—all from home.</span>
          <span className="block mb-2">✔ <span className="font-semibold text-pink-600">High-Quality Printing & Paper</span> – Vibrant designs on premium cardstock.</span>
          <span className="block mb-2">✔ <span className="font-semibold text-pink-600">Fully Customizable</span> – Your message, your way.</span>
          <span className="block mb-2">✔ <span className="font-semibold text-pink-600">Perfect for Every Occasion</span> – Birthdays, anniversaries, holidays, and more.</span>
          <span className="block">✔ <span className="font-semibold text-pink-600">Effortless Gifting</span> – We print and ship directly for you.</span>
        </p>
      </section>
      
      {/* Add Your Own Designs Section */}
      <section className="text-center py-16 px-6 bg-gray-50 shadow-md rounded-lg mx-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 font-serif">Make Every Message Special—The Easy Way!</h2>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-700">
          With <span className="font-semibold text-pink-600">PostoCard</span>, you’re not just sending a card – you’re <span className="font-bold">saving time</span> while sharing a moment, a memory, and a message that lasts.
          <span className="font-semibold"> Skip the hassle of shopping, mailing, and stamping—let us do the work for you!</span>
        </p>
        
      </section>
    </div>
  );
}

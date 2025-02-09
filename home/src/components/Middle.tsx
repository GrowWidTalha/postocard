import Link from "next/link";

export default function Home() {
    return (
      <div className="min-h-screen bg-white text-gray-800">
        {/* How Its work */}
        <section className="text-center py-12 px-6">
          <h2 className="text-2xl font-bold text-purple-600 mb-6">How It Works
          </h2>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed">
            1- <span className="font-bold text-purple-600"> Choose Your Card</span> – Pick from a stunning collection of designs tailored to birthdays, holidays, and more.
            <br />
            2- <span className="font-bold text-purple-600">Enjoy a Thoughtful Verse</span> – The inside of the front page includes a <span className="font-bold text-purple-600"> pre-printed quote, poem, or verse</span> relevent to your occasion.
            <br />
            3- <span className="font-bold text-purple-600">Add Your Personal Message</span>  – Customize the inside back page with your own words, making each card uniquely yours.
            <br />
            4 - <span className="font-bold text-purple-600">Print & Ship</span> – We’ll print and deliver your card with care, ensuring it reaches your loved one just the way you intended.
          </p>
          <br />
          <p className="max-w-2xl mx-auto text-lg leading-relaxed"><span className="font-bold text-purple-600">
          Why Choose PostoCards?</span>
          <br />
          ✔ <span className="font-bold text-purple-600">Save Time & Effort</span> – No more trips to the store, searching for the perfect card, or buying stamps.
          <br />
          ✔ <span className="font-bold text-purple-600">Ultimate Convenience</span>– Personalize, purchase, and send your card—all from the comfort of your home.
          <br />
          ✔ <span className="font-bold text-purple-600">High-Quality Printing & Paper</span>– Vibrant designs on premium cardstock.
          <br />
          ✔ <span className="font-bold text-purple-600">Fully Customizable </span> – Your message, your way.
          <br />
          ✔ <span className="font-bold text-purple-600">Perfect for Every Occasion</span>– Birthdays, anniversaries, holidays, and more.
          <br />
          ✔ <span className="font-bold text-purple-600">Effortless Gifting </span>– We print and ship directly for you, so you never have to leave your house.
          </p>
        </section>
  
        {/* Add Your Own Designs Section */}
        <section className="text-center py-12 px-6 bg-gray-50">
          <h2 className="text-2xl font-bold text-purple-600 mb-6">Make Every Message Special—The Easy Way!</h2>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed">
            With <span className="font-bold text-purple-600">PostoCard</span>, <span className="">you’re not just sending a card – you’re</span> <span className="font-bold">Saving time</span>  while sharing a moment, a memory, and a message that lasts.<span className="font-semibold"> Skip the hassle of shopping, mailing, and stamping—let us do the work for you!
            </span>
          </p>
          
          <Link href={"/Cards"}>
          <button className="mt-8 px-6 py-2 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600">
            View Cards
          </button>
          </Link>
        
        </section>
      </div>
    );
  }
  
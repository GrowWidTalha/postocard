import Link from "next/link";

export default function Home() {
    return (
      <div className="min-h-screen bg-white text-gray-800">
        {/* Ready to Go Designs Section */}
        <section className="text-center py-12 px-6">
          <h2 className="text-2xl font-bold text-purple-600 mb-6">Ready to Go Designs</h2>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed">
            With <span className="font-bold text-purple-600">Cardzware</span>, the options for <span className="font-semibold">greeting cards</span> are endless! Your customers will have access to thousands of ready-made designs, suitable for every celebration and moment. From celebrating <span className="font-bold text-purple-600">Mom</span> and <span className="font-bold text-purple-600">Dad</span> on their special days to sending well wishes on <span className="font-bold text-purple-600">Thanksgiving</span>, Christmas, <span className="font-bold text-purple-600">Valentine’s Day</span>, Birthdays, <span className="font-bold text-purple-600">New Jobs</span>, and <span className="font-bold text-purple-600">Get Well Soon</span>, we’ve got you covered.
          </p>
          <p className="mt-4 text-lg">
            And the fun doesn’t stop there – we’re <span className="font-bold text-purple-600">always adding more cards to the mix!</span>
          </p>
        </section>
  
        {/* Add Your Own Designs Section */}
        <section className="text-center py-12 px-6 bg-gray-50">
          <h2 className="text-2xl font-bold text-purple-600 mb-6">Add Your Own Designs</h2>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed">
            With <span className="font-bold text-purple-600">Cardzware</span>, <span className="font-semibold">Brands, Designers, and Artists</span> can effortlessly turn their creative ideas into reality by uploading and selling their own <span className="font-semibold">greeting card designs</span>. Our platform makes it simple to upload your designs into our <span className="font-semibold">organized categories</span> and selectively enable or disable any of the existing Cardzware designs to create a personalized and unique experience for your customers.
          </p>
          
          <button className="mt-8 px-6 py-2 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600">
            View Portfolio
          </button>
        
        </section>
      </div>
    );
  }
  
import Image from 'next/image';

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-yellow-500 to-yellow-500 min-h-screen p-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Section */}
          <div className="space-y-6 text-white"> {/* Updated text color for contrast */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-black">Cards Designs</h2>
              <p>
                Choose from our extensive collection of over 7,000 pre-made designs or
                create your own unique designs.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Your Branding</h2>
              <p>
                Include your logo & web address on the back of all card designs to increase
                the exposure of your brand.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Mobile Ready</h2>
              <p>
                Our user interface is simple and easy to use, automatically adjusting to
                fit the design.
              </p>
            </div>
          </div>

          {/* Center Section with Phone Mockup */}
          <div className="flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
              <div className="p-10"> {/* Adjusted padding for balance */}
                <h3 className="text-center text-gray-800 font-semibold">Canvas Prints</h3>
                <div className="flex justify-center items-center mt-6">
                  <div className="w-60 h-80 bg-gray-100 flex items-center justify-center border rounded"> {/* Fixed height ratio */}
                    <p className="text-sm text-gray-500">Inside Message</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-6 text-gray-800"> {/* Updated text color for consistency */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Live Preview</h2>
              <p>
                Customers can preview their card as they enter a name or upload a photo,
                which is proven to increase conversion rates.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Card Manager</h2>
              <p>
                Publish or unpublish cards with the click of a button, enabling you to
                offer cards that complement your brand.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Global Delivery</h2>
              <p>
                Cards are printed using our network of production facilities in the United
                States, the UK, and beyond.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

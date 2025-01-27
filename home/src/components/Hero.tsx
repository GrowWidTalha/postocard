import Image from "next/image";

export default function GreetingCardComponent() {
  return (
    <div className="bg-yellow-500 py-10">
      <div className="max-w-5xl mx-auto text-center">
        {/* Header Section */}
        <h1 className="text-white text-4xl font-bold">
          Free Personalized Greeting Card App
        </h1>
        <p className="mt-4 text-white text-lg">
          The Print on Demand Greeting Card App for Shopify & WooCommerce. Choose
          from thousands of ready-to-use designs or add your own personal touch by
          creating and uploading your own designs. Once ordered, we’ll print and send
          the cards directly to the recipient from one of our global centers Location.
        </p>
      </div>

      {/* Card Designs Section */}
      <div className="mt-10 flex justify-center items-center gap-5 flex-wrap">
        {/* Card 1 */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-60">
          <Image
            src="/1.1.webp" // Replace with an actual image
            alt="Happy Birthday"
            width={240}
            height={320}
          />
          <div className="p-4">
            <h2 className="font-bold text-lg">Happy Valentine</h2>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-60">
          <Image
            src="/2.webp" // Replace with an actual image
            alt="Congratulations"
            width={240}
            height={320}
          />
          <div className="p-4">
            <h2 className="font-bold text-lg">Happy Marriage</h2>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-60">
          <Image
            src="/3.jpg" // Replace with an actual image
            alt="Just Married"
            width={240}
            height={320}
          />
          <div className="p-4">
            <h2 className="font-bold text-lg">Happy Birthday</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

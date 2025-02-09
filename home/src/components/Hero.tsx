import Image from "next/image";

export default function GreetingCardComponent() {
  return (
    <div className="bg-yellow-500 py-10">
      <div className="max-w-5xl mx-auto text-center">
        {/* Header Section */}
        <h1 className="text-white text-5xl font-bold">
          PostoCard Personalized Greeting Card App
          <br />
          <span className="text-white text-3xl font-bold">A Thoughtful Touch for Every Occasion
          </span>
        </h1>
        <p className="mt-4 text-white text-lg">
        At PostoCard, we believe that every message deserves a personal touch. Our beautifully designed 5x7-inch greeting cards let you celebrate life’s special moments in a way that’s truly unique. Whether it's a birthday, holiday, anniversary, or just a heartfelt note, our custom print-on-demand cards make every occasion more meaningful—all from the comfort of your home.
        </p>
      </div>

      {/* Card Designs Section */}
      <div className="mt-10 flex justify-center items-center gap-5 flex-wrap">
        {/* Card 1 */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-60">
          <Image
            src="/1.0.webp" // Replace with an actual image
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


import React from "react";

export default function JewelleryAboutUs() {
  return (
    <div className="bg-white min-h-screen">
      {/* <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.0519319886844!2d73.03910947406595!3d26.22750208920371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418b779b15f17f%3A0xdd3cdd6bd6778a08!2sJEWELLERY%20WALA!5e0!3m2!1sen!2sin!4v1762241579048!5m2!1sen!2sin"
        width="600"
        height="450"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe> */}

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Images */}
          <div className="space-y-6">
            {/* Main Large Image */}
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img
                src="noimage.jpg"
                alt="Traditional Indian Jewellery Woman"
                className="w-full h-96 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Secondary Large Image */}
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img
                src="noimage.jpg"
                alt="Elegant Jewellery Display"
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-serif text-amber-800 mb-2 relative inline-block">
                About Us
                <div className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-amber-700 to-amber-500 rounded-full mt-2"></div>
              </h2>
            </div>

            {/* First Paragraph */}
            <div className="space-y-4">
              <p className="text-gray-700 text-md font-sans leading-relaxed">
                Started in 2002, Jewellery Collection is India's largest fashion
                jewellery destination with a robust online presence and an
                expansive retail footprint of 20+ stores across India. Jewellery
                Collection has successfully introduced the concept of high
                quality, flawlessly crafted jewellery at affordable price points
                – a feat that remains unmatched in an increasingly busy segment.
              </p>
            </div>

            {/* Second Paragraph */}
            <div className="space-y-4">
              <p className="text-gray-700 text-md font-sans leading-relaxed">
                We take pride in our commitment to rare and traditional art,
                crafts and narratives, creating contemporary accessories for its
                discerning patrons. Handcrafted masterpieces, affordable luxury,
                unique artistic jewellery from some of the finest designers in
                the country are now at your fingertips with Jewellery
                Collection.
              </p>
            </div>

            {/* Third Paragraph */}
            <div className="space-y-4">
              <p className="text-gray-700 text-md font-sans leading-relaxed">
                The only brand with a versatile line of jewellery, perfect
                sartorial companions to every woman and man. Created by a team
                of exceptional designers, crafts people and connoisseurs of
                style. Jewellery Collection features jewellery for those who
                know their style from fashion fads and are willing to spark a
                trend rather than just follow it. Each piece of jewellery has
                been crafted exclusively for Jewellery Collection, with its
                outstanding karigari and lyrical aesthetic. Not just the
                exquisite jewellery, the prices too will add a sparkle to your
                smile.
              </p>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
}

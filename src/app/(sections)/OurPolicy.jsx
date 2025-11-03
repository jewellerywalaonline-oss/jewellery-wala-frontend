"use client";
import { motion } from "framer-motion";

const OurPolicy = () => {
  const policies = [
    {
      title: "Quality Assurance",
      description:
        "At Jewellery Wala, we are committed to providing our customers with the highest quality jewelry. Each piece is carefully crafted and inspected to ensure it meets our strict quality standards before reaching you.",
      icon: "🎯",
    },
    {
      title: "Secure Shopping",
      description:
        "Your security is our priority. We use industry-standard encryption to protect your personal and payment information. Shop with confidence knowing your data is safe with us.",
      icon: "🔒",
    },
    {
      title: "Easy Returns",
      description:
        "Not completely satisfied with your purchase? We offer a 30-day return policy. Items must be in original condition with all tags and certificates intact.",
      icon: "🔄",
    },
    {
      title: "Free Shipping",
      description:
        "Enjoy free standard shipping on all orders. We carefully package each item to ensure it reaches you in perfect condition.",
      icon: "🚚",
    },
    {
      title: "Customer Support",
      description:
        "Our dedicated customer service team is available to assist you with any questions or concerns. Contact us via email, phone, or live chat.",
      icon: "💬",
    },
    {
      title: "Ethical Sourcing",
      description:
        "We are committed to ethical sourcing practices. Our gemstones and metals are responsibly sourced from trusted suppliers who share our values.",
      icon: "💎",
    },
  ];

  return (
    <>
      <section className="py-6 md:py-20 ">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 mb-4">
              Our Policies
            </h1>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              At Jewellery Wala, we are committed to providing you with an
              exceptional shopping experience. Here's how we ensure your
              satisfaction at every step.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {policies.map((policy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{policy.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {policy.title}
                </h3>
                <p className="text-gray-600">{policy.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Additional Information
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Warranty
                </h3>
                <p className="text-gray-600">
                  All our jewelry comes with a 1-year manufacturer's warranty
                  against manufacturing defects. Please retain your original
                  receipt for warranty claims.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Size Guide
                </h3>
                <p className="text-gray-600">
                  Unsure about your ring or bracelet size? Visit our size guide
                  or contact our customer service for assistance in finding your
                  perfect fit.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Custom Orders
                </h3>
                <p className="text-gray-600">
                  Looking for something unique? We offer custom jewelry design
                  services. Contact us to discuss your vision and we'll bring it
                  to life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurPolicy;

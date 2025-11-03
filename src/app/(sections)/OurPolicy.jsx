"use client";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  RotateCcw,
  Truck,
  MessageCircle,
  Gem,
  Clock,
  RefreshCw,
  Award,
  Ruler,
  Sparkles,
} from "lucide-react";

const OurPolicy = () => {
  const policies = [
    {
      title: "Quality Assurance",
      description:
        "At Jewellery Wala, we are committed to providing our customers with the highest quality jewelry. Each piece is carefully crafted and inspected to ensure it meets our strict quality standards before reaching you.",
      icon: Shield,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Secure Shopping",
      description:
        "Your security is our priority. We use industry-standard encryption to protect your personal and payment information. Shop with confidence knowing your data is safe with us.",
      icon: Lock,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },

    {
      title: "Customer Support",
      description:
        "Our dedicated customer service team is available to assist you with any questions or concerns. Contact us via email, phone, or live chat.",
      icon: MessageCircle,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 mb-4">
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
            {policies.map((policy, index) => {
              const IconComponent = policy.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3 },
                  }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
                >
                  <motion.div
                    className={`${policy.bgColor} ${policy.color} w-16 h-16 rounded-full flex items-center justify-center mb-4`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent className="w-8 h-8" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors">
                    {policy.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {policy.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Refund & Cancellation Policy - Highlighted Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-xl p-8 border-2 border-amber-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="bg-amber-600 text-white w-12 h-12 rounded-full flex items-center justify-center"
              >
                <RefreshCw className="w-6 h-6" />
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Refund & Cancellation Policy
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-red-100 text-red-600 p-2 rounded-lg">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Order Cancellation
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  You can cancel your order within{" "}
                  <span className="font-semibold text-gray-800">24 hours</span>{" "}
                  of placing it. Simply contact our customer support team or use
                  your account dashboard to initiate the cancellation.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Refund Processing
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Once your return or cancellation is approved, refunds will be
                  processed within{" "}
                  <span className="font-semibold text-gray-800">
                    3-5 business days
                  </span>{" "}
                  according to Razorpay's processing timeline. The amount will
                  be credited to your original payment method.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 bg-white p-4 rounded-lg border-l-4 border-amber-500"
            >
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-800">Note:</span> For
                custom or personalized jewelry, cancellations may not be
                available once production has begun. Please contact us
                immediately if you need to make changes.
              </p>
            </motion.div>
          </motion.div>
          {/* Cookie & Data Usage Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-xl p-8 border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                className="bg-gray-800 text-white w-12 h-12 rounded-full flex items-center justify-center"
              >
                <Lock className="w-6 h-6" />
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Cookie & Data Usage Policy
              </h2>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                We use cookies to helps us recognize returning users and keep
                your shopping experience smooth. No personal data is shared with
                third-party services — your data stays with us.
              </p>
              <p>
                We analyze user activity only to understand which products are
                performing better and to improve our catalog. All insights are
                handled internally — no outside analytics or ad networks are
                involved.
              </p>
              <p>
                All deliveries are handled by our own trusted delivery agents.
                Each package has a unique Pakage ID to ensure secure and timely
                delivery. We guarantee your order will reach you safely and
                intact.
              </p>
              <p>
                Please note, EMI or installment payment options are currently{" "}
                <span className="font-semibold text-gray-800">
                  not available
                </span>
                . For product care, maintenance, or service inquiries, contact
                our team directly — we’re here to help.
              </p>
              <p>
                We’re{" "}
                <span className="font-semibold text-amber-700">
                  BIS Hallmark Certified
                </span>
                , ensuring authenticity and quality in every item. Product
                prices may fluctuate according to current market rates of gold,
                silver, and gemstones.
              </p>
            </div>

            {/* Placeholder for an image */}
            <div className="mt-8 bg-white rounded-xl border border-gray-200 shadow-md flex items-center justify-center h-60">
              <span className="text-gray-400 italic">
                [ Image Placeholder — e.g. Hallmark Certification / Secure
                Delivery Graphic ]
              </span>
            </div>
          </motion.div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-12 bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Additional Information
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-purple-100 text-purple-600 p-3 rounded-lg group-hover:scale-110 transition-transform">
                    <Ruler className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Size Guide
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Unsure about your ring or bracelet size? Visit our size guide
                  or contact our customer service for assistance in finding your
                  perfect fit.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-pink-100 text-pink-600 p-3 rounded-lg group-hover:scale-110 transition-transform">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Custom Orders
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Looking for something unique? We offer custom jewelry design
                  services. Contact us to discuss your vision and we'll bring it
                  to life.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default OurPolicy;

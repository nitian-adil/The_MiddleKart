import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const items = [
  "✅ Trusted sellers",
  "🚚 Fast delivery",
  "💳 Secure payments",
  "🔥 Best deals",
];

const WhyMiddleKart = () => {
  const controls = useAnimation();

  useEffect(() => {
    let isActive = true;

    const animateItems = async () => {
      let index = 0;

      while (isActive) {
        await controls.start((i) => ({
          scale: i === index ? 1.2 : 1,
          transition: { duration: 0.5, ease: "easeInOut" },
        }));

        await new Promise((r) => setTimeout(r, 900));

        index = (index + 1) % items.length;
      }
    };

    animateItems();

    return () => {
      isActive = false; // stop animation on exit
    };
  }, [controls]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex justify-center"
    >
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Why MiddleKart?
        </h3>

        <ul className="space-y-3 text-gray-600">
          {items.map((text, index) => (
            <motion.li
              key={index}
              custom={index}
              animate={controls}
              initial={{ scale: 1 }}
              className="origin-left"
            >
              {text}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default WhyMiddleKart;

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
          scale: i === index ? 1.15 : 1,
          color: i === index ? "#f97316" : "", // orange highlight
          transition: { duration: 0.4 },
        }));

        await new Promise((r) => setTimeout(r, 800));

        index = (index + 1) % items.length;
      }
    };

    animateItems();

    return () => {
      isActive = false;
    };
  }, [controls]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex justify-center"
    >
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl p-8 w-full max-w-sm text-black dark:text-white">

        <h3 className="text-xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
          Why MiddleKart?
        </h3>

        <ul className="space-y-4 text-gray-600 dark:text-gray-300">
          {items.map((text, index) => (
            <motion.li
              key={index}
              custom={index}
              animate={controls}
              initial={{ scale: 1 }}
              className="origin-left flex items-center gap-2"
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
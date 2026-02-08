import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import WhyMiddleKart from "../components/WhyMiddleKart ";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-200">

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
              Welcome to <span className="text-orange-500">MiddleKart</span> 🛒
            </h1>

            <p className="text-lg text-gray-700">
              Smart shopping, fast delivery, and exclusive deals — all in one place.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => navigate("/products")}
                className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
              >
                Shop Now
              </button>

              {/* <button
                onClick={() => navigate("/register")}
                className="border border-black px-6 py-3 rounded-xl hover:bg-black hover:text-white transition"
              >
                Create Account
              </button> */}
            </div>
          </motion.div>
        <WhyMiddleKart/>

        </div>
      </section>

      {/* OFFERS SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12"
          >
            🔥 Today’s Top Offers
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "50% OFF", desc: "On Electronics" },
              { title: "Buy 1 Get 1", desc: "Fashion Sale" },
              { title: "Free Delivery", desc: "On Orders Above ₹999" },
            ].map((offer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-gradient-to-br from-orange-400 to-pink-500 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition"
              >
                <h3 className="text-2xl font-bold">{offer.title}</h3>
                <p className="mt-2">{offer.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SLIDER SECTION */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            ⭐ Featured Categories
          </h2>

          <div className="flex gap-6 overflow-x-auto pb-4">
            {["Electronics", "Fashion", "Home", "Mobiles", "Accessories"].map(
              (item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  className="min-w-[250px] bg-white rounded-xl shadow-md p-6 text-center cursor-pointer"
                >
                  <h3 className="text-xl font-semibold">{item}</h3>
                  <p className="text-gray-500 mt-2">
                    Explore latest {item}
                  </p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
              <Footer/>
    </div>
  );
};

export default Home;

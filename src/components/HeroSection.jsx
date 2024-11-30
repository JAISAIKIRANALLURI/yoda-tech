import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => (
  <section id="home" className="pt-28 pb-16 bg-gradient-to-b from-gray-50 to-white">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Transform Your Business with
          <span className="text-green-600"> Expert Guidance</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We combine decades of experience with cutting-edge technology to deliver
          solutions that drive your business forward.
        </p>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
import React from 'react';
import { motion } from 'framer-motion';
import { services } from '../data/services';

 const ServicesSection = () => (
  <section id="services" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
        <p className="text-gray-600">Expert solutions for your tech needs</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="p-6 bg-white rounded-xl shadow-lg"
            >
              <div className="text-green-600 mb-4">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default ServicesSection;
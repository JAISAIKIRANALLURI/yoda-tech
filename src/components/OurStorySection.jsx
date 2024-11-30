import React from 'react';
import { motion } from 'framer-motion';
import { Target, BarChart, Users, Lightbulb } from 'lucide-react';

const OurStorySection = () => {
  const milestones = [
    {
      year: "2018",
      title: "The Beginning",
      description: "Started with a vision to transform digital solutions",
      icon: <Lightbulb className="w-6 h-6" />,
    },
    {
      year: "2020",
      title: "Growth & Innovation",
      description: "Expanded our team and services globally",
      icon: <BarChart className="w-6 h-6" />,
    },
    {
      year: "2022",
      title: "Global Impact",
      description: "Successfully delivered 100+ enterprise solutions",
      icon: <Target className="w-6 h-6" />,
    },
    {
      year: "2024",
      title: "Industry Leader",
      description: "Recognized as a top tech consulting firm",
      icon: <Users className="w-6 h-6" />,
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    })
  };

  const gradientTextStyle = {
    backgroundImage: 'linear-gradient(45deg, #22c55e, #16a34a)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent'
  };

  return (
    <section id="story" className="py-16 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-green-100 rounded-full opacity-20" />
        <div className="absolute top-1/2 -right-24 w-64 h-64 bg-green-50 rounded-full opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-16">
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            className="inline-block"
          >
            <h2 
              className="text-5xl font-bold mb-6 tracking-tight"
              style={gradientTextStyle}
            >
              Our Journey
            </h2>
          </motion.div>

          <motion.div
            className="relative max-w-3xl mx-auto"
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
          >
            {/* Decorative lines */}
            <div className="absolute left-0 -top-2 w-16 h-[2px] bg-green-500" />
            <div className="absolute right-0 -top-2 w-16 h-[2px] bg-green-500" />
            
            <p className="text-xl leading-relaxed text-gray-700 px-6">
              From a small tech startup to an industry leader, our journey has been 
              driven by{' '}
              <span className="font-semibold text-green-600">innovation</span>,{' '}
              <span className="font-semibold text-green-600">excellence</span>, and a{' '}
              <span className="font-semibold text-green-600">commitment</span> to 
              transforming businesses.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8"
        >
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="relative"
            >
              {/* Connected Line */}
              {index !== milestones.length - 1 && (
                <div className="hidden md:block absolute top-1/4 right-0 w-full h-[2px] bg-gradient-to-r from-green-500 to-green-200 transform translate-y-2" />
              )}

              <div className="bg-white rounded-xl p-6 shadow-lg relative z-10">
                <div className="mb-4 flex justify-center">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600"
                  >
                    {milestone.icon}
                  </motion.div>
                </div>
                <motion.span 
                  className="block text-2xl font-bold text-green-600 mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  {milestone.year}
                </motion.span>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {milestone.title}
                </h3>
                <p className="text-gray-600">
                  {milestone.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Today, we continue to push boundaries and deliver innovative solutions 
            that help businesses thrive in the digital age. Our commitment to excellence 
            and customer success remains at the heart of everything we do.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStorySection;
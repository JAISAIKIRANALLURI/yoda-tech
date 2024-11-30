import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

// Component Imports
import Logo from './components/Logo';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import OurStorySection from './components/OurStorySection';
import ServicesSection from './components/ServicesSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactForm from './components/ContactForm';

const App = () => {
  // State Management
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',  
    message: ''
  });

  // Handle scroll to detect active section and scroll-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id);
        }
      });

      // Show/hide scroll-to-top button
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Contact form handlers
  const handleContactClick = () => {
    setShowContactForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData);
      
      // Reset form and close modal
      setFormData({ name: '', email: '', message: '' });
      setShowContactForm(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation 
        Logo={Logo}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        onContactClick={handleContactClick}
      />

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <HeroSection />

        {/* Our Story Section */}
        <OurStorySection />

        {/* Services Section */}
        <ServicesSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Contact Form Modal */}
        <ContactForm 
          isOpen={showContactForm}
          onClose={() => setShowContactForm(false)}
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
        />
      </main>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors z-40"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-600">
                Transforming businesses through innovative technology solutions and expert consulting.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#services" className="text-gray-600 hover:text-green-600">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#story" className="text-gray-600 hover:text-green-600">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-gray-600 hover:text-green-600">
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <button
                onClick={handleContactClick}
                className="text-gray-600 hover:text-green-600"
              >
                Get in Touch
              </button>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 text-center text-gray-600">
            <p>© {new Date().getFullYear()} Yoda Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
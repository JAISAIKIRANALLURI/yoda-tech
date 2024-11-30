import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, AlertCircle, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ContactForm = ({ isOpen, onClose, formData, setFormData }) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const SERVICE_ID = "service_10cqu2g";
  const TEMPLATE_ID = "template_o5s4a3o";
  const PUBLIC_KEY = "kABD5RcV9wpZgLbow";

  // Initialize with empty strings if values don't exist
  const safeFormData = {
    name: '',
    email: '',
    phone: '',
    message: '',
    ...formData
  };

  // Validation rules
  const validateField = (name, value = '') => {
    switch (name) {
      case 'name':
        return !value.trim() 
          ? 'Name is required'
          : value.length < 2 
          ? 'Name must be at least 2 characters'
          : '';
      case 'email':
        return !value.trim() 
          ? 'Email is required' 
          : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
          ? 'Invalid email address'
          : '';
      case 'phone':
        return !value.trim() 
          ? 'Phone number is required'
          : !/^\+?[1-9]\d{9,14}$/.test(value.replace(/[^0-9+]/g, ''))
          ? 'Invalid phone number'
          : '';
      case 'message':
        return !value.trim()
          ? 'Message is required'
          : value.length < 10
          ? 'Message must be at least 10 characters'
          : '';
      default:
        return '';
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(prev => ({
      ...prev,
      [field]: validateField(field, safeFormData[field])
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(safeFormData).forEach(field => {
      newErrors[field] = validateField(field, safeFormData[field]);
    });
    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).every(error => !error)) {
      setIsSubmitting(true);
      try {
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            from_name: safeFormData.name,
            from_email: safeFormData.email,
            phone: safeFormData.phone,
            message: safeFormData.message,
          },
          PUBLIC_KEY
        );

        setShowSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });

        setTimeout(() => {
          setShowSuccess(false);
          onClose();
        }, 2000);

      } catch (error) {
        console.error('Email sending failed:', error);
        setErrors(prev => ({
          ...prev,
          submit: 'Failed to send message. Please try again.'
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Success Dialog Component
  const SuccessDialog = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg p-6 shadow-xl flex items-center space-x-4">
        <div className="bg-green-100 rounded-full p-2">
          <Check className="w-6 h-6 text-green-600" />
        </div>
        <p className="text-gray-800 font-medium">
          Thank you! We'll reach out to you soon.
        </p>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-lg p-8 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Contact Us</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                  disabled={isSubmitting}
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={safeFormData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur('name')}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 transition-colors ${
                      errors.name && touched.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="John Doe"
                    disabled={isSubmitting}
                  />
                  {errors.name && touched.name && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1 flex items-center"
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={safeFormData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 transition-colors ${
                      errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && touched.email && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1 flex items-center"
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={safeFormData.phone}
                    onChange={handleChange}
                    onBlur={() => handleBlur('phone')}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 transition-colors ${
                      errors.phone && touched.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+1234567890"
                    disabled={isSubmitting}
                  />
                  {errors.phone && touched.phone && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1 flex items-center"
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.phone}
                    </motion.p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={safeFormData.message}
                    onChange={handleChange}
                    onBlur={() => handleBlur('message')}
                    rows={4}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 transition-colors resize-none ${
                      errors.message && touched.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Tell us about your project..."
                    disabled={isSubmitting}
                  />
                  {errors.message && touched.message && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1 flex items-center"
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>

                {errors.submit && (
                  <p className="text-red-500 text-sm mt-2 text-center">
                    {errors.submit}
                  </p>
                )}
              </form>
            </motion.div>
          </motion.div>

          {/* Success Dialog */}
          <AnimatePresence>
            {showSuccess && <SuccessDialog />}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactForm;
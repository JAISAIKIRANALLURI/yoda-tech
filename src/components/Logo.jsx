import React from 'react';
import { motion } from 'framer-motion';

const Logo = () => (
  <div className="flex items-center space-x-3">
    <motion.svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      initial="hidden"
      animate="visible"
      className="text-green-600"
    >
      <defs>
        <linearGradient id="modernGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4CAF50" />
          <stop offset="100%" stopColor="#1B5E20" />
        </linearGradient>
      </defs>
      
      {/* Modern Tech Symbol */}
      <g transform="translate(5, 5)">
        {/* Abstract Y shape */}
        <motion.path
          d="M20 5 L30 20 L27 20 L20 10 L13 20 L10 20 L20 5"
          fill="url(#modernGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        
        {/* Tech elements */}
        <motion.rect
          x="17"
          y="22"
          width="6"
          height="12"
          fill="url(#modernGradient)"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        <motion.circle
          cx="20"
          cy="38"
          r="3"
          fill="url(#modernGradient)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        />
        
        {/* Circuit lines */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <line x1="8" y1="25" x2="32" y2="25" stroke="url(#modernGradient)" strokeWidth="1" />
          <line x1="8" y1="32" x2="32" y2="32" stroke="url(#modernGradient)" strokeWidth="1" />
        </motion.g>
      </g>
    </motion.svg>

    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="flex flex-col"
    >
      <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-400 text-transparent bg-clip-text">
        YODA
      </span>
      <span className="text-sm font-semibold tracking-wider text-gray-600">
        TECHNOLOGIES
      </span>
    </motion.div>
  </div>
);

export default Logo;
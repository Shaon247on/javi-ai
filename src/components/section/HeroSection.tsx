"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import FloatingParticles from '../ui/FloatingParticles';

const ClinLanding = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignup = () => {
    router.push('/signUp');
  };

  return (
    <div className="min-h-screen mt-[80px] flex flex-col items-center justify-center px-4 text-center">
      {/* Animated Logo */}
      <FloatingParticles />
      <motion.div
        className="mb-8"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 1, -1, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-20 h-20 border-2 border-blue-400 rounded-full flex items-center justify-center mb-4">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-blue-400">
            <path d="M20 8v24M12 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="20" cy="28" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        </div>
      </motion.div>

      {/* Main Heading */}
      <motion.h1 
        className="text-5xl md:text-6xl font-bold text-blue-400 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Clin Technologies
      </motion.h1>

      {/* Description */}
      <motion.div
        className="max-w-4xl mx-auto mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          Revolutionizing clinical documentation through{' '}
          <span className="text-orange-400 font-semibold">HIPAA COMPLIANT</span>{' '}
          advanced artificial intelligence, giving healthcare providers more time for what truly matters — patient care.{' '}
          <span className="text-orange-400 font-semibold">try it for FREE</span> today
        </p>
      </motion.div>

      {/* Features Description */}
      <motion.p
        className="text-gray-300 text-lg max-w-3xl mx-auto mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Our sophisticated AI platform intelligently processes clinical conversations, creating accurate documentation that integrates with your existing EMR system.
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.button
          onClick={handleLogin}
          className="px-8 py-3 border-2 border-blue-400 text-blue-400 rounded-full font-semibold hover:bg-blue-400 hover:text-white transition-colors duration-300 min-w-[120px]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
        
        <motion.button
          onClick={handleSignup}
          className="px-8 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors duration-300 min-w-[120px]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Signup
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ClinLanding;
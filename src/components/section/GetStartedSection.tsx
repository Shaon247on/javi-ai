"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, FileText, MessageCircle, Brain, Users, Lock, CheckCircle, Quote } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../animation/common.animation';

// Get Started Section Component
const GetStartedSection = () => {
    return (
      <motion.section 
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: '#1E293B' }}
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.div 
          className="max-w-5xl mx-auto text-center"
          variants={fadeInUp}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">Get Started</h2>
          <p className="text-slate-300 text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 px-4">
            Ready to transform your clinical documentation process? Contact our team to learn how Ghi Technologies can be tailored to your specific healthcare setting.
          </p>
          
          <p className="text-slate-400 mb-6 sm:mb-8 text-sm sm:text-base px-4">
            Or reach us directly via email at <span className="text-blue-400">support@ghitech.com</span>
          </p>
  
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <motion.button
              className="px-6 sm:px-8 py-3 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-colors text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
            <motion.button 
              className="px-6 sm:px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Signup
            </motion.button>
          </div>
        </motion.div>
      </motion.section>
    );
  };

  export default GetStartedSection;
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, FileText, MessageCircle, Brain, Users, Lock, CheckCircle, Quote } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../animation/common.animation';

// Benefits Section Component
const BenefitsSection = () => {
    const benefits = [
      "Reduction in documentation time by 40-60%",
      "Improved work-life balance with less after-hours charting",
      "Enhanced patient interaction due to less focus on note-taking",
      "More comprehensive and consistent clinical documentation",
      "Reduced risk of documentation errors and compliance issues"
    ];
  
    return (
      <motion.section
      id='benefits'        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: '#1E293B' }}
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.div 
          className="max-w-5xl mx-auto text-center"
          variants={fadeInUp}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-white">Benefits</h2>
          <p className="text-slate-300 text-base sm:text-lg lg:text-xl mb-8 sm:mb-12 px-4">
            Healthcare providers using Ghi Technologies solutions experience:
          </p>
          
          <div className="text-left space-y-3 sm:space-y-4 mb-8 sm:mb-12 max-w-3xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                className="flex items-start px-4"
                variants={fadeInUp}
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 sm:mr-4 flex-shrink-0"></div>
                <span className="text-slate-300 text-sm sm:text-base">{benefit}</span>
              </motion.div>
            ))}
          </div>
  
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

  export default BenefitsSection;
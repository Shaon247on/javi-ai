"use client";   

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, FileText, MessageCircle, Brain, Users, Lock, CheckCircle, Quote } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../animation/common.animation';

const SolutionsSection = () => {
    const solutions = [
      {
        icon: CheckCircle,
        title: "Validity",
        description: "Mitigate compliance risk with powerful AI that optimizes chart reviews for accuracy, integrity, coding, and compliance. Validity ensures your documentation meets the highest standards for accuracy, and maintains regulatory compliance.",
        iconColor: "text-green-400",
        bgColor: "bg-green-500/20"
      },
      {
        icon: Shield,
        title: "Redactify",
        description: "Effortlessly redact HIPAA identifiers from text, documents, and structured data with Redactify. Automaking your confidentiality obligations with AI-powered redaction and de-identification in clinical context.",
        iconColor: "text-yellow-400",
        bgColor: "bg-yellow-500/20"
      },
      {
        icon: FileText,
        title: "TranscriptX",
        description: "Speed up time documenting. TranscriptX delivers highly accurate medical transcriptions of patient encounters like visit, understanding nuanced medical terminology and clinical context for superior accuracy.",
        iconColor: "text-blue-400",
        bgColor: "bg-blue-500/20"
      },
      {
        icon: MessageCircle,
        title: "Chartnnight",
        description: "Your best friend with charting - turn any normal text into a high-quality chart, delivered exactly how healthcare professionals need it. Chartnnight integrates systems to match your workflows and documentation standards.",
        iconColor: "text-red-400",
        bgColor: "bg-red-500/20"
      }
    ];
  
    return (
      <motion.section 
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: '#0e1933' }}
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.div 
          className="max-w-7xl mx-auto text-center mb-12 sm:mb-16"
          variants={fadeInUp}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">Our Solutions</h2>
          <p className="text-slate-300 text-base sm:text-lg lg:text-xl max-w-4xl mx-auto px-4">
            Our comprehensive suite of AI-powered solutions transforms every aspect of healthcare documentation.
          </p>
        </motion.div>
  
        <motion.div 
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16"
          variants={staggerContainer}
        >
          {solutions.map((solution, index) => (
            <motion.div 
              key={index}
              className="bg-slate-800 border border-blue-500/30 rounded-lg p-6 sm:p-8 hover:border-blue-400/50 transition-colors"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center mb-4">
                <div className={`w-12 h-12 ${solution.bgColor} rounded-lg flex items-center justify-center mb-4 sm:mb-0 sm:mr-4`}>
                  <solution.icon className={`w-6 h-6 ${solution.iconColor}`} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">{solution.title}</h3>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                {solution.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
  
        <motion.div 
          className="max-w-5xl mx-auto text-center"
          style={{ backgroundColor: '#1E293B' }}
          variants={fadeInUp}
        >
          <div className="rounded-lg p-6 sm:p-8 lg:p-12">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 text-white">See Our Solutions in Action</h3>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
              {["TranscriptX", "Chartnnight", "Redactify", "Validity"].map((tag) => (
                <span key={tag} className="px-3 sm:px-4 py-2 bg-slate-700 rounded-full text-slate-300 text-sm sm:text-base">{tag}</span>
              ))}
            </div>
            <motion.button 
              className="w-full max-w-md bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-colors text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Click to expand comparison
            </motion.button>
          </div>
        </motion.div>
      </motion.section>
    );
  };

  export default SolutionsSection;
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, FileText, MessageSquare, Brain, BookOpen, Lock, Users, ChevronRight, Star, Heart, Activity, Database } from 'lucide-react';


const AboutSection = () => {
    return (
      <motion.section 
      id='about'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-[#1E293B] text-white py-20 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
          >
            About Clin Technologies
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl leading-relaxed mb-8 text-gray-300"
          >
            Clin Technologies is the clinical care platform where it is specialized As they that incorporates a comprehensive suite of advanced 
            and innovative technologies designed to enhance clinical documentation, streamline healthcare delivery, and deliver a platform that 
            optimizes patient care through AI-driven solutions. We understand the criticality of accuracy and efficiency in the healthcare industry, 
            and our solutions are designed to address these needs while ensuring compliance and improving patient outcomes.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg leading-relaxed text-gray-400"
          >
            Our expertise lies in applying cutting-edge Legal Language Models (LLMs) and machine learning (ML) to solve real-world 
            challenges in healthcare documentation. Our platforms deliver enhanced experiences, reduce wait times for physicians, 
            boost clinical documentation efficiency, and provide secure and compliant solutions. We are committed to transforming 
            healthcare by providing innovative technology solutions that empower healthcare professionals to build the empowering clinical and enhance patients 
            outcomes that power future outcomes of records.
          </motion.p>
        </div>
      </motion.section>
    );
  };

  export default AboutSection;
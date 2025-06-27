"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, FileText, MessageCircle, Brain, Users, Lock, CheckCircle, Quote } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../animation/common.animation';

// Technology Section Component
const TechnologySection = () => {
    const technologies = [
      {
        icon: Brain,
        title: "Sophisticated Natural Language Processing",
        description: "We leverage state-of-the-art neural networks and advanced foundation models. This enables our system to grasp the nuances of medical language, understanding context, recognizing intent, and accurately interpreting complex medical terminology with unprecedented precision. Our NLP technology comprehensively understands that are in complex medical environments, and contextual responses that make sense every time.",
        iconColor: "text-pink-400",
        bgColor: "bg-pink-500/20"
      },
      {
        icon: Users,
        title: "Learning Mode & Personalization",
        description: "Our AI grows smarter with every use. Templates. We make the process by learning directly from your specific organization's data and preference. This intelligence refines in understanding and helps tailor the recommendations, terminology, and workflow that are designed with your unique healthcare practice in mind to accurately and alignment with your unique clinical documentation needs.",
        iconColor: "text-blue-400",
        bgColor: "bg-blue-500/20"
      },
      {
        icon: Lock,
        title: "Robust Data Privacy & Security",
        description: "Protecting sensitive health information is our top priority. Our platform is architected with a security-first approach, featuring end-to-end encryption, zero-trust architecture, and comprehensive measures including comprehensive encryption, data at rest and in transit, secure access controls, complete audit trails to ensure data integrity and confidentiality, working across multiple layers of protection.",
        iconColor: "text-yellow-400",
        bgColor: "bg-yellow-500/20",
        badges: ["HIPAA COMPLIANT", "BUSINESS ASSOCIATE AGREEMENT"]
      }
    ];
  
    return (
      <motion.section 
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: '#132247' }}
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.div 
          className="max-w-7xl mx-auto text-center mb-12 sm:mb-16"
          variants={fadeInUp}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">Our Technology</h2>
          <p className="text-slate-300 text-base sm:text-lg lg:text-xl max-w-5xl mx-auto px-4">
            At Ghi Technologies, we've built our platform on groundbreaking AI technology specifically designed for healthcare. Our solutions use the latest advancements in natural language processing and machine learning to create a system that truly understands the complexities of medical documentation.
          </p>
        </motion.div>
  
        <motion.div 
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
          variants={staggerContainer}
        >
          {technologies.map((tech, index) => (
            <motion.div 
              key={index}
              className="text-left"
              variants={fadeInUp}
            >
              <div className={`w-12 h-12 ${tech.bgColor} rounded-lg flex items-center justify-center mb-4 sm:mb-6`}>
                <tech.icon className={`w-6 h-6 ${tech.iconColor}`} />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-white">{tech.title}</h3>
              <p className="text-slate-300 leading-relaxed mb-4 text-sm sm:text-base">
                {tech.description}
              </p>
              {tech.badges && (
                <div className="space-y-2">
                  {tech.badges.map((badge, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm font-semibold text-yellow-400">{badge}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    );
  };

  export default TechnologySection;
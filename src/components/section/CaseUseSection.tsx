"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, FileText, MessageCircle, Brain, Users, Lock, CheckCircle, Quote } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../animation/common.animation';

// Case Use Section Component
const CaseUseSection = () => {
    const cases = [
      {
        title: "Primary Care",
        description: "Our EM reduced our documentation time by 52%, allowing her to see 2 more patients daily without working longer hours.",
        quote: "This AI tool streamlined a tedious process, reducing visits from 30 minutes to 15 minutes.",
        author: "Dr. Sarah Chen, Family Medicine"
      },
      {
        title: "Emergency Medicine",
        description: "Our ED department implemented Ghi Tech, resulting in more accurate documentation and a 37% reduction in chart completion time during high-volume periods. Our nurses love it!",
        quote: "The system understands medical terminology better than any transcription service we've used.",
        author: "Dr. R. Miller"
      },
      {
        title: "Behavioral Health",
        description: "Chartnnight has been transformational for our clinic. Our therapists were spending 40% of their time on documentation, now it's closer to 20%. The documentation is more consistent and allows us to focus on patient care. More importantly, our patients have felt the difference in our attention.",
        author: "Clinical Director, Behavioral Health Practice"
      },
      {
        title: "Case Management",
        description: "Recently, with the number of patients I manage, documentation was becoming a nightmare. Using Ghi's tech, I can now track more patient cases, maintain better records, and have a clearer understanding of each patient's needs. I'm getting home early more often, including flexibility with my years.",
        author: "Senior Service Case Manager"
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">Case Use</h2>
          <p className="text-slate-300 text-base sm:text-lg lg:text-xl px-4">
            See how healthcare providers across specialties are transforming their practice with Ghi Technologies:
          </p>
        </motion.div>
  
        <motion.div 
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
          variants={staggerContainer}
        >
          {cases.map((caseStudy, index) => (
            <motion.div 
              key={index}
              className="bg-slate-800 border border-blue-500/30 rounded-lg p-6 sm:p-8"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-white">{caseStudy.title}</h3>
              <p className="text-slate-300 mb-4 leading-relaxed text-sm sm:text-base">
                {caseStudy.description}
              </p>
              {caseStudy.quote && (
                <div className="border-l-4 border-blue-500 pl-4 mb-4">
                  <p className="text-slate-200 italic text-sm sm:text-base">"{caseStudy.quote}"</p>
                </div>
              )}
              <p className="text-slate-400 text-xs sm:text-sm">— {caseStudy.author}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    );
  };
  
  export default CaseUseSection;
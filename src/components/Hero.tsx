import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-between py-16 px-8 bg-gray-50">
      <div className="flex-1 mb-8 md:mb-0 md:mr-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to JVAI</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6">Revolutionize your workflow with AI-powered solutions. Fast, reliable, and easy to use.</p>
        <button className="px-6 py-3 rounded bg-black text-white text-lg font-semibold hover:bg-gray-800">Get Started</button>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-72 h-72 bg-gray-200 rounded-lg flex items-center justify-center">
          {/* Replace with actual image/illustration */}
          <span className="text-gray-400">[Hero Image]</span>
        </div>
      </div>
    </section>
  );
};

export default Hero; 
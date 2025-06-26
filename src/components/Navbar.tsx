import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full flex items-center justify-between py-4 px-8 border-b border-gray-200 bg-white">
      <div className="font-bold text-xl">Logo</div>
      <ul className="flex gap-6">
        <li className="text-gray-700 hover:text-black cursor-pointer">Home</li>
        <li className="text-gray-700 hover:text-black cursor-pointer">Features</li>
        <li className="text-gray-700 hover:text-black cursor-pointer">Pricing</li>
        <li className="text-gray-700 hover:text-black cursor-pointer">FAQ</li>
      </ul>
      <div className="flex gap-4">
        <button className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100">Login</button>
        <button className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar; 
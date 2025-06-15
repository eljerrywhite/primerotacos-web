import React from 'react';
export default function Navbar() {
  return (
    <nav className="bg-black text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo SVG */}
        <div className="h-8">
          {/* ... tu SVG aquí ... */}
        </div>
        <a href="#" className="border border-white px-4 py-1 hover:bg-white hover:text-black transition-colors">
          USAR GPT
        </a>
      </div>
    </nav>
  );
}

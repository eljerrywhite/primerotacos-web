import React from 'react';

const Header: React.FC = () => {
  return (
    <nav className="bg-black text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="h-8">
          <svg viewBox="0 0 300 40" className="h-full" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="296" height="36" fill="none" stroke="white" strokeWidth="2" />
            <text 
              x="10" 
              y="28" 
              fontFamily="Courier, monospace" 
              fontSize="20" 
              fontWeight="bold" 
              fill="white"
            >
              PRIMERO TACOS
            </text>
            <path 
              d="M270 20 L280 8 L290 20 Z" 
              fill="none" 
              stroke="white" 
              strokeWidth="1.5" 
            />
            <line x1="240" y1="10" x2="240" y2="30" stroke="white" strokeWidth="1" />
            <text 
              x="245" 
              y="28" 
              fontFamily="Courier, monospace" 
              fontSize="14" 
              fontWeight="bold" 
              fill="white"
            >
              KNIJOS
            </text>
          </svg>
        </div>
        
        <a 
          href="https://chatgpt.com/g/g-C1HIeGZpN-primero-tacos" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="border border-white px-4 py-1 hover:bg-white hover:text-black transition-colors"
        >
          USAR GPT
        </a>
      </div>
    </nav>
  );
};

export default Header;
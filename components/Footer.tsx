import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 border-t border-black">
      <div className="container mx-auto px-4 text-center">
        <div className="h-7 mb-4 flex justify-center">
          <svg viewBox="0 0 300 40" className="h-full" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="296" height="36" fill="none" stroke="black" strokeWidth="2" />
            <text 
              x="10" 
              y="28" 
              fontFamily="Courier, monospace" 
              fontSize="20" 
              fontWeight="bold" 
              fill="black"
            >
              PRIMERO TACOS
            </text>
            <path 
              d="M270 20 L280 8 L290 20 Z" 
              fill="none" 
              stroke="black" 
              strokeWidth="1.5" 
            />
            <line x1="240" y1="10" x2="240" y2="30" stroke="black" strokeWidth="1" />
            <text 
              x="245" 
              y="28" 
              fontFamily="Courier, monospace" 
              fontSize="14" 
              fontWeight="bold" 
              fill="black"
            >
              KNIJOS
            </text>
          </svg>
        </div>
        
        <div className="text-sm mt-4">
          &copy; {new Date().getFullYear()} PRIMERO TACOS x LOS KNIJOS
        </div>
      </div>
    </footer>
  );
};

export default Footer;
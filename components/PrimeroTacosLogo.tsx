
import React from 'react';

interface PrimeroTacosLogoProps {
  className?: string;
  variant?: 'positive' | 'negative';
}

const PrimeroTacosLogo: React.FC<PrimeroTacosLogoProps> = ({ 
  className = '', 
  variant = 'positive' 
}) => {
  const fillColor = variant === 'positive' ? 'white' : 'black';
  
  return (
    <svg 
      className={className} 
      viewBox="0 0 300 60" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <text 
        x="150" 
        y="35" 
        textAnchor="middle" 
        fill={fillColor} 
        fontSize="24" 
        fontFamily="Courier Prime, monospace" 
        fontWeight="bold"
      >
        PRIMERO TACOS
      </text>
    </svg>
  );
};

export default PrimeroTacosLogo;

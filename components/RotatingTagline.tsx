// components/RotatingTagline.tsx
import React, { useState, useEffect } from 'react';
import { Gem } from 'lucide-react';

interface RotatingTaglineProps {
  taglines: string[];
  interval?: number; // milliseconds, default 4000 (4s)
}

const RotatingTagline: React.FC<RotatingTaglineProps> = ({ 
  taglines, 
  interval = 4000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (taglines.length <= 1) return;

    const timer = setInterval(() => {
      // Fade out
      setIsVisible(false);
      
      // After fade out, change text and fade in
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % taglines.length);
        setIsVisible(true);
      }, 300); // 300ms para el fade out
    }, interval);

    return () => clearInterval(timer);
  }, [taglines, interval]);

  if (!taglines || taglines.length === 0) return null;

  return (
    <div className="flex items-start gap-2">
      <Gem className="h-4 w-4 mt-0.5 flex-shrink-0 text-gray-600" />
      <p 
        className={`text-sm italic transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        "{taglines[currentIndex]}"
      </p>
    </div>
  );
};

export default RotatingTagline;
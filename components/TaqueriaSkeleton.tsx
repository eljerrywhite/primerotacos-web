// components/TaqueriaSkeleton.tsx
import React from 'react';

const TaqueriaSkeleton = () => {
  return (
    <div className="bg-white border-b-2 border-gray-200 pb-5 px-4 sm:px-5 pt-5">
      {/* Nombre */}
      <div className="h-6 skeleton rounded w-3/4 mb-2"></div>
      
      {/* Alcaldía */}
      <div className="h-4 skeleton rounded w-1/3 mb-3"></div>
      
      {/* Tagline */}
      <div className="space-y-2 mb-4">
        <div className="h-4 skeleton rounded w-full"></div>
        <div className="h-4 skeleton rounded w-5/6"></div>
      </div>
      
      {/* Footer con botón y calificación */}
      <div className="flex items-center justify-between">
        <div className="h-8 skeleton rounded w-24"></div>
        <div className="h-8 skeleton rounded w-12"></div>
      </div>
    </div>
  );
};

export default TaqueriaSkeleton;
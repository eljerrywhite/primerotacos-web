import React from 'react';
import PrimeroTacosLogo from './PrimeroTacosLogo';

const Header: React.FC = () => {
  return (
    <>
      {/* Barra de navegación */}
      <nav className="bg-black text-white py-3 md:py-4 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            {/* Logo con tamaños responsivos mejorados */}
            <div className="h-12 md:h-16 lg:h-20">
              <PrimeroTacosLogo className="h-full w-auto max-w-[200px] md:max-w-[250px] lg:max-w-[300px]" variant="positive" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
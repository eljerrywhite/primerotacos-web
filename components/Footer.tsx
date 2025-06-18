import React from 'react';
import PrimeroTacosLogo from './PrimeroTacosLogo';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <>
      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="border-2 border-white p-6 md:p-10 lg:p-12 text-center relative">
              {/* Decoración de esquinas */}
              <div className="absolute -top-1 -left-1 w-4 h-4 bg-black border-t-2 border-l-2 border-white"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-black border-t-2 border-r-2 border-white"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-black border-b-2 border-l-2 border-white"></div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-black border-b-2 border-r-2 border-white"></div>
              
              <h2 className="text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6 font-mono font-bold uppercase">
                ¿Conoces una taquería que no está aquí?
              </h2>
              
              <p className="mb-6 md:mb-8 text-base md:text-lg font-mono leading-relaxed">
                Usa nuestro GPT especializado para calificar nuevas taquerías 
                con criterios objetivos de calidad, servicio y lugar.
              </p>
              
              <a 
                href="https://chat.openai.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-2 border-white px-6 md:px-8 py-2.5 md:py-3 hover:bg-white hover:text-black transition-all duration-200 font-mono font-bold uppercase text-sm md:text-base"
              >
                Califica Nueva Taquería →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 border-t-2 border-black bg-white">
        <div className="container mx-auto px-4">
          {/* Logo con tamaños responsivos mejorados */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="h-14 md:h-20 lg:h-24">
              <PrimeroTacosLogo className="h-full w-auto max-w-[220px] md:max-w-[280px] lg:max-w-[320px]" variant="negative" />
            </div>
          </div>
          
          {/* Descripción */}
          <p className="text-center text-gray-600 max-w-md mx-auto mb-6 md:mb-8 font-mono text-xs md:text-sm">
            Un proyecto colaborativo para documentar y preservar 
            la cultura taquera de la Ciudad de México.
          </p>
          
          {/* Copyright */}
          <div className="text-center text-xs md:text-sm text-gray-600 font-mono">
            <p>&copy; {currentYear} PRIMERO TACOS</p>
            <p className="mt-1">Hecho con 🌮 en CDMX</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
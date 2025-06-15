import React from 'react';
import { MapPin } from 'lucide-react';
import { Taqueria } from '../types';

interface TaqueriaCardProps {
  taqueria: Taqueria;
  onClick: () => void;
}

const TaqueriaCard: React.FC<TaqueriaCardProps> = ({ taqueria, onClick }) => {
  return (
    <div className="border-b border-black py-4 hover:bg-gray-50 grid grid-cols-1 md:grid-cols-12 gap-2">
      {/* Vista móvil */}
      <div className="md:hidden space-y-2">
        <div className="font-bold text-lg">{taqueria.nombre}</div>
        {(taqueria.colonia || taqueria.alcaldia) && (
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            {taqueria.colonia && taqueria.alcaldia 
              ? `${taqueria.colonia}, ${taqueria.alcaldia}`
              : taqueria.colonia || taqueria.alcaldia
            }
          </div>
        )}
        <div className="flex justify-between items-center">
          <div className="bg-black text-white px-3 py-1 font-bold">
            {taqueria.calificacionFinal.toFixed(1)}
          </div>
        </div>
        <div className="flex justify-start items-center mt-2">
          <button 
            className="text-black underline hover:text-gray-600 transition-colors text-sm text-left"
            onClick={onClick}
          >
            VER DETALLES
          </button>
        </div>
      </div>
      
      {/* Vista escritorio */}
      <div className="hidden md:block col-span-5">
        <div className="font-bold">{taqueria.nombre}</div>
      </div>
      <div className="hidden md:flex col-span-4 items-center">
        {(taqueria.colonia || taqueria.alcaldia) ? (
          <>
            <MapPin className="w-4 h-4 mr-1 text-gray-500" />
            <span>
              {taqueria.colonia && taqueria.alcaldia 
                ? `${taqueria.colonia}, ${taqueria.alcaldia}`
                : taqueria.colonia || taqueria.alcaldia
              }
            </span>
          </>
        ) : (
          <span className="text-gray-400">Ubicación no especificada</span>
        )}
      </div>
      <div className="hidden md:flex col-span-2 justify-center items-center">
        <div className="bg-black text-white px-3 py-1 font-bold">
          {taqueria.calificacionFinal.toFixed(1)}
        </div>
      </div>
      <div className="hidden md:flex col-span-1 justify-start">
        <button 
          className="text-black underline hover:text-gray-600 transition-colors text-sm text-left"
          onClick={onClick}
        >
          VER DETALLES
        </button>
      </div>
    </div>
  );
};

export default TaqueriaCard;
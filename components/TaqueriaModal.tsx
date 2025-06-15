import React from 'react';
import { X, MapPin, Star } from 'lucide-react';
import { Taqueria } from '../types';

interface TaqueriaModalProps {
  taqueria: Taqueria;
  onClose: () => void;
}


const TaqueriaModal: React.FC<TaqueriaModalProps> = ({ taqueria, onClose }) => {
  // Función para renderizar estrellas
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-current" />);
    }
    
    if (hasHalfStar && fullStars < 5) {
      stars.push(<Star key="half" className="w-4 h-4 fill-current opacity-50" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4" />);
    }
    
    return stars;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-2xl w-full overflow-y-auto max-h-[90vh]">
        {/* Encabezado del modal */}
        <div className="bg-black text-white p-6 relative">
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </button>
          <h3 className="text-2xl font-bold mb-1">
            {taqueria.nombre}
          </h3>
          {(taqueria.colonia || taqueria.alcaldia) && (
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span>
                {taqueria.colonia && taqueria.alcaldia 
                  ? `${taqueria.colonia}, ${taqueria.alcaldia}`
                  : taqueria.colonia || taqueria.alcaldia
                }
              </span>
            </div>
          )}
        </div>
        
        {/* Contenido del modal */}
        <div className="p-6">
          {/* Calificaciones */}
          <div className="border border-black p-4 mb-6">
            <h4 className="text-lg font-bold mb-4 border-b border-black pb-2">
              CALIFICACIONES
            </h4>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">CALIDAD:</span>
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(taqueria.calidad)}</div>
                  <span className="font-bold">{taqueria.calidad.toFixed(1)}/5.0</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">SERVICIO:</span>
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(taqueria.servicio)}</div>
                  <span className="font-bold">{taqueria.servicio.toFixed(1)}/5.0</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">LUGAR:</span>
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(taqueria.lugar)}</div>
                  <span className="font-bold">{taqueria.lugar.toFixed(1)}/5.0</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-3 border-t border-gray-300">
                <span className="font-bold text-lg">CALIFICACIÓN FINAL:</span>
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(taqueria.calificacionFinal)}</div>
                  <span className="font-bold bg-black text-white px-3 py-1 text-lg">
                    {taqueria.calificacionFinal.toFixed(1)}/5.0
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Información adicional si existe */}
          {taqueria.ubicacion && (
            <div className="mb-6 p-4 bg-gray-50 border border-gray-200">
              <h4 className="font-bold mb-2">INFORMACIÓN</h4>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">Dirección:</span> Ver en Google Maps</p>
              </div>
            </div>
          )}
          
          {/* Acciones */}
          <div className="flex flex-col sm:flex-row gap-4">
            {taqueria.ubicacion && (
              <a 
                href={taqueria.ubicacion}
                target="_blank"
                rel="noopener noreferrer" 
                className="flex-1 bg-black hover:bg-gray-800 text-white text-center py-3 transition-colors font-medium"
              >
                VER UBICACIÓN EN MAPS
              </a>
            )}
            <button 
              className="flex-1 border-2 border-black hover:bg-gray-100 py-3 transition-colors font-medium"
              onClick={onClose}
            >
              CERRAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaqueriaModal;
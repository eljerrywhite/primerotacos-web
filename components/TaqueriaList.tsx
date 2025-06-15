import React from 'react';
import TaqueriaCard from './TaqueriaCard';
import { Taqueria } from '../types';

interface TaqueriaListProps {
  taquerias: Taqueria[];
  loading: boolean;
  onTaqueriaClick: (taqueria: Taqueria) => void;
}


const TaqueriaList: React.FC<TaqueriaListProps> = ({
  taquerias,
  loading,
  onTaqueriaClick
}) => {
  if (loading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-8">
          <div className="flex justify-center items-center h-64">
            <p className="text-xl">Cargando taquerías...</p>
          </div>
        </div>
      </section>
    );
  }

  if (taquerias.length === 0) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-8">
          <div className="text-center py-12">
            <p className="text-xl mb-4">No se encontraron taquerías que coincidan con tu búsqueda.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-8">
        <div className="border-t border-black">
          {/* Encabezado de la tabla */}
          <div className="hidden md:grid grid-cols-12 border-b border-black py-2">
            <div className="col-span-5 font-bold">NOMBRE</div>
            <div className="col-span-4 font-bold">UBICACIÓN</div>
            <div className="col-span-2 font-bold text-center">CALIFICACIÓN</div>
            <div className="col-span-1"></div>
          </div>
          
          {/* Lista de taquerías */}
          {taquerias.map(taqueria => (
            <TaqueriaCard
              key={taqueria._id}
              taqueria={taqueria}
              onClick={() => onTaqueriaClick(taqueria)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TaqueriaList;
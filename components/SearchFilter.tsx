import React, { useState } from 'react';
import { Search, Filter, ChevronDown, X } from 'lucide-react';

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
  filterAlcaldia: string;
  setFilterAlcaldia: (alcaldia: string) => void;
  resultCount: number;
  onClearFilters: () => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  setSearchTerm,
  sortOrder,
  setSortOrder,
  filterAlcaldia,
  setFilterAlcaldia,
  resultCount,
  onClearFilters
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <section className="py-8 border-b border-black">
      <div className="container mx-auto px-4 md:px-8">
        {/* Barra de búsqueda */}
        <div className="relative w-full max-w-2xl mx-auto mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar taquería, especialidad o colonia..."
            className="pl-10 pr-10 py-3 border-2 border-black w-full focus:outline-none focus:border-gray-600 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
        
        {/* Botón de filtros */}
        <div className="flex justify-center mb-4">
          <button 
            className="flex items-center justify-center border-2 border-black px-6 py-2 hover:bg-black hover:text-white transition-colors"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-5 w-5 mr-2" />
            FILTROS
            <ChevronDown className={`h-5 w-5 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        {/* Panel de filtros expandible */}
        {showFilters && (
          <div className="max-w-2xl mx-auto mb-4 p-4 border-2 border-black bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="sortOrder" className="block mb-2 font-bold">ORDENAR POR:</label>
                <select
                  id="sortOrder"
                  className="border-2 border-black p-2 w-full bg-white"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="calificacion">MEJOR CALIFICACIÓN</option>
                  <option value="nombre">ORDEN ALFABÉTICO</option>
                </select>
              </div>
              
              {/* Por ahora ocultamos el filtro de alcaldía hasta que tengamos esos datos */}
              {/* <div>
                <label htmlFor="filterAlcaldia" className="block mb-2 font-bold">ALCALDÍA:</label>
                <select
                  id="filterAlcaldia"
                  className="border-2 border-black p-2 w-full bg-white"
                  value={filterAlcaldia}
                  onChange={(e) => setFilterAlcaldia(e.target.value)}
                >
                  <option value="todas">TODAS</option>
                </select>
              </div> */}
            </div>
            
            {searchTerm && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={onClearFilters}
                  className="text-sm underline hover:text-gray-600"
                >
                  Limpiar búsqueda
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* Contador de resultados */}
        <div className="text-center text-gray-600">
          <span className="font-bold">{resultCount}</span> {resultCount === 1 ? 'taquería encontrada' : 'taquerías encontradas'}
        </div>
      </div>
    </section>
  );
};

export default SearchFilter;
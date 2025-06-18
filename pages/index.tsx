import React, { useState, useEffect } from "react";
import { MapPin, Search, Filter, ChevronDown, X } from "lucide-react";
import PrimeroTacosLogo from "../components/PrimeroTacosLogo";
import { Taqueria } from "../types";

const HomePage = () => {
  const [taquerias, setTaquerias] = useState<Taqueria[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("calificacion");
  const [selectedAlcaldia, setSelectedAlcaldia] = useState("todas");
  const [selectedTaqueria, setSelectedTaqueria] = useState<Taqueria | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const alcaldias = [
    "Todas",
    "Álvaro Obregón",
    "Azcapotzalco",
    "Benito Juárez",
    "Coyoacán",
    "Cuajimalpa",
    "Cuauhtémoc",
    "Gustavo A. Madero",
    "Iztacalco",
    "Iztapalapa",
    "La Magdalena Contreras",
    "Miguel Hidalgo",
    "Milpa Alta",
    "Tláhuac",
    "Tlalpan",
    "Venustiano Carranza",
    "Xochimilco",
  ];

  useEffect(() => {
    const fetchTaquerias = async () => {
      try {
        setLoading(true);
        // Usar el proxy local para evitar CORS
        const response = await fetch("/api/taquerias");
        const data = await response.json();
        setTaquerias(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTaquerias();
  }, []);

  const filteredTaquerias = taquerias
  .filter((taqueria) => {
    const matchesSearch = taqueria.nombre
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    
    // Agregar filtro por alcaldía
    const matchesAlcaldia = selectedAlcaldia === "todas" || 
      taqueria.alcaldia?.toLowerCase() === selectedAlcaldia.toLowerCase();
    
    return matchesSearch && matchesAlcaldia;
  })
  .sort((a, b) => {
    if (sortOrder === "calificacion") {
      return b.calificacionFinal - a.calificacionFinal;
    } else if (sortOrder === "nombre") {
      return a.nombre.localeCompare(b.nombre);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-mono">
      {/* Header con logo */}
      <nav className="bg-black text-white py-4 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="h-14 md:h-16 lg:h-20">
              <PrimeroTacosLogo
                className="h-full w-auto max-w-[220px] md:max-w-[260px] lg:max-w-[300px]"
                variant="negative"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Sección de título y búsqueda */}
      <section className="bg-black text-white py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold uppercase mb-2">
              PRIMERO TACOS × LOS KNIJOS
            </h1>
            <p className="text-sm md:text-base max-w-2xl mx-auto">
              Base de datos comunitaria de taquerías en la Ciudad de México,
              calificadas por expertos taqueros.
            </p>
          </div>

          {/* Barra de búsqueda */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar taquería, especialidad o colonia..."
                className="w-full pl-12 pr-4 py-4 text-black rounded-none focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Botón de filtros móvil */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full mt-4 py-3 bg-white text-black flex items-center justify-center gap-2 md:hidden"
            >
              <Filter className="h-4 w-4" />
              <span className="uppercase">Filtros</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
              />
            </button>

            {/* Filtros desktop */}
<div className="hidden md:flex gap-4 mt-4">
  <div className="flex-1">
    <label className="text-sm uppercase mb-1 block">Ordenar:</label>
    <select
      className="w-full px-4 py-2 bg-white text-black border border-gray-300"
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
    >
      <option value="calificacion">Mejor Calificación</option>
      <option value="nombre">Alfabético</option>
    </select>
  </div>
  <div className="flex-1">
    <label className="text-sm uppercase mb-1 block">Alcaldía:</label>
    <select
      className="w-full px-4 py-2 bg-white text-black border border-gray-300"
      value={selectedAlcaldia}
      onChange={(e) => setSelectedAlcaldia(e.target.value)}
    >
      {alcaldias.map((alcaldia) => (
        <option key={alcaldia} value={alcaldia.toLowerCase()}>
          {alcaldia}
        </option>
      ))}
    </select>
  </div>
</div>

            {/* Filtros móvil expandible */}
{showFilters && (
  <div className="md:hidden space-y-4 mt-4">
    <div>
      <label className="text-sm uppercase mb-1 block">
        Ordenar:
      </label>
      <select
        className="w-full px-4 py-2 bg-white text-black"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="calificacion">Mejor Calificación</option>
        <option value="nombre">Alfabético</option>
      </select>
    </div>
    <div>
      <label className="text-sm uppercase mb-1 block">
        Alcaldía:
      </label>
      <select
        className="w-full px-4 py-2 bg-white text-black"
        value={selectedAlcaldia}
        onChange={(e) => setSelectedAlcaldia(e.target.value)}
      >
        {alcaldias.map((alcaldia) => (
          <option key={alcaldia} value={alcaldia.toLowerCase()}>
            {alcaldia}
          </option>
        ))}
      </select>
    </div>
  </div>
)}
</div> 

          {/* Contador de resultados */}
          <div className="text-center mt-6 text-sm">
            {filteredTaquerias.length} taquerías encontradas
          </div>
        </div>
      </section>

      {/* Lista de taquerías */}
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <p>Cargando taquerías...</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredTaquerias.map((taqueria) => (
              <div
                key={taqueria._id}
                className="bg-white border-b-2 border-gray-200 pb-2 px-2 pt-2"
              >
                <h3 className="text-lg font-bold uppercase mb-2">
                  {taqueria.nombre}
                </h3>
                {/* Mostrar ubicación si existe */}
                {(taqueria.colonia || taqueria.alcaldia) && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {taqueria.colonia || "Sin colonia"}
                      {taqueria.alcaldia && `, ${taqueria.alcaldia}`}
                    </span>
                  </div>
                )}
                {/* Mostrar especialidad si existe */}
                {taqueria.especialidad && (
                  <p className="text-sm mb-3">{taqueria.especialidad}</p>
                )}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedTaqueria(taqueria);
                      setModalOpen(true);
                    }}
                    className="text-sm underline hover:no-underline"
                  >
                    VER DETALLES
                  </button>
                  <span className="bg-black text-white px-3 py-1 text-sm font-bold">
                    {taqueria.calificacionFinal.toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* CTA Section */}
      <section className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center border-2 border-white p-8">
            <h2 className="text-xl md:text-2xl font-bold uppercase mb-4">
              ¿CONOCES UNA TAQUERÍA QUE NO ESTÁ EN NUESTRO DIRECTORIO?
            </h2>
            <p className="mb-6">
              Ayúdanos a completar este directorio comunitario calificando
              nuevas taquerías con nuestro GPT especializado.
            </p>
            <a
              href="https://chatgpt.com/g/g-C1HIeGZpN-primero-tacos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-white px-6 py-3 hover:bg-white hover:text-black transition-colors uppercase"
            >
              CALIFICAR CON GPT
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 border-t-2 border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-4">
            <div className="h-12 md:h-16">
              <PrimeroTacosLogo
                className="h-full w-auto max-w-[180px] md:max-w-[240px]"
                variant="positive"
              />
            </div>
          </div>
          <div className="text-center text-sm text-gray-600">
            <p>© 2025 PRIMERO TACOS × LOS KNIJOS</p>
            <p className="mt-1">Hecho con 🌮 en CDMX</p>
          </div>
        </div>
      </footer>

{/* Modal */}
{modalOpen && selectedTaqueria && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    {/* Overlay con blur */}
    <div 
      className="absolute inset-0 bg-white bg-opacity-50 backdrop-blur-sm"
      onClick={() => setModalOpen(false)}
    />
    
    {/* Modal con borde */}
    <div className="relative bg-white max-w-md w-full max-h-[90vh] overflow-y-auto border-2 border-black">
      <div className="bg-black text-white p-6 relative">
        <button
          onClick={() => setModalOpen(false)}
          className="absolute top-4 right-4"
        >
          <X className="h-6 w-6" />
        </button>
              <h3 className="text-xl font-bold uppercase">
                {selectedTaqueria.nombre}
              </h3>
              {(selectedTaqueria.colonia || selectedTaqueria.alcaldia) && (
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {selectedTaqueria.colonia || "Sin colonia"}
                    {selectedTaqueria.alcaldia &&
                      `, ${selectedTaqueria.alcaldia}`}
                  </span>
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h4 className="font-bold uppercase mb-3">Calificaciones</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Calidad:</span>
                    <span className="font-bold">
                      {selectedTaqueria.calidad.toFixed(1)}/5.0
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Servicio:</span>
                    <span className="font-bold">
                      {selectedTaqueria.servicio.toFixed(1)}/5.0
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lugar:</span>
                    <span className="font-bold">
                      {selectedTaqueria.lugar.toFixed(1)}/5.0
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span>Final:</span>
                    <span className="bg-black text-white px-2 py-1 font-bold">
                      {selectedTaqueria.calificacionFinal.toFixed(1)}/5.0
                    </span>
                  </div>
                </div>
              </div>

              {/* Información adicional si existe */}
              {(selectedTaqueria.direccion ||
                selectedTaqueria.especialidad) && (
                <div className="mb-6">
                  <h4 className="font-bold uppercase mb-3">Información</h4>
                  {selectedTaqueria.direccion && (
                    <p className="text-sm mb-2">
                      <span className="font-semibold">Dirección:</span>{" "}
                      {selectedTaqueria.direccion}
                    </p>
                  )}
                  {selectedTaqueria.especialidad && (
                    <p className="text-sm">
                      <span className="font-semibold">Especialidad:</span>{" "}
                      {selectedTaqueria.especialidad}
                    </p>
                  )}
                </div>
              )}

              <div className="flex gap-4">
                {selectedTaqueria.ubicacion && (
                  <a
                    href={selectedTaqueria.ubicacion}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-black text-white text-center py-2 hover:bg-gray-800"
                  >
                    VER UBICACIÓN
                  </a>
                )}
                <button
                  onClick={() => setModalOpen(false)}
                  className="flex-1 border border-black py-2 hover:bg-gray-100"
                >
                  CERRAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
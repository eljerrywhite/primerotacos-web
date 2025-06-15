import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchFilter from "../components/SearchFilter";
import TaqueriaList from "../components/TaqueriaList";
import TaqueriaModal from "../components/TaqueriaModal";
import Footer from "../components/Footer";
import { Taqueria } from "../types";

export default function Home() {
  const [taquerias, setTaquerias] = useState<Taqueria[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTaqueria, setSelectedTaqueria] = useState<Taqueria | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("calificacion");
  const [filterAlcaldia, setFilterAlcaldia] = useState("todas");

  useEffect(() => {
    const fetchTaquerias = async () => {
      try {
        console.log("Fetching taquerias...");
        const response = await fetch("/api/taquerias");
        console.log("Response status:", response.status);
        const data = await response.json();
        console.log("Data received:", data);
        console.log("Number of taquerias:", data.length);
        // Log para ver la estructura exacta
        if (data.length > 0) {
          console.log("Ejemplo de taquería:", data[0]);
        }
        setTaquerias(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching taquerias:", error);
        setLoading(false);
      }
    };

    fetchTaquerias();
  }, []);

  const openTaqueriaModal = (taqueria: Taqueria) => {
    setSelectedTaqueria(taqueria);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTaqueria(null);
  };

  // Filtrar y ordenar taquerías
  const filteredTaquerias = taquerias
    .filter((taqueria) => {
      const matchesSearch = taqueria.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      
      // Por ahora, como no hay alcaldía en los datos, 
      // ignoramos este filtro o lo hacemos siempre true
      const matchesAlcaldia = filterAlcaldia === "todas" || 
        (taqueria.alcaldia && taqueria.alcaldia.toLowerCase() === filterAlcaldia.toLowerCase());
      
      return matchesSearch;
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
    <div className="min-h-screen bg-white font-mono">
      <Header />

      {/* Hero Section */}
      <header className="py-8 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-4xl mb-4">
            PRIMERO TACOS x LOS KNIJOS
          </h1>
          <p className="max-w-3xl mx-auto">
            Base de datos comunitaria de taquerías en la Ciudad de México,
            calificadas por expertos taqueros.
          </p>
        </div>
      </header>

      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        filterAlcaldia={filterAlcaldia}
        setFilterAlcaldia={setFilterAlcaldia}
        resultCount={filteredTaquerias.length}
        onClearFilters={() => {
          setSearchTerm("");
          setFilterAlcaldia("todas");
        }}
      />

      <TaqueriaList
        taquerias={filteredTaquerias}
        loading={loading}
        onTaqueriaClick={openTaqueriaModal}
      />

      {/* CTA para usar el GPT */}
      <section className="py-12 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto border border-white p-6 text-center">
            <h2 className="text-2xl mb-4">
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
              className="inline-block border border-white px-6 py-2 hover:bg-white hover:text-black transition-colors"
            >
              CALIFICAR CON GPT
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {modalOpen && selectedTaqueria && (
        <TaqueriaModal taqueria={selectedTaqueria} onClose={closeModal} />
      )}
    </div>
  );
}
import Head from "next/head";
import React, { useState, useEffect } from "react";
import {
  MapPin,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  X,
  Gem,
} from "lucide-react";
import PrimeroTacosLogo from "../components/PrimeroTacosLogo";
import { Taqueria } from "../types";
import RotatingTagline from "../components/RotatingTagline";
import { tacoEvents } from "../lib/analytics";
import TaqueriaSkeleton from "../components/TaqueriaSkeleton";
import EmptyState from "../components/EmptyState";

const HomePage = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const [taquerias, setTaquerias] = useState<Taqueria[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);
  const [sortOrder, setSortOrder] = useState("calificacion");
  const [selectedAlcaldia, setSelectedAlcaldia] = useState("todas");
  const [selectedTaqueria, setSelectedTaqueria] = useState<Taqueria | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [displayLimit, setDisplayLimit] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [randomIndexes, setRandomIndexes] = useState<{ [key: string]: number }>(
    {},
  );

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
        setError(false);
        const response = await fetch("/api/taquerias");
        if (!response.ok) throw new Error("Error al cargar");
        const data = await response.json();
        setTaquerias(data);
      } catch (error) {
        console.error("Error:", error);
        setError(true); // Establecer error en true si falla la carga
      } finally {
        setLoading(false);
      }
    };

    fetchTaquerias();
  }, []);

  useEffect(() => {
    // Generar índices random una sola vez cuando se cargan las taquerías
    const indexes: { [key: string]: number } = {};
    taquerias.forEach((taqueria) => {
      if (taqueria._id && taqueria.taglines && taqueria.taglines.length > 0) {
        indexes[taqueria._id] = Math.floor(
          Math.random() * taqueria.taglines.length,
        );
      }
    });
    setRandomIndexes(indexes);
  }, [taquerias]); // Solo se ejecuta cuando cambian las taquerías

  useEffect(() => {
    setDisplayLimit(10);
  }, [searchTerm, sortOrder, selectedAlcaldia]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalOpen) {
        setModalOpen(false);
      }
    };

    if (modalOpen) {
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }
  }, [modalOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 2. Agrega este useEffect para controlar cuándo mostrar el botón
  useEffect(() => {
    const handleScrollForButton = () => {
      const scrolled = window.scrollY > 400; // Mostrar después de 400px
      setShowScrollTop(scrolled);

      // Detectar si estamos cerca del footer
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const distanceFromBottom = documentHeight - (scrollTop + windowHeight);

      // Ocultar cuando estamos a 200px del final
      setNearFooter(distanceFromBottom < 200);
    };

    window.addEventListener("scroll", handleScrollForButton);
    return () => window.removeEventListener("scroll", handleScrollForButton);
  }, []);

  // AQUÍ VA LA FUNCIÓN normalizeText
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // Remueve diacríticos (acentos)
  };

  // Filtrar y ordenar taquerías
  const filteredTaquerias = taquerias
    .filter((taqueria) => {
      const searchNormalized = normalizeText(searchTerm);
      const matchesSearch =
        normalizeText(taqueria.nombre).includes(searchNormalized) ||
        normalizeText(taqueria.especialidad || "").includes(searchNormalized) ||
        taqueria.taglines?.some((tag) =>
          normalizeText(tag).includes(searchNormalized),
        );

      const matchesAlcaldia =
        selectedAlcaldia === "todas" ||
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
    <div
      className="min-h-screen font-mono"
      style={{
        backgroundColor: "var(--bg-primary)",
      }}
    >
      <Head>
        <title>Top Tacos y Taquerias CDMX por PrimeroTacos.mx</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-black text-white px-4 py-2 rounded z-50"
      >
        Saltar al contenido principal
      </a>

      {/* Header con logo */}
      <nav
        className={`bg-black text-white sticky top-0 z-40 transition-all duration-500 ${isScrolled ? "py-3" : "py-5 md:py-8"}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div
              className={`transition-all duration-500 ease-out ${
                isScrolled
                  ? "h-14 md:h-16 lg:h-20"
                  : "h-[84px] md:h-24 lg:h-[120px]"
              }`}
            >
              <PrimeroTacosLogo
                className={`h-full w-auto transition-all duration-500 ${
                  isScrolled
                    ? "max-w-[220px] md:max-w-[260px] lg:max-w-[300px]"
                    : "max-w-[330px] md:max-w-[390px] lg:max-w-[450px]"
                }`}
                variant="negative"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Sección de título y búsqueda */}
      <section className="bg-black text-white py-2 md:py-3">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              PRIMERO TACOS × LOS KNIJOS
            </h1>
            <p className="text-base sm:text-lg max-w-2xl mx-auto leading-normal">
              Directorio taquero hecho por chilangos, pa’ chilangos. Aquí se
              califica todo: taco, trato y rincón.
            </p>
          </div>

          {/* Barra de búsqueda */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />
              <label htmlFor="search-input" className="sr-only">
                Buscar taquerías
              </label>
              <input
                id="search-input"
                type="text"
                placeholder="Buscar taquería o especialidad"
                className="w-full pl-10 pr-12 py-3 sm:py-4 rounded-none text-base focus:outline-none focus:ring-2 focus:ring-gray-400"
                style={{
                  backgroundColor: "var(--search-bg)",
                  color: "var(--search-text)",
                }}
                value={searchTerm}
                onChange={(e) => {
                  const newSearchTerm = e.target.value;
                  setSearchTerm(newSearchTerm);

                  if (newSearchTerm.trim()) {
                    const results = taquerias.filter((taqueria) => {
                      const searchNormalized = normalizeText(newSearchTerm);
                      const matchesSearch =
                        normalizeText(taqueria.nombre).includes(
                          searchNormalized,
                        ) ||
                        normalizeText(taqueria.especialidad || "").includes(
                          searchNormalized,
                        ) ||
                        taqueria.taglines?.some((tag) =>
                          normalizeText(tag).includes(searchNormalized),
                        );

                      const matchesAlcaldia =
                        selectedAlcaldia === "todas" ||
                        taqueria.alcaldia?.toLowerCase() ===
                          selectedAlcaldia.toLowerCase();

                      return matchesSearch && matchesAlcaldia;
                    });

                    tacoEvents.search(newSearchTerm, results.length);
                  }
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    if (searchTerm.trim()) {
                      tacoEvents.clearSearch(searchTerm);
                    }
                    setSearchTerm("");
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded transition-colors"
                  aria-label="Limpiar búsqueda"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Botón de filtros móvil */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full mt-4 py-3 sm:py-4 bg-white text-black flex items-center justify-center gap-2 md:hidden text-base font-medium"
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
                <label
                  htmlFor="sort-order-desktop"
                  className="text-sm uppercase mb-1 block"
                >
                  Ordenar:
                </label>
                <div className="relative">
                  <select
                    id="sort-order-desktop"
                    className="w-full px-4 py-3 pr-10 text-base border focus:outline-none focus:ring-2 focus:ring-gray-400 appearance-none cursor-pointer"
                    style={{
                      backgroundColor: "var(--btn-bg)",
                      color: "var(--btn-text)",
                      borderColor: "var(--btn-border)",
                    }}
                    value={sortOrder}
                    onChange={(e) => {
                      const newSortOrder = e.target.value;
                      setSortOrder(newSortOrder);

                      tacoEvents.applyFilter({
                        filterType: "ordenamiento",
                        value: newSortOrder,
                        resultCount: filteredTaquerias.length,
                      });
                    }}
                  >
                    <option value="calificacion">Mejor Calificación</option>
                    <option value="nombre">Alfabético</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600 pointer-events-none" />
                </div>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="alcaldia-filter-desktop"
                  className="text-sm uppercase mb-1 block"
                >
                  Alcaldía:
                </label>
                <div className="relative">
                  <select
                    id="alcaldia-filter-desktop"
                    className="w-full px-4 py-3 pr-10 text-base border focus:outline-none focus:ring-2 focus:ring-gray-400 appearance-none cursor-pointer"
                    style={{
                      backgroundColor: "var(--btn-bg)",
                      color: "var(--btn-text)",
                      borderColor: "var(--btn-border)",
                    }}
                    value={selectedAlcaldia}
                    onChange={(e) => {
                      const newAlcaldia = e.target.value;
                      setSelectedAlcaldia(newAlcaldia);

                      tacoEvents.applyFilter({
                        filterType: "alcaldia",
                        value: newAlcaldia,
                        resultCount: taquerias.filter((t) => {
                          const matchesSearch = searchTerm
                            ? t.nombre
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase()) ||
                              t.especialidad
                                ?.toLowerCase()
                                .includes(searchTerm.toLowerCase()) ||
                              t.taglines?.some((tag) =>
                                tag
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase()),
                              )
                            : true;

                          const matchesAlcaldia =
                            newAlcaldia === "todas" ||
                            t.alcaldia?.toLowerCase() ===
                              newAlcaldia.toLowerCase();

                          return matchesSearch && matchesAlcaldia;
                        }).length,
                      });
                    }}
                  >
                    {alcaldias.map((alcaldia) => (
                      <option key={alcaldia} value={alcaldia.toLowerCase()}>
                        {alcaldia}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Filtros móvil expandible */}
            {showFilters && (
              <div className="md:hidden space-y-4 mt-4">
                <div>
                  <label
                    htmlFor="sort-order-mobile"
                    className="text-sm uppercase mb-1 block"
                  >
                    Ordenar:
                  </label>
                  <div className="relative">
                    <select
                      id="sort-order-mobile"
                      className="w-full px-4 py-3 pr-10 text-base bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 appearance-none"
                      value={sortOrder}
                      onChange={(e) => {
                        const newSortOrder = e.target.value;
                        setSortOrder(newSortOrder);

                        tacoEvents.applyFilter({
                          filterType: "ordenamiento",
                          value: newSortOrder,
                          resultCount: filteredTaquerias.length,
                        });
                      }}
                    >
                      <option value="calificacion">Mejor Calificación</option>
                      <option value="nombre">Alfabético</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="alcaldia-filter-mobile"
                    className="text-sm uppercase mb-1 block"
                  >
                    Alcaldía:
                  </label>
                  <div className="relative">
                    <select
                      id="alcaldia-filter-mobile"
                      className="w-full px-4 py-3 pr-10 text-base bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 appearance-none"
                      value={selectedAlcaldia}
                      onChange={(e) => {
                        const newAlcaldia = e.target.value;
                        setSelectedAlcaldia(newAlcaldia);

                        tacoEvents.applyFilter({
                          filterType: "alcaldia",
                          value: newAlcaldia,
                          resultCount: taquerias.filter((t) => {
                            const matchesSearch = searchTerm
                              ? t.nombre
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase()) ||
                                t.especialidad
                                  ?.toLowerCase()
                                  .includes(searchTerm.toLowerCase()) ||
                                t.taglines?.some((tag) =>
                                  tag
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase()),
                                )
                              : true;

                            const matchesAlcaldia =
                              newAlcaldia === "todas" ||
                              t.alcaldia?.toLowerCase() ===
                                newAlcaldia.toLowerCase();

                            return matchesSearch && matchesAlcaldia;
                          }).length,
                        });
                      }}
                    >
                      {alcaldias.map((alcaldia) => (
                        <option key={alcaldia} value={alcaldia.toLowerCase()}>
                          {alcaldia}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600 pointer-events-none" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contador de resultados */}
          <div className="text-center mt-6 text-base sm:text-lg">
            {filteredTaquerias.length} taquerías encontradas
          </div>
        </div>
      </section>

      {/* Lista de taquerías */}
      <main id="main-content" className="px-4 py-8">
        {loading ? (
          <div className="max-w-4xl mx-auto space-y-4">
            {[...Array(5)].map((_, i) => (
              <TaqueriaSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          // Empty state para error
          <div className="max-w-4xl mx-auto">
            <EmptyState
              type="error"
              onReload={() => window.location.reload()}
            />
          </div>
        ) : filteredTaquerias.length === 0 ? (
          // Empty states para búsqueda/filtros
          <div className="max-w-4xl mx-auto">
            {searchTerm && selectedAlcaldia !== "todas" ? (
              // Caso combinado: búsqueda + filtro
              <EmptyState
                type="combined"
                searchTerm={searchTerm}
                alcaldia={
                  selectedAlcaldia === "todas"
                    ? undefined
                    : alcaldias.find(
                        (a) => a.toLowerCase() === selectedAlcaldia,
                      ) || selectedAlcaldia
                }
                onReset={() => {
                  setSearchTerm("");
                  setSelectedAlcaldia("todas");
                }}
              />
            ) : searchTerm ? (
              // Solo búsqueda
              <EmptyState type="search" />
            ) : selectedAlcaldia !== "todas" ? (
              // Solo filtro por alcaldía
              <EmptyState
                type="filter"
                alcaldia={
                  alcaldias.find((a) => a.toLowerCase() === selectedAlcaldia) ||
                  selectedAlcaldia
                }
              />
            ) : (
              // No debería pasar, pero por si acaso
              <EmptyState type="search" />
            )}
          </div>
        ) : (
          // Lista normal de taquerías
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredTaquerias.slice(0, displayLimit).map((taqueria) => (
              <div
                key={taqueria._id}
                className="border-b-2 pb-5 px-4 sm:px-5 pt-5 transition-colors duration-200 cursor-pointer animate-fadeIn"
                style={{
                  backgroundColor: "var(--card-bg)",
                  borderBottomColor: "var(--card-border)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--card-hover)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--card-bg)")
                }
                onClick={() => {
                  setSelectedTaqueria(taqueria);
                  setModalOpen(true);
                  if (taqueria._id) {
                    tacoEvents.viewTaqueriaDetail({
                      id: taqueria._id,
                      nombre: taqueria.nombre,
                      calificacion: taqueria.calificacionFinal,
                      alcaldia: taqueria.alcaldia || "",
                    });
                  }
                }}
              >
                <h2 className="text-lg sm:text-xl font-bold uppercase mb-1">
                  {taqueria.nombre}
                </h2>
                {/* Alcaldía debajo del nombre */}
                {taqueria.alcaldia && (
                  <p
                    className="text-xs sm:text-sm mb-3"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {taqueria.alcaldia}
                  </p>
                )}
                {/* Tagline random o especialidad */}
                {taqueria.taglines && taqueria.taglines.length > 0 ? (
                  <p
                    className="text-sm sm:text-base italic mb-4 leading-snug"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    "
                    {taqueria._id && randomIndexes[taqueria._id] !== undefined
                      ? taqueria.taglines[randomIndexes[taqueria._id]]
                      : taqueria.taglines[0]}
                    "
                  </p>
                ) : taqueria.especialidad ? (
                  <p
                    className="text-sm sm:text-base italic mb-4 leading-snug"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    "{taqueria.especialidad}"
                  </p>
                ) : null}

                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base underline">
                    VER DETALLES
                  </span>
                  <span
                    className="px-3 py-1 text-base sm:text-lg font-bold"
                    style={{
                      backgroundColor: "var(--header-bg)",
                      color: "var(--header-text)",
                    }}
                  >
                    {taqueria.calificacionFinal.toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Botones de cargar más / volver arriba - SOLO SE MUESTRAN SI HAY RESULTADOS */}
        {!loading && !error && filteredTaquerias.length > 0 && (
          <div className="text-center py-8">
            <p
              className="text-sm sm:text-base mb-4"
              style={{ color: "var(--text-secondary)" }}
            >
              Mostrando {Math.min(displayLimit, filteredTaquerias.length)} de{" "}
              {filteredTaquerias.length} taquerías
            </p>

            {/* Botón Cargar Más */}
            {filteredTaquerias.length > displayLimit && (
              <button
                onClick={() => {
                  setIsLoadingMore(true);
                  setTimeout(() => {
                    const newDisplayLimit = displayLimit + 10;
                    setDisplayLimit(newDisplayLimit);
                    setIsLoadingMore(false);

                    tacoEvents.loadMoreTaquerias(
                      newDisplayLimit,
                      filteredTaquerias.length,
                    );
                  }, 300);
                }}
                disabled={isLoadingMore}
                className="border-2 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg uppercase font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  borderColor: "var(--btn-border)",
                  backgroundColor: "var(--btn-bg)",
                  color: "var(--btn-text)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--btn-hover-bg)";
                  e.currentTarget.style.color = "var(--btn-hover-text)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--btn-bg)";
                  e.currentTarget.style.color = "var(--btn-text)";
                }}
              >
                {isLoadingMore ? (
                  <span>
                    Cargando<span className="loading-dots"></span>
                  </span>
                ) : (
                  "Cargar más"
                )}
              </button>
            )}

            {/* Link Volver al inicio */}
            {displayLimit > 10 && (
              <div className="mt-4">
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    tacoEvents.returnToTop("pagination");
                  }}
                  className="text-sm sm:text-base underline hover:no-underline p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded"
                >
                  VOLVER AL INICIO
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* CTA Section */}
      <section className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div
            className="max-w-2xl mx-auto text-center border-2 p-6 sm:p-8"
            style={{
              borderColor: "var(--header-text)",
            }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase mb-4 leading-tight">
              ¿CONOCES UNA TAQUERÍA QUE NO ESTÁ EN ESTÁ EN EL RADAR?
            </h2>
            <p className="mb-6 text-base sm:text-lg leading-normal">
              Ayúdanos a descubrir joyitas del barrio. Comparte tus tacos
              favoritos con nuestro GPT taquero especializado.
            </p>
            <a
              href="https://chatgpt.com/g/g-C1HIeGZpN-primero-tacos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 px-6 py-3 sm:py-4 text-base sm:text-lg transition-colors uppercase focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                borderColor: "#ffffff",
                color: "#ffffff",
                backgroundColor: "#000000",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.color = "#000000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#000000";
                e.currentTarget.style.color = "#ffffff";
              }}
              onClick={() => {
                tacoEvents.clickCalificar();
              }}
            >
              CALIFICAR CON GPT
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pattern-background py-8" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-4">
            <div className="h-12 md:h-16">
              <PrimeroTacosLogo
  className="h-full w-auto max-w-[180px] md:max-w-[240px] dark-mode-invert"
  variant="positive"
/>
            </div>
          </div>
          <div className="text-center text-sm sm:text-base" style={{ color: "var(--text-secondary)" }}>
            <p>© 2025 PRIMERO TACOS × LOS KNIJOS</p>
            <p className="mt-1">Hecho con 🌮, barrio y amor por la CDMX.</p>
          </div>
        </div>
      </footer>

      {/* Botón flotante Volver arriba */}
      {showScrollTop && (
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            tacoEvents.returnToTop("floating-button");
          }}
          className={`scroll-to-top animate-slideIn ${nearFooter ? "near-footer" : ""}`}
          aria-label="Volver arriba"
        >
          <ChevronUp className="h-8 w-8 md:h-7 md:w-7" />
        </button>
      )}

      {/* Modal */}
      {modalOpen && selectedTaqueria && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay con blur */}
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{ backgroundColor: "var(--modal-overlay)" }}
            onClick={() => setModalOpen(false)}
          />

          {/* Modal con borde */}
          <div
            className="relative max-w-md w-full max-h-[88vh] sm:max-h-[90vh] overflow-hidden border-2 flex flex-col animate-modalSlideUp"
            style={{
              backgroundColor: "var(--modal-bg)",
              borderColor: "var(--modal-border)",
            }}
          >
            {/* Header compacto */}
            <div
              className="px-4 py-2 sm:py-3 relative flex-shrink-0"
              style={{
                backgroundColor: "var(--header-bg)",
                color: "var(--header-text)",
              }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-2xl font-bold uppercase pr-2 m-0">
                  {selectedTaqueria.nombre}
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1 -m-1 focus:outline-none focus:ring-2 focus:ring-white rounded hover:bg-white/10 transition-colors"
                  aria-label="Cerrar modal (ESC)"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
            </div>

            {/* Contenido scrolleable */}
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:p-8">
              {/* NUEVA SECCIÓN: Calificación gigante centrada */}
              <div className="text-center mb-4 sm:mb-6">
                <div className="text-5xl sm:text-6xl font-bold">
                  {selectedTaqueria.calificacionFinal.toFixed(1)}
                </div>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Promedio ponderado de 5.0
                </p>
              </div>

              {/* NUEVA SECCIÓN: Desglose horizontal */}
              <div
                className="flex justify-around mb-4 sm:mb-6 pb-4 sm:pb-6 border-b"
                style={{ borderBottomColor: "var(--card-border)" }}
              >
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">
                    {selectedTaqueria.calidad.toFixed(1)}
                  </div>
                  <div
                    className="text-xs sm:text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Calidad
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">
                    {selectedTaqueria.servicio.toFixed(1)}
                  </div>
                  <div
                    className="text-xs sm:text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Servicio
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">
                    {selectedTaqueria.lugar.toFixed(1)}
                  </div>
                  <div
                    className="text-xs sm:text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Lugar
                  </div>
                </div>
              </div>

              {/* Información adicional si existe - MANTENEMOS ESTRUCTURA */}
              {(selectedTaqueria.especialidad ||
                selectedTaqueria.taglines?.length > 0 ||
                selectedTaqueria.direccion) && (
                <div className="space-y-4">
                  {/* Mostrar taglines random si existen, si no mostrar especialidad */}
                  {selectedTaqueria.taglines &&
                  selectedTaqueria.taglines.length > 0 ? (
                    <div className="text-base leading-snug">
                      <RotatingTagline taglines={selectedTaqueria.taglines} />
                    </div>
                  ) : selectedTaqueria.especialidad ? (
                    <div className="flex items-start gap-3">
                      <Gem
                        className="h-4 w-4 mt-0.5 flex-shrink-0"
                        style={{ color: "var(--text-secondary)" }}
                      />
                      <p
                        className="text-base italic leading-snug"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        "{selectedTaqueria.especialidad}"
                      </p>
                    </div>
                  ) : null}

                  {/* Dirección */}
                  {selectedTaqueria.direccion && (
                    <div className="flex items-start gap-3">
                      <MapPin
                        className="h-4 w-4 mt-0.5 flex-shrink-0"
                        style={{ color: "var(--text-secondary)" }}
                      />
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {selectedTaqueria.direccion}
                        {selectedTaqueria.colonia &&
                          `, ${selectedTaqueria.colonia}`}
                        {selectedTaqueria.alcaldia &&
                          `, ${selectedTaqueria.alcaldia}`}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Botones fijos en el footer - MANTENEMOS EXACTAMENTE IGUAL */}
            <div
              className="border-t p-3 sm:p-6 flex-shrink-0"
              style={{
                borderTopColor: "var(--card-border)",
                backgroundColor: "var(--modal-bg)",
              }}
            >
              <div className="flex gap-3 sm:gap-4">
                {selectedTaqueria.ubicacion && (
                  <a
                    href={selectedTaqueria.ubicacion}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2.5 sm:py-3 text-sm sm:text-lg uppercase focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors font-medium"
                    style={{
                      backgroundColor: "var(--header-bg)",
                      color: "var(--header-text)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "0.8";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "1";
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (selectedTaqueria._id) {
                        tacoEvents.viewMap(
                          selectedTaqueria._id,
                          selectedTaqueria.nombre,
                          true,
                        );
                      }
                    }}
                  >
                    VER MAPA
                  </a>
                )}
                <a
                  href="https://chatgpt.com/g/g-C1HIeGZpN-primero-tacos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 border py-2.5 sm:py-3 text-sm sm:text-lg text-center uppercase focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors font-medium"
                  style={{
                    borderColor: "var(--btn-border)",
                    backgroundColor: "var(--btn-bg)",
                    color: "var(--btn-text)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--btn-hover-bg)";
                    e.currentTarget.style.color = "var(--btn-hover-text)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--btn-bg)";
                    e.currentTarget.style.color = "var(--btn-text)";
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (selectedTaqueria._id) {
                      tacoEvents.clickCalificar(
                        selectedTaqueria._id,
                        selectedTaqueria.nombre,
                      );
                    }
                  }}
                >
                  CALIFICAR
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

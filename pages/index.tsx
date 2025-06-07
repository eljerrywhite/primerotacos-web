// pages/index.tsx
import React, { useState, useEffect } from 'react'
import {
  MapPin,
  Search,
  X,
  Filter,
  ChevronDown,
  Star
} from 'lucide-react'

interface Taqueria {
  _id: string
  nombre: string
  calidad: number
  servicio: number
  lugar: number
  calificacionFinal: number
  ubicacion: string
  fecha: string
  alcaldia?: string
  colonia?: string
  especialidad?: string
  descripcion?: string
  direccion?: string
  horario?: string
}

const Home = () => {
  // — 1. Estados —
  const [taquerias, setTaquerias] = useState<Taqueria[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTaqueria, setSelectedTaqueria] = useState<Taqueria | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [sortOrder, setSortOrder] = useState<'calificacion' | 'nombre'>('calificacion')
  const [filterAlcaldia, setFilterAlcaldia] = useState('todas')
  const [showFilters, setShowFilters] = useState(false)

  // — Lista de alcaldías de CDMX —
  const alcaldias = [
    'Todas','Álvaro Obregón','Azcapotzalco','Benito Juárez','Coyoacán',
    'Cuajimalpa','Cuauhtémoc','Gustavo A. Madero','Iztacalco','Iztapalapa',
    'La Magdalena Contreras','Miguel Hidalgo','Milpa Alta','Tláhuac',
    'Tlalpan','Venustiano Carranza','Xochimilco'
  ]

  // — 2. fetch al backend —
useEffect(() => {
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/taquerias`)
    .then(res => res.json())
    .then(data => {
      setTaquerias(data);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, []);

  // — 3. Funciones y lógica de filtrado/orden —
  const openTaqueriaModal = (t: Taqueria) => {
    setSelectedTaqueria(t)
    setModalOpen(true)
  }

  const filteredTaquerias = taquerias
    .filter(t => {
      const term = searchTerm.toLowerCase()
      const matchName = t.nombre.toLowerCase().includes(term)
      const matchColonia = t.colonia?.toLowerCase().includes(term)
      const matchEsp = t.especialidad?.toLowerCase().includes(term)
      const matchAl = filterAlcaldia.toLowerCase() === 'todas'
        || t.alcaldia?.toLowerCase() === filterAlcaldia.toLowerCase()
      return (matchName || matchColonia || matchEsp) && matchAl
    })
    .sort((a, b) => {
      return sortOrder === 'calificacion'
        ? b.calificacionFinal - a.calificacionFinal
        : a.nombre.localeCompare(b.nombre)
    })

  // — 4. JSX completo —
  return (
    <div className="min-h-screen bg-white font-mono">
      {/* NAVBAR */}
      <nav className="bg-black text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="font-bold text-xl">PRIMERO TACOS</div>
          <button
            onClick={() => window.open('#', '_blank')}
            className="border border-white px-4 py-1 hover:bg-white hover:text-black transition"
          >
            USAR GPT
          </button>
        </div>
      </nav>

      {/* HEADER */}
      <header className="py-8 bg-black text-white text-center">
        <h1 className="text-3xl md:text-5xl mb-2">PRIMERO TACOS x LOS KNIJOS</h1>
        <p>Base de datos comunitaria de taquerías en CDMX, calificadas por expertos taqueros.</p>
      </header>

      {/* BÚSQUEDA & FILTROS */}
      <section className="py-8 border-b border-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-1/2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar taquería, colonia o especialidad..."
                className="pl-10 pr-4 py-2 border border-black w-full"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              className="md:hidden flex items-center space-x-2 border border-black px-4 py-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5" /> <span>FILTROS</span>
            </button>
            <div className="hidden md:flex items-center space-x-4">
              <label>ORDENAR:</label>
              <select
                className="border p-2"
                value={sortOrder}
                onChange={e => setSortOrder(e.target.value as any)}
              >
                <option value="calificacion">MEJOR CALIFICADO</option>
                <option value="nombre">ALFABÉTICO</option>
              </select>
              <label>ALCALDÍA:</label>
              <select
                className="border p-2"
                value={filterAlcaldia}
                onChange={e => setFilterAlcaldia(e.target.value)}
              >
                {alcaldias.map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>
          {showFilters && (
            <div className="md:hidden mt-4 space-y-4">
              {/* Repite aquí los selects para móvil */}
            </div>
          )}
        </div>
      </section>

      {/* LISTADO */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <p className="text-center">Cargando taquerías…</p>
          ) : filteredTaquerias.length === 0 ? (
            <p className="text-center">No hay taquerías. ¡Califica nuevos tacos!</p>
          ) : (
            filteredTaquerias.map(t => (
              <div
                key={t._id}
                className="border-b border-black py-4 flex justify-between items-center"
              >
                <div>
                  <div className="font-bold">{t.nombre}</div>
                  <div className="text-sm text-gray-600">
                    {t.colonia}, {t.alcaldia}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="font-bold">{t.calificacionFinal.toFixed(1)}</span>
                  <button
                    className="underline text-sm"
                    onClick={() => openTaqueriaModal(t)}
                  >
                    Detalles
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* CTA GPT */}
      <section className="py-12 bg-black text-white text-center">
        <p className="mb-4">¿Conoces una taquería nueva?</p>
        <button
          onClick={() => window.open('#', '_blank')}
          className="border border-white px-6 py-2"
        >
          CALIFICAR CON GPT
        </button>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-black text-center">
        <small>&copy; {new Date().getFullYear()} Primero Tacos x Los Knijos</small>
      </footer>

      {/* MODAL */}
      {modalOpen && selectedTaqueria && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 relative">
            <button
              className="absolute top-2 right-2"
              onClick={() => setModalOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-2">{selectedTaqueria.nombre}</h2>
            <p className="mb-2">{selectedTaqueria.descripcion}</p>
            <p className="text-sm text-gray-600">
              {selectedTaqueria.direccion}, {selectedTaqueria.colonia}
            </p>
            <a
              href={selectedTaqueria.ubicacion}
              target="_blank"
              className="underline text-blue-600 block mt-4"
            >
              Ver en Maps
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home

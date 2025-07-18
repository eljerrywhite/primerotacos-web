import React from "react";
import {
  Search,
  MapPin,
  AlertCircle,
  HelpCircle,
  Sparkles,
} from "lucide-react";

type EmptyStateType = "search" | "filter" | "error" | "combined";

interface EmptyStateProps {
  type: EmptyStateType;
  searchTerm?: string;
  alcaldia?: string;
  onReset?: () => void;
  onReload?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  searchTerm,
  alcaldia,
  onReset,
  onReload,
}) => {
  const GPT_URL = "https://chatgpt.com/g/g-C1HIeGZpN-primero-tacos";

  const getContent = () => {
    switch (type) {
      case "search":
        return {
          icon: (
            <Search
              className="h-12 w-12 sm:h-16 sm:w-16"
              style={{ color: "var(--empty-icon)" }}
            />
          ),
          title: "Esos tacos están más escondidos que la receta de la abuela",
          subtitle: null,
          cta: "SÉ EL HÉROE TAQUERO",
          showResetButton: false,
        };

      case "filter":
        return {
          icon: (
            <MapPin
              className="h-12 w-12 sm:h-16 sm:w-16"
              style={{ color: "var(--empty-icon)" }}
            />
          ),
          title: `En ${alcaldia} están esperando tu recomendación`,
          subtitle: "Esta alcaldía necesita más amor taquero",
          cta: "SUMA TU TAQUERÍA",
          showResetButton: false,
        };

      case "error":
        return {
          icon: (
            <AlertCircle
              className="h-12 w-12 sm:h-16 sm:w-16"
              style={{ color: "var(--empty-icon)" }}
            />
          ),
          title: "¡Ay, caramba! Algo salió mal",
          subtitle: "Los tacos se cayeron en el camino. Intenta de nuevo.",
          cta: null,
          showResetButton: false,
        };

      case "combined":
        return {
          icon: (
            <HelpCircle
              className="h-12 w-12 sm:h-16 sm:w-16"
              style={{ color: "var(--empty-icon)" }}
            />
          ),
          title: `No encontramos "${searchTerm}" en ${alcaldia}`,
          subtitle: "Prueba con menos filtros o agrégala tú mismo",
          cta: "AGREGAR TAQUERÍA",
          showResetButton: true,
        };

      default:
        return {
          icon: (
            <Sparkles
              className="h-12 w-12 sm:h-16 sm:w-16"
              style={{ color: "var(--empty-icon)" }}
            />
          ),
          title: "No hay taquerías aquí",
          subtitle: null,
          cta: "AGREGA UNA NUEVA TAQUERÍA",
          showResetButton: false,
        };
    }
  };

  const content = getContent();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Icono */}
      <div className="mb-6">{content.icon}</div>

      {/* Título */}
      <h3
        className="text-lg sm:text-xl text-center mb-2 max-w-md"
        style={{ color: "var(--empty-text)" }}
      >
        {content.title}
      </h3>

      {/* Subtítulo */}
      {content.subtitle && (
        <p
          className="text-base sm:text-lg text-center mb-6 max-w-md leading-normal"
          style={{ color: "var(--text-secondary)" }}
        >
          {content.subtitle}
        </p>
      )}

      {/* Acciones */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        {type === "error" ? (
          <button
            onClick={onReload}
            className="border-2 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg uppercase font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
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
            RECARGAR PÁGINA
          </button>
        ) : (
          <>
            {content.showResetButton && onReset && (
              <>
                <button
                  onClick={onReset}
                  className="text-sm sm:text-base underline hover:no-underline p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded uppercase"
                  style={{ color: "var(--text-primary)" }}
                >
                  LIMPIAR FILTROS
                </button>
                <span className="text-gray-400 hidden sm:inline">o</span>
              </>
            )}

            {content.cta && (
              <a
                href={GPT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg uppercase font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
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
                {content.cta}
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EmptyState;

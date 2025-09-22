// lib/analytics.ts

/**
 * Envía un evento personalizado a Google Analytics
 */
export const trackEvent = (
  eventName: string,
  eventParams: Record<string, any> = {},
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams);
  }
};

/**
 * Eventos específicos para Primero Tacos
 */
export const tacoEvents = {
  // ===== EVENTOS DE VISUALIZACIÓN DE TAQUERÍAS =====

  /**
   * Evento para registrar cuando un usuario ve el detalle de una taquería
   * Esto permite identificar las taquerías más populares
   */
  viewTaqueriaDetail: (taqueriaData: {
    id: string;
    nombre: string;
    calificacion: number;
    alcaldia: string;
  }) => {
    trackEvent("view_taqueria_detail", {
      taqueria_id: taqueriaData.id,
      taqueria_nombre: taqueriaData.nombre,
      taqueria_calificacion: taqueriaData.calificacion,
      taqueria_alcaldia: taqueriaData.alcaldia,
      // Timestamp para análisis de hora del día
      hour_of_day: new Date().getHours(),
    });
  },

  // ===== EVENTOS DE BÚSQUEDA =====

  /**
   * Evento para registrar cuando un usuario realiza una búsqueda
   * Captura tanto el término de búsqueda como los resultados obtenidos
   */
  search: (query: string, resultCount: number) => {
    trackEvent("search_taquerias", {
      search_term: query,
      result_count: resultCount,
      search_success: resultCount > 0,
    });
  },

  /**
   * Evento para registrar cuando un usuario borra la búsqueda
   */
  clearSearch: (previousQuery: string) => {
    trackEvent("clear_search", {
      previous_query: previousQuery,
    });
  },

  // ===== EVENTOS DE FILTRADO =====

  /**
   * Evento para registrar cuando un usuario aplica un filtro
   * Diferencia entre tipos de filtros (alcaldía, ordenamiento)
   */
  applyFilter: (filterData: {
    filterType: "alcaldia" | "ordenamiento" | "otro";
    value: string;
    resultCount: number;
  }) => {
    trackEvent("apply_filter", {
      filter_type: filterData.filterType,
      filter_value: filterData.value,
      result_count: filterData.resultCount,
      // Si no hay resultados, es importante saberlo
      filter_success: filterData.resultCount > 0,
    });
  },

  // ===== EVENTOS DE INTERACCIÓN =====

  /**
   * Evento para registrar cuando un usuario hace clic en Ver Más (paginación)
   */
  loadMoreTaquerias: (currentCount: number, totalCount: number) => {
    trackEvent("load_more_taquerias", {
      previous_count: currentCount - 10, // Asumiendo incrementos de 10
      new_count: currentCount,
      total_available: totalCount,
      percentage_loaded: Math.round((currentCount / totalCount) * 100),
    });
  },

  /**
   * Evento para registrar cuando un usuario hace clic en el botón de Calificar
   */
  clickCalificar: (taqueriaId?: string, taqueriaNombre?: string) => {
    trackEvent("click_calificar", {
      from_detail_view: !!taqueriaId,
      taqueria_id: taqueriaId || null,
      taqueria_nombre: taqueriaNombre || null,
    });
  },

  /**
   * Evento para registrar cuando un usuario interactúa con el mapa
   */
  viewMap: (
    taqueriaId: string,
    taqueriaNombre: string,
    fromDetailView: boolean,
  ) => {
    trackEvent("view_map", {
      taqueria_id: taqueriaId,
      taqueria_nombre: taqueriaNombre,
      from_detail_view: fromDetailView,
    });
  },

  /**
   * Evento para registrar cuando un usuario vuelve al inicio
   */
  returnToTop: (fromLocation: string) => {
    trackEvent("return_to_top", {
      from_location: fromLocation,
    });
  },

  /**
   * Evento para cuando un usuario hace click en una card con página individual
   */
  viewFeaturedTaqueria: (taqueriaData: {
    id: string;
    nombre: string;
    pageSlug: string;
  }) => {
    trackEvent("view_featured_taqueria", {
      taqueria_id: taqueriaData.id,
      taqueria_nombre: taqueriaData.nombre,
      page_slug: taqueriaData.pageSlug,
      from: "card_click",
    });
  },

  /**
   * Evento para cuando el badge de reseña aparece en pantalla
   */
  badgeImpression: (count: number) => {
    trackEvent("badge_impression", {
      badges_shown: count,
      timestamp: new Date().toISOString(),
    });
  },

  /**
   * Evento para click en el CTA del modal hacia página individual
   */
  detailPageNavigation: (taqueriaData: {
    id: string;
    nombre: string;
    pageSlug: string;
    from: "modal" | "card";
  }) => {
    trackEvent("detail_page_navigation", {
      taqueria_id: taqueriaData.id,
      taqueria_nombre: taqueriaData.nombre,
      page_slug: taqueriaData.pageSlug,
      navigation_from: taqueriaData.from,
    });
  },
};

// Declaración de tipos para window.gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: Record<string, any>,
    ) => void;
  }
}

export const SINIESTRO_ENDPOINTS = {
  PROCESAR: "/api/siniestros/procesar",
} as const;

export const SINIESTRO_LABELS = {
  MODULE_TITLE: "Módulo de Asignación Óptima de Grúas",
  INPUT_TITLE: "Payload de Entrada (Grafo, Depósitos y Accidente):",
  OUTPUT_TITLE: "Respuesta del Core / Ruta Más Corta (Salida):",
  SUBMIT_BUTTON: "Calcular Ruta Óptima",
  LOADING_BUTTON: "Calculando Ruta...",
  PLACEHOLDER_OUTPUT:
    "// El resultado del cálculo de la ruta óptima aparecerá aquí...",
} as const;

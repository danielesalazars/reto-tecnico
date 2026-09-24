# Backend Gestión de Siniestros

Microservicio de alto rendimiento desarrollado en Go encargado de procesar solicitudes de asignación de grúas y cálculo de rutas óptimas utilizando el algoritmo de Dijkstra sobre un grafo de ubicaciones y depósitos.

## Tecnologías Utilizadas

- Go (Golang) - Lenguaje principal
- Gin-Gonic - Framework web rápido y modular
- Gin-Contrib/CORS - Middleware para gestión de peticiones de origen cruzado
- Docker & Docker Compose - Contenedorización y despliegue

## Cómo Levantar la Aplicación

Para desplegar únicamente el microservicio de siniestros usando Docker desde la carpeta del backend:

### 1. Detener contenedores anteriores (si los hubiera):

```bash
docker compose down -v
```

### 2. Construir y levantar el contenedor en modo detached:

```bash
docker compose up --build -d
```

### 3. Verificar estado y logs:

```bash
docker logs -f backend-gestion-siniestros
```

> El servicio estará disponible de forma local en el puerto configurado (ej: http://localhost:3250).

## Pruebas del API (/api/v1/siniestros/asignar-grua)

### 🟢 Ejemplos de Payloads Válidos

Asignación estándar con múltiples depósitos y grafo completo

```json
{
  "accidentLocation": "San Isidro",
  "depots": ["Miraflores", "Ate"],
  "graph": {
    "Miraflores": { "San Isidro": 7, "Barranco": 3 },
    "San Isidro": { "Miraflores": 7, "Lince": 4 },
    "Barranco": { "Miraflores": 3, "Surco": 5 },
    "Lince": { "San Isidro": 4, "Surco": 6 },
    "Surco": { "Barranco": 5, "Lince": 6, "Ate": 10 },
    "Ate": { "Surco": 10 }
  }
}
```

### 🔴 Ejemplos de Payloads Erróneos

Falta de campos obligatorios (graph ausente)

```json
{
  "accidentLocation": "San Isidro",
  "depots": ["Miraflores", "Ate"]
}
```

Estructura vacía o incompleta

```json
{}
```

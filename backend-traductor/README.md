# Backend Traductor de Endosos

Microservicio encargado de recibir las solicitudes de endosos, consultar las reglas dinámicas y plantillas en la base de datos (con soporte de fallback a mocks ante caídas de red) y estructurar el payload final para el core.

## Tecnologías Utilizadas

- Node.js con TypeScript
- Hapi.js (Framework web)
- TypeORM + Driver mysql2
- MySQL 8.3
- Docker & Docker Compose

## Cómo Levantar la Aplicación

Para desplegar únicamente el backend y su base de datos asociada usando Docker desde la carpeta del backend:

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
docker logs -f api_backend_traductor
```

> El servicio estará disponible de forma local en el puerto configurado (ej: http://localhost:3150).

## Pruebas del API (/endorse/translate)

### 🟢 Ejemplos de Payloads Válidos

1. Producto: Vida | Tipo de Endoso: CambioSumaAsegurada

```json
{
  "policyNumber": "VID-11111111",
  "idEnvio": 1001,
  "frecuencia": "Mensual",
  "tipoEndoso": "CambioSumaAsegurada",
  "producto": "Vida",
  "plan": "PlanVidaPlus",
  "moneda": "Dólares",
  "usuario": "interface.servicios",
  "fechaSolicitud": "2026-09-23",
  "fechaCliente": "2026-09-23",
  "fechaEfectiva": "2026-10-01"
}
```

2. Producto: Hogar | Tipo de Endoso: CambioDomicilio

```json
{
  "policyNumber": "HOG-22222222",
  "idEnvio": 1002,
  "frecuencia": "Anual",
  "tipoEndoso": "CambioDomicilio",
  "producto": "Hogar",
  "plan": "PlanProteccionCasa",
  "moneda": "Nuevo Sol",
  "usuario": "interface.servicios",
  "fechaSolicitud": "2026-09-23",
  "fechaCliente": "2026-09-23",
  "fechaEfectiva": "2026-10-01"
}
```

3. Producto: SOAT | Tipo de Endoso: AnulacionParcial

```json
{
  "policyNumber": "SOA-33333333",
  "idEnvio": 1003,
  "frecuencia": "Contado",
  "tipoEndoso": "AnulacionParcial",
  "producto": "SOAT",
  "plan": "PlanSOATAuto",
  "moneda": "Nuevo Sol",
  "usuario": "interface.servicios",
  "fechaSolicitud": "2026-09-23",
  "fechaCliente": "2026-09-23",
  "fechaEfectiva": "2026-09-24"
}
```

### 🔴 Ejemplos de Payloads Erróneos

1. Producto inexistente ("Mascotas")

```json
{
  "policyNumber": "MAS-99999999",
  "idEnvio": 2001,
  "frecuencia": "Mensual",
  "tipoEndoso": "CambioFrecuencia",
  "producto": "Mascotas",
  "plan": "PlanPet",
  "moneda": "Nuevo Sol",
  "usuario": "interface.servicios",
  "fechaSolicitud": "2026-09-23",
  "fechaCliente": "2026-09-23",
  "fechaEfectiva": "2026-09-23"
}
```

2. Tipo de endoso inexistente para el producto ("CambioDeColor")

```json
{
  "policyNumber": "RUM-88888888",
  "idEnvio": 2002,
  "frecuencia": "Semestral",
  "tipoEndoso": "CambioDeColor",
  "producto": "Rumbo",
  "plan": "PlanRumbo",
  "moneda": "Nuevo Sol",
  "usuario": "interface.servicios",
  "fechaSolicitud": "2026-09-23",
  "fechaCliente": "2026-09-23",
  "fechaEfectiva": "2026-09-23"
}
```

3. Combinación totalmente errónea ("SeguroFicticio" / "EndosoLoco")

```json
{
  "policyNumber": "ERR-77777777",
  "idEnvio": 2003,
  "frecuencia": "Anual",
  "tipoEndoso": "EndosoLoco",
  "producto": "SeguroFicticio",
  "plan": "PlanFalso",
  "moneda": "Dólares",
  "usuario": "interface.servicios",
  "fechaSolicitud": "2026-09-23",
  "fechaCliente": "2026-09-23",
  "fechaEfectiva": "2026-09-23"
}
```

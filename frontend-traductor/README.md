# Frontend - Interfaz de Usuario (Traductor de Endosos)

Interfaz web orientada a la interacción con el microservicio backend para la gestión, simulación y traducción visual de solicitudes de endosos de seguros.

## Tecnologías Utilizadas

- Framework Web (React / Next.js / Vue según corresponda)
- Docker & Docker Compose para virtualización y despliegue unificado.

## Cómo Levantar la Aplicación

Para desplegar este frontend utilizando contenedores Docker de manera independiente o cruzada dentro del ecosistema:

### 1. Detener e interrumpir instancias previas:

```bash
docker compose down -v
```

### 2. Compilar y levantar la aplicación en segundo plano (detached):

```bash
docker compose up --build -d
```

> La interfaz web quedará accesible en el puerto configurado (por ejemplo, http://localhost:3100).

## Configuración y Conexión con el Backend

Asegúrate de configurar las variables de entorno locales (en un archivo `.env` o dentro del `docker-compose.yml`) para que la interfaz se comunique correctamente con el servicio traductor:

```env
Fragmento de código
API_URL=http://localhost:3150
```

# Reto Técnico

Sistema distribuido diseñado para la traducción dinámica de solicitudes de endosos de seguros hacia el formato estructurado requerido por el core, con persistencia en MySQL, ORM robusto y mecanismo de _fallback_ tolerante a fallos.

---

## Arquitectura General

El ecosistema completo se compone de:

- **Backend (`backend-traductor`):** API desarrollada en **Node.js (Hapi)** + **TypeORM** + **MySQL 8.3**, con inyección de datos iniciales mediante un Seeder idempotente.
- **Frontend(s):** Interfaces de usuario para la interacción con los servicios de traducción.
- **Base de Datos:** MySQL 8.3 gestionada mediante contenedores Docker con soporte para **phpMyAdmin**.

---

## Despliegue Cruzado (Docker Compose)

Para levantar o apagar todo el ecosistema de manera cruzada desde la raíz del proyecto, utiliza los siguientes comandos de Docker:

### 1. Detener y limpiar contenedores previos:

```bash
docker compose down -v
```

### 2. Construir y levantar todo el ecosistema en segundo plano:

```bash
docker compose up --build -d
```

## Arquitectura General y Mapeo de Puertos

El ecosistema completo se compone de múltiples microservicios y bases de datos. A continuación se detallan los puertos asignados para su acceso y pruebas:

| Módulo / Componente            | Descripción                           | Puerto Local |
| :----------------------------- | :------------------------------------ | :----------- |
| Frontend - Reto 1 (Endosos)    | Interfaz web del traductor de endosos | 3100         |
| Backend - Reto 1 (Endosos)     | API Hapi.js + TypeORM + MySQL         | 3150         |
| Frontend - Reto 2 (Siniestros) | Interfaz web del módulo de siniestros | 3200         |
| Backend - Reto 2 (Siniestros)  | API del microservicio de siniestros   | 3250         |
| Base de Datos / phpMyAdmin     | Interfaz gráfica y gestión de MySQL   | 8080         |

## Credenciales de la Base de Datos (MySQL)

Para acceder mediante phpMyAdmin (http://localhost:8080) o conectar herramientas externas, utiliza las siguientes credenciales por defecto:

- **Host:** localhost (o el nombre del servicio Docker en red interna)
- **Puerto:** 3306 (interno) / expuesto según configuración
- **Usuario (User):** root (o el usuario configurado en tu .env)
- **Contraseña (Password):** rootpassword (o la clave que hayas definido en tu archivo de variables de entorno)

### Documentación de Módulos e Hijos

Cada submódulo cuenta con su propia especificación técnica detallada y sus instrucciones de ejecución independientes:

- **Backend:** Revisa la documentación específica y los payloads de prueba en el README del Backend.

- **Frontends:** Consulta los archivos README correspondientes dentro de cada directorio de frontend para configurar las variables de entorno de conexión y su respectivo despliegue mediante Docker.

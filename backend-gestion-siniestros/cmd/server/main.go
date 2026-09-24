package main

import (
	"log"
	"os"

	"backend-gestion-siniestros/internal/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "4001"
	}

	r := gin.Default()

	// Configuración de CORS para permitir peticiones desde el frontend sin bloqueos
	r.Use(cors.Default())

	routes.RegisterGruaRoutes(r)

	log.Printf("Servicio de gestión de siniestros (grúas) corriendo en el puerto %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("Error al iniciar el servidor: %v", err)
	}
}
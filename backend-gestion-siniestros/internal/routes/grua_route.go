package routes

import (
	"backend-gestion-siniestros/internal/controllers"
	"github.com/gin-gonic/gin"
)

func RegisterGruaRoutes(r *gin.Engine) {
	api := r.Group("/api/v1")
	{
		api.POST("/siniestros/asignar-grua", controllers.AsignarGruaCercana)
	}
}
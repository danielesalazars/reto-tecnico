package controllers

import (
	"net/http"
	"backend-gestion-siniestros/internal/entities"
	"backend-gestion-siniestros/internal/services"
	"github.com/gin-gonic/gin"
)

func AsignarGruaCercana(c *gin.Context) {
	var req entities.GruaRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos de entrada incorrectos o mal formados: " + err.Error()})
		return
	}

	if len(req.Depots) == 0 || len(req.Graph) == 0 || req.AccidentLocation == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Faltan campos obligatorios: accidentLocation, depots y graph son requeridos."})
		return
	}

	res, err := services.EncontrarRutaOptimalGrua(req)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, res)
}
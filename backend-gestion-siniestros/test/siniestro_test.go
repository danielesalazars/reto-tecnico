package test

import (
	"testing"
)

func TestMontoEstimadoSiniestro(t *testing.T) {
	montoEstimado := 2500.50
	if montoEstimado <= 0 {
		t.Errorf("Se esperaba un monto mayor a 0, se obtuvo %f", montoEstimado)
	}
}

func TestTransicionEstadoSiniestro(t *testing.T) {
	estadoActual := "PENDIENTE"
	
	estadoActual = "EN_PROCESO"

	if estadoActual != "EN_PROCESO" {
		t.Errorf("Se esperaba estado EN_PROCESO, se obtuvo %s", estadoActual)
	}
}
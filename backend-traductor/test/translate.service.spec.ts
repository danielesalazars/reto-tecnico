import { describe, it } from "node:test";
import assert from "node:assert";
import { endorsePayloadSchema } from "../src/entities/endorse.entity";

describe("Translate Service & Payload Validation Tests", () => {
  it("debería validar exitosamente un payload correcto de endoso", () => {
    const validPayload = {
      policyNumber: "08200000049",
      idEnvio: 5984,
      frecuencia: "Semestral",
      tipoEndoso: "CambioFrecuencia",
      producto: "Rumbo",
      plan: "PlanRumbo",
      moneda: "Nuevo Sol",
      usuario: "interface.servicios",
      fechaSolicitud: "2025-08-27",
      fechaCliente: "2025-08-27",
      fechaEfectiva: "2025-09-01",
    };

    const result = endorsePayloadSchema.validate(validPayload);
    assert.strictEqual(result.error, undefined);
    assert.deepStrictEqual(result.value, validPayload);
  });

  it("debería fallar si falta un campo obligatorio como policyNumber", () => {
    const invalidPayload = {
      idEnvio: 5984,
      frecuencia: "Semestral",
      tipoEndoso: "CambioFrecuencia",
      producto: "Rumbo",
      plan: "PlanRumbo",
      moneda: "Nuevo Sol",
      usuario: "interface.servicios",
      fechaSolicitud: "2025-08-27",
      fechaCliente: "2025-08-27",
      fechaEfectiva: "2025-09-01",
    };

    const result = endorsePayloadSchema.validate(invalidPayload);
    assert.notStrictEqual(result.error, undefined);
  });
});

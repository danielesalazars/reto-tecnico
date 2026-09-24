import { describe, it, expect, vi } from "vitest";

describe("Gestión Siniestros Service Core", () => {
  it("debería enviar correctamente la solicitud de registro de siniestro al backend", async () => {
    const mockPayload = {
      codigoReclamo: "SIN-2026-001",
      montoEstimado: 1500.0,
    };

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ status: "CREATED", id: 101 }),
    });

    vi.stubGlobal("fetch", mockFetch);

    const response = await fetch("http://localhost:8080/api/siniestros", {
      method: "POST",
      body: JSON.stringify(mockPayload),
    });
    const data = await response.json();

    expect(mockFetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/siniestros",
      expect.any(Object),
    );
    expect(data.status).toBe("CREATED");
  });
});

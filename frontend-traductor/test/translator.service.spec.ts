import { describe, it, expect, vi } from "vitest";

describe("Translator Service Core Tests", () => {
  it("debería construir y enviar correctamente la petición de endoso", async () => {
    const mockPayload = {
      policyNumber: "08200000049",
      tipoEndoso: "CambioFrecuencia",
    };

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        message: "Endoso traducido con éxito",
      }),
    });

    vi.stubGlobal("fetch", mockFetch);

    const response = await fetch("http://localhost:3000/api/translate", {
      method: "POST",
      body: JSON.stringify(mockPayload),
    });
    const data = await response.json();

    expect(mockFetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/translate",
      expect.any(Object),
    );
    expect(data.success).toBe(true);
  });
});

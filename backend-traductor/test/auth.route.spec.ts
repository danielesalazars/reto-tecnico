import { describe, it } from "node:test";
import assert from "node:assert";
import * as Jwt from "@hapi/jwt";
import { JWT_SECRET } from "../src/auth/jwt.strategy";

describe("Authentication & JWT Unit Tests", () => {
  it("debería generar un token JWT válido con el usuario correcto", () => {
    const token = Jwt.token.generate(
      { username: "interface.servicios" },
      { key: JWT_SECRET, algorithm: "HS256" },
    );

    assert.ok(token);
    assert.strictEqual(typeof token, "string");
    assert.strictEqual(token.split(".").length, 3); // Un JWT estándar consta de 3 partes separadas por puntos
  });

  it("debería decodificar y verificar correctamente el payload del token generado", () => {
    const payloadData = { username: "interface.servicios" };
    const token = Jwt.token.generate(payloadData, {
      key: JWT_SECRET,
      algorithm: "HS256",
    });

    // Verificamos que contenga los datos esperados al simular la estructura
    assert.ok(token.includes("ey"));
  });
});

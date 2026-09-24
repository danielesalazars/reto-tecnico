import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

const SiniestroCoreView = () => (
  <div className="p-6 bg-white rounded-xl shadow-lg">
    <h2 className="text-2xl font-bold text-gray-900">Registro de Siniestro</h2>
    <input
      type="text"
      placeholder="Código de Reclamo"
      aria-label="claim-input"
      className="border p-2 rounded w-full mt-3"
    />
    <button className="bg-red-600 text-white px-4 py-2 mt-4 rounded font-semibold">
      Reportar Siniestro
    </button>
  </div>
);

describe("SiniestroCoreView Component Tests", () => {
  it("debería renderizar los campos y botones con clases de Tailwind correctamente", () => {
    render(<SiniestroCoreView />);

    const title = screen.getByText(/Registro de Siniestro/i);
    const input = screen.getByRole("textbox", { name: /claim-input/i });
    const button = screen.getByRole("button", { name: /Reportar Siniestro/i });

    expect(title).toBeDefined();
    expect(input).toBeDefined();
    expect(button).toHaveClass("bg-red-600");
  });
});

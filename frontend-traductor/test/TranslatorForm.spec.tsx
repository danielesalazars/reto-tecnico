import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

// Componente visual core del traductor
const TranslatorCoreView = () => (
  <div className="p-4 bg-slate-100 rounded-lg shadow-md">
    <h2 className="text-xl font-bold text-slate-800">
      Módulo Traductor de Endosos
    </h2>
    <input
      type="text"
      placeholder="Ingrese número de póliza"
      aria-label="policy-input"
      className="border p-2 rounded w-full mt-2"
    />
    <button className="bg-blue-600 text-white px-4 py-2 mt-3 rounded">
      Traducir Endoso
    </button>
  </div>
);

describe("TranslatorCoreView Component Tests", () => {
  it("debería renderizar correctamente los elementos visuales y estilos de Tailwind", () => {
    render(<TranslatorCoreView />);

    const titleElement = screen.getByText(/Módulo Traductor de Endosos/i);
    const inputElement = screen.getByRole("textbox", { name: /policy-input/i });
    const buttonElement = screen.getByRole("button", {
      name: /Traducir Endoso/i,
    });

    expect(titleElement).toBeDefined();
    expect(inputElement).toBeDefined();
    expect(buttonElement).toHaveClass("bg-blue-600");
  });
});

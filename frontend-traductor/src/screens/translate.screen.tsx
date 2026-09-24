import React, { useState } from "react";
import { translateEndorsementService } from "../services/endorse.service";
import { JsonEditorCard } from "../components/json-editor-card.component";
import { ErrorAlert } from "../components/error-alert.component";
import { EndorseFrequencyEnum } from "../enums/endorse.enum";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3150";

export const TranslateScreen: React.FC = () => {
  const [inputJson, setInputJson] = useState(
    JSON.stringify(
      {
        policyNumber: "08200000049",
        idEnvio: 5984,
        frecuencia: EndorseFrequencyEnum.SEMESTRAL,
        tipoEndoso: "CambioFrecuencia",
        producto: "Rumbo",
        plan: "PlanRumbo",
        moneda: "Nuevo Sol",
        usuario: "interface.servicios",
        fechaSolicitud: "2025-08-27",
        fechaCliente: "2025-08-27",
        fechaEfectiva: "2025-09-01",
      },
      null,
      2,
    ),
  );

  const [outputJson, setOutputJson] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Estados para la gestión del Token
  const [token, setToken] = useState("");
  const [tokenLoading, setTokenLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateToken = async () => {
    setTokenLoading(true);
    setErrorMsg("");
    try {
      const response = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("No se pudo generar el token de autenticación.");
      }

      const data = await response.json();
      setToken(data.token);
      setCopied(false);
    } catch (err: any) {
      setErrorMsg(
        "Error al conectar con el servicio de autenticación (Login).",
      );
    } finally {
      setTokenLoading(false);
    }
  };

  const handleCopyToken = () => {
    if (!token) return;
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTranslate = async () => {
    setErrorMsg("");
    setOutputJson("");
    setLoading(true);

    try {
      let parsed;
      try {
        parsed = JSON.parse(inputJson);
      } catch (syntaxError) {
        setErrorMsg(
          "Error de sintaxis: El texto introducido no es un JSON válido.",
        );
        setLoading(false);
        return;
      }

      const result = await translateEndorsementService(parsed, token);
      setOutputJson(JSON.stringify(result, null, 2));
    } catch (err: any) {
      setErrorMsg("");
      if (err) {
        setOutputJson(JSON.stringify(err, null, 2));
      } else {
        setErrorMsg(
          "Fallo de conexión con el servidor (puerto 3150 no disponible).",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-extrabold mb-6 text-slate-900 border-b pb-3">
        Traductor de Endosos - Core (TO-BE)
      </h1>

      <ErrorAlert message={errorMsg} />

      <div className="mb-8 p-5 bg-white shadow-sm border border-slate-200 rounded-lg">
        <h2 className="text-lg font-bold text-slate-800 mb-2">
          Gestión de Token de Autenticación (JWT)
        </h2>
        <p className="text-sm text-slate-600 mb-4">
          Genera un token de acceso para autorizar las solicitudes hacia el
          microservicio.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={handleGenerateToken}
            disabled={tokenLoading}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors disabled:opacity-50 text-sm shadow-sm"
          >
            {tokenLoading ? "Generando..." : "Generar Token"}
          </button>

          <input
            type="text"
            readOnly
            value={token}
            placeholder="El token generado aparecerá aquí..."
            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm text-slate-700 font-mono focus:outline-none"
          />

          <button
            onClick={handleCopyToken}
            disabled={!token}
            className={`px-4 py-2 font-medium rounded-md transition-colors text-sm shadow-sm ${
              copied
                ? "bg-emerald-600 text-white"
                : "bg-slate-200 hover:bg-slate-300 text-slate-800 disabled:opacity-50"
            }`}
          >
            {copied ? "¡Copiado!" : "Copiar Token"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <JsonEditorCard
          title="JSON Plano (Entrada):"
          value={inputJson}
          onChange={(e) => setInputJson(e.target.value)}
          buttonText="Traducir al Core"
          onButtonClick={handleTranslate}
          loading={loading}
          isError={Boolean(errorMsg)}
        />

        <JsonEditorCard
          title="JSON Estructurado (Salida Core / Respuesta):"
          value={outputJson}
          readOnly={true}
          placeholder="// El resultado traducido o la respuesta del microservicio aparecerá aquí..."
        />
      </div>
    </div>
  );
};

export default TranslateScreen;

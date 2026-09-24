import React, { useState } from "react";
import { procesarSiniestroService } from "../services/siniestro.service";
import { siniestroInputSchema } from "../schemas/siniestro.schema";
import { JsonEditorCard } from "../components/json-editor-card.component";
import { ErrorAlert } from "../components/error-alert.component";
import { SINIESTRO_LABELS } from "../constants/siniestro.constant";

export const SiniestroGestionScreen: React.FC = () => {
  const [inputJson, setInputJson] = useState(
    JSON.stringify(
      {
        accidentLocation: "San Isidro",
        depots: ["Miraflores", "Ate"],
        graph: {
          Miraflores: { "San Isidro": 7, Barranco: 3 },
          "San Isidro": { Miraflores: 7, Lince: 4 },
          Barranco: { Miraflores: 3, Surco: 5 },
          Lince: { "San Isidro": 4, Surco: 6 },
          Surco: { Barranco: 5, Lince: 6, Ate: 10 },
          Ate: { Surco: 10 },
        },
      },
      null,
      2,
    ),
  );

  const [outputJson, setOutputJson] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleProcesar = async () => {
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

      const validationResult = siniestroInputSchema.safeParse(parsed);

      if (!validationResult.success) {
        setOutputJson(JSON.stringify(validationResult.error.format(), null, 2));
        setLoading(false);
        return;
      }

      const result = await procesarSiniestroService(validationResult.data);
      setOutputJson(JSON.stringify(result, null, 2));
    } catch (error: any) {
      if (error.response) {
        setOutputJson(JSON.stringify(error.response.data, null, 2));
      } else {
        setOutputJson(
          JSON.stringify(
            {
              error:
                error.message ||
                "Fallo de conexión con el servidor (puerto 3250 no disponible).",
            },
            null,
            2,
          ),
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-extrabold mb-6 text-slate-900 border-b pb-3">
        {SINIESTRO_LABELS.MODULE_TITLE}
      </h1>

      <ErrorAlert message={errorMsg} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <JsonEditorCard
          title={SINIESTRO_LABELS.INPUT_TITLE}
          value={inputJson}
          onChange={(e) => setInputJson(e.target.value)}
          buttonText={SINIESTRO_LABELS.SUBMIT_BUTTON}
          onButtonClick={handleProcesar}
          loading={loading}
          isError={Boolean(errorMsg)}
        />

        <JsonEditorCard
          title={SINIESTRO_LABELS.OUTPUT_TITLE}
          value={outputJson}
          readOnly={true}
          placeholder={SINIESTRO_LABELS.PLACEHOLDER_OUTPUT}
        />
      </div>
    </div>
  );
};
export default SiniestroGestionScreen;

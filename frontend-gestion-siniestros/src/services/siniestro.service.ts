import axios from "axios";
import type { SiniestroInputDto } from "../schemas/siniestro.schema";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3250";

export const procesarSiniestroService = async (payload: SiniestroInputDto) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/siniestros/asignar-grua`,
    payload,
  );
  return response.data;
};

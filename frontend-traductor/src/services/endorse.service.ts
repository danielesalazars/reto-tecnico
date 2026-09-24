import axios from "axios";
import { type EndorseInputDto } from "../schemas/endorse.schema";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3150";

export const translateEndorsementService = async (
  payload: EndorseInputDto,
  token?: string,
) => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await axios.post(
      `${API_URL}/api/v1/endorse/translate`,
      payload,
      { headers },
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw { error: "Error de conexión o fallo con el servidor." };
  }
};

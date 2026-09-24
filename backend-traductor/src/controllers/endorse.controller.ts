import { Request, ResponseToolkit } from "@hapi/hapi";
import { EndorseService } from "../services/endorse.service";

const endorseService = new EndorseService();

export const translateEndorseController = async (
  request: Request,
  h: ResponseToolkit,
) => {
  try {
    const payload = request.payload;
    const result = await endorseService.translateEndorsement(payload);
    return h.response(result).code(200);
  } catch (error: any) {
    return h.response({ error: error.message }).code(400);
  }
};

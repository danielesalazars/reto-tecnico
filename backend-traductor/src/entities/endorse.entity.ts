import Joi from "joi";

export const endorsePayloadSchema = Joi.object({
  policyNumber: Joi.string().required(),
  idEnvio: Joi.number().required(),
  frecuencia: Joi.string().required(),
  tipoEndoso: Joi.string().required(),
  producto: Joi.string().required(),
  plan: Joi.string().required(),
  moneda: Joi.string().required(),
  usuario: Joi.string().required(),
  fechaSolicitud: Joi.string().required(),
  fechaCliente: Joi.string().required(),
  fechaEfectiva: Joi.string().required(),
});

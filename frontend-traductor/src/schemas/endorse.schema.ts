import { z } from "zod";

export const endorseInputSchema = z.object({
  policyNumber: z.string().min(1, "El número de póliza es requerido"),
  idEnvio: z.number(),
  frecuencia: z.string().min(1, "La frecuencia es requerida"),
  tipoEndoso: z.string().min(1, "El tipo de endoso es requerido"),
  producto: z.string().min(1, "El producto es requerido"),
  plan: z.string().min(1, "El plan es requerido"),
  moneda: z.string().min(1, "La moneda es requerida"),
  usuario: z.string().min(1, "El usuario es requerido"),
  fechaSolicitud: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
  fechaCliente: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
  fechaEfectiva: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
});

export type EndorseInputDto = z.infer<typeof endorseInputSchema>;

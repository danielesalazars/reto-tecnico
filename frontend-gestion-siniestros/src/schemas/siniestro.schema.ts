import { z } from "zod";

export const siniestroInputSchema = z.object({
  accidentLocation: z
    .string()
    .min(1, "La ubicación del accidente es requerida"),
  depots: z.array(z.string()).min(1, "Debe especificar al menos un depósito"),
  graph: z.record(z.string(), z.record(z.string(), z.number())),
});

export type SiniestroInputDto = z.infer<typeof siniestroInputSchema>;

export const EndorseFrequencyEnum = {
  SEMESTRAL: "Semestral",
  ANUAL: "Anual",
  MENSUAL: "Mensual",
} as const;

export type EndorseFrequencyEnum =
  (typeof EndorseFrequencyEnum)[keyof typeof EndorseFrequencyEnum];

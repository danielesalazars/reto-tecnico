export interface TemplateModel {
  id: string;
  product: string;
  endorsementType: string;
  defaultValues: Record<string, any>;
  eventAppliedEntities: Array<{ description: string; orderEvent: number }>;
}

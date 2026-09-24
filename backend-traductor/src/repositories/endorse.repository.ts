import { AppDataSource } from "../config/database.config";
import { TemplateEntity } from "../entities/template.entity";
import { TemplateModel } from "../models/template.model";

export class EndorseRepository {
  public async findTemplate(
    product: string,
    endorsementType: string,
  ): Promise<TemplateModel | null> {
    try {
      if (AppDataSource.isInitialized) {
        const repository = AppDataSource.getRepository(TemplateEntity);

        const template = await repository.findOne({
          where: { producto: product, tipoEndoso: endorsementType },
        });

        if (template) {
          console.log("Plantilla obtenida desde la Base de Datos (MySQL)");
          return {
            id: String(template.id),
            product: template.producto,
            endorsementType: template.tipoEndoso,
            defaultValues: template.defaultValues,
            eventAppliedEntities: template.eventAppliedEntities,
          };
        }

        console.log("Plantilla no encontrada en la BD para esta combinación.");
        return null;
      }
    } catch (error) {
      console.warn(
        "Error crítico de conexión a la BD, usando datos mockeados de respaldo (Fallback):",
        error,
      );
    }

    console.log("Usando datos mockeados por caída de BD (Fallback)");
    return {
      id: "template-mock-001",
      product,
      endorsementType,
      defaultValues: {
        "Inicio Vigencia Endoso": "Default",
        ResponsableAtencion: "SAC",
      },
      eventAppliedEntities: [
        { description: "SolicitarEndoso", orderEvent: 1 },
        { description: "AprobarEndoso", orderEvent: 2 },
      ],
    };
  }
}

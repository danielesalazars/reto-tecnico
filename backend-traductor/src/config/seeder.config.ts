import { AppDataSource } from "./database.config";
import { TemplateEntity } from "../entities/template.entity";

export const seedTemplates = async () => {
  try {
    if (!AppDataSource.isInitialized) return;

    const repository = AppDataSource.getRepository(TemplateEntity);

    const count = await repository.count();
    if (count > 0) {
      console.log(
        `La tabla de plantillas ya cuenta con ${count} registros. Se omite el seeder.`,
      );
      return;
    }

    console.log("Generando lote masivo de plantillas (Seeder masivo)...");

    const productos = [
      "Rumbo",
      "Vehicular",
      "Vida",
      "Hogar",
      "Salud",
      "Accidentes",
      "Empresarial",
      "SOAT",
      "Viajes",
      "ResponsabilidadCivil",
    ];
    const tiposEndoso = [
      "CambioFrecuencia",
      "CambioSumaAsegurada",
      "ModificacionBeneficiario",
      "CambioDomicilio",
      "ExtensionVigencia",
      "ExclusionCobertura",
      "InclusionCobertura",
      "CambioFormaPago",
      "RehabilitacionPoliza",
      "AnulacionParcial",
    ];

    const templatesToInsert: Partial<TemplateEntity>[] = [];

    for (const producto of productos) {
      for (const tipoEndoso of tiposEndoso) {
        templatesToInsert.push({
          producto,
          tipoEndoso,
          defaultValues: {
            "Inicio Vigencia Endoso": "Default",
            ResponsableAtencion: "SAC",
            CodigoCanal: `CANAL_${producto.toUpperCase()}`,
          },
          eventAppliedEntities: [
            { description: "SolicitarEndoso", orderEvent: 1 },
            { description: "AprobarEndoso", orderEvent: 2 },
            { description: "NotificarCore", orderEvent: 3 },
          ],
          dynamicDataConfig: [
            { etiqueta: "Productos Vida", defaultValue: producto },
            { etiqueta: "Nombre Usuario", defaultValue: "interface.servicios" },
            { etiqueta: "Numero Poliza Endoso" },
            { etiqueta: "TipoEndosoPol", defaultValue: "Endoso Simple" },
            { etiqueta: "ResponsableAtencion", defaultValue: "SAC" },
            { etiqueta: "EndosoModifPrima", defaultValue: "Si" },
            { etiqueta: "Inicio Vigencia Endoso", defaultValue: "Default" },
            { etiqueta: "Tipo Vigencia Endoso", defaultValue: "" },
            {
              etiqueta: `EndososSimplesSAC${producto}`,
              defaultValue: "TES008",
            },
            { etiqueta: "Fecha Solicitud" },
            { etiqueta: "Fecha Cliente" },
            { etiqueta: "Fecha Efectiva" },
          ],
        });
      }
    }

    await repository.save(templatesToInsert);
    console.log(
      `¡Se han insertado exitosamente ${templatesToInsert.length} registros en la base de datos!`,
    );
  } catch (error) {
    console.error("Error al ejecutar el seeder masivo:", error);
  }
};

export class EndorseMapper {
  public static toCoreStructure(input: any, template: any): any {
    return {
      policyNumber: input.policyNumber,
      idEnvio: input.idEnvio,
      financialPlansEntity: {
        description: input.frecuencia,
      },
      currency: {
        description: input.moneda,
      },
      productEntity: {
        description: input.producto,
      },
      eventEntity: {
        description: "SolicitarEndoso",
        dynamicData: [
          { etiqueta: "Productos Vida", value: input.producto },
          { etiqueta: "Nombre Usuario", value: input.usuario },
          { etiqueta: "Numero Poliza Endoso", value: input.policyNumber },
          { etiqueta: "TipoEndosoPol", value: "Endoso Simple" },
          {
            etiqueta: "ResponsableAtencion",
            value: template.defaultValues?.ResponsableAtencion || "SAC",
          },
          { etiqueta: "EndosoModifPrima", value: "Si" },
          {
            etiqueta: "Inicio Vigencia Endoso",
            value:
              template.defaultValues?.["Inicio Vigencia Endoso"] || "Default",
          },
          { etiqueta: "Tipo Vigencia Endoso", value: "" },
          { etiqueta: "Endosos SimplesSACRumbo", value: "TES008" },
          { etiqueta: "Fecha Solicitud", value: input.fechaSolicitud },
          { etiqueta: "Fecha Cliente", value: input.fechaCliente },
          { etiqueta: "Fecha Efectiva", value: input.fechaEfectiva },
        ],
      },
      eventAppliedEntities: template.eventAppliedEntities || [],
      riskUnitEntities: [
        {
          insuranceObjectEntities: [
            {
              insuranceObjectNumber: "1",
              coverageEntities: [],
              participationEntities: [],
            },
          ],
          plansEntity: {
            description: input.plan,
          },
          riskUnitNumber: "1",
        },
      ],
      participationEntities: [],
    };
  }
}

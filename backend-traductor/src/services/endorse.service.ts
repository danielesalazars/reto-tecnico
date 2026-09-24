import { EndorseRepository } from "../repositories/endorse.repository";
import { EndorseMapper } from "../mappers/endorse.mapper";

export class EndorseService {
  private endorseRepository = new EndorseRepository();

  public async translateEndorsement(payload: any) {
    const template = await this.endorseRepository.findTemplate(
      payload.producto,
      payload.tipoEndoso,
    );

    if (!template) {
      throw new Error(
        `No se encontró una plantilla para el producto ${payload.producto} y tipo de endoso ${payload.tipoEndoso}`,
      );
    }

    const structuredData = EndorseMapper.toCoreStructure(payload, template);
    return structuredData;
  }
}

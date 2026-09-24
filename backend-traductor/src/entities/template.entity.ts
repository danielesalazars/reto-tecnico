import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("templates")
export class TemplateEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  producto!: string;

  @Column({ type: "varchar", length: 100 })
  tipoEndoso!: string;

  @Column({ type: "json" })
  defaultValues!: Record<string, any>;

  @Column({ type: "json" })
  eventAppliedEntities!: Array<{ description: string; orderEvent: number }>;

  @Column({ type: "json" })
  dynamicDataConfig!: Array<{ etiqueta: string; defaultValue?: string }>;
}

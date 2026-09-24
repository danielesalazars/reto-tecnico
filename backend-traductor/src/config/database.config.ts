import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { TemplateEntity } from "../entities/template.entity";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "mysql-db",
  port: 3306,
  username: process.env.DB_USER || "db_user",
  password: process.env.DB_PASSWORD || "db_password",
  database: process.env.DB_NAME || "endorse_db",
  synchronize: true,
  logging: false,
  entities: [TemplateEntity],
  subscribers: [],
  migrations: [],
});

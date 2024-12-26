import "reflect-metadata";
import { DataSource } from "typeorm";
import { InvoiceEntity } from "./invoice-creation/entity/invoice.entity";

export const AppDataSource = new DataSource({
  type: "mongodb",
  host: process.env.DATABASE_HOST || "db",
  port: Number(process.env.MONGO_PORT) || 27017,
  database: process.env.DATABASE_NAME,
  //   username: process.env.MONGO_INITDB_ROOT_USERNAME,
  //   password: process.env.MONGO_INITDB_ROOT_PASSWORD,
  synchronize: true,
  logging: false,
  entities: [InvoiceEntity],
  migrations: [],
  subscribers: [],
});

import { DataSource } from "typeorm";
import { InvoiceEntity } from "../entity/invoice.entity";

export const createTestDb = async () => {
  // Create a TypeORM DataSource instance with the pg-mem adapter
  const dataSource = new DataSource({
    type: "mongodb",
    host: "localhost", //process.env.DATABASE_HOST || "db",
    port: Number(process.env.MONGO_PORT) || 27017,
    database: process.env.TEST_DATABASE_NAME,
    //   username: process.env.MONGO_INITDB_ROOT_USERNAME,
    //   password: process.env.MONGO_INITDB_ROOT_PASSWORD,
    synchronize: true,
    logging: false,
    entities: [InvoiceEntity],
    migrations: [],
    subscribers: [],
  });

  // Initialize the DataSource
  await dataSource.initialize();

  return dataSource;
};

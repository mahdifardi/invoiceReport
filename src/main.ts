import { makeApp } from "./api";
import { AppDataSource } from "./data-source";
import { ServiceFactory } from "./utility/ServiceFactory";

const run = async () => {
  const PORT = Number(process.env.BACKEND_PORT) || 3000;

  const dataSource = await AppDataSource.initialize();
  const serviceFactory = new ServiceFactory(dataSource);

  const app = makeApp(dataSource, serviceFactory.getInvoiceHandler());

  app.listen(PORT, () => {
    console.log("Listening on Port " + PORT);
  });

  process.on("SIGINT", () => {
    console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
    process.exit(0);
  });
};

run();

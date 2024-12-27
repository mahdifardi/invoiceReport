import { makeApp } from "./api";
import { AppDataSource } from "./data-source";
import { ServiceFactory } from "./invoice-creation/utility/ServiceFactory";
import { RabbitMQService } from "./sales-report/rabbitmq.service";
import { RabbitMQConnection } from "./sales-report/rabbitqm-connection.";
import { CronJobService } from "./sales-report/sales-summary-report";

const run = async () => {
  const PORT = Number(process.env.BACKEND_PORT) || 3000;

  const dataSource = await AppDataSource.initialize();
  const serviceFactory = new ServiceFactory(dataSource);

  const app = makeApp(dataSource, serviceFactory.getInvoiceHandler());

  
  const cronJobService = new CronJobService(serviceFactory.getInvoiceService(),serviceFactory.getRabbitMQService());

  app.listen(PORT, () => {
    console.log("Listening on Port " + PORT);
  });

  process.on("SIGINT", () => {
    console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
    process.exit(0);
  });
};

run();

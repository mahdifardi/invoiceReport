import { CronJob } from "cron";
import { InvoiceService } from "../invoice-creation/invoice.service";
import { RabbitMQService } from "./rabbitmq.service";

export class CronJobService {
  constructor(
    private invoiceService: InvoiceService,
    private rabbitMQService: RabbitMQService
  ) {
    this.scheduleJob();
  }

  async handleTask() {
    try {
      const result = await this.invoiceService.getDailyReport();
      console.log("###################");

      await this.rabbitMQService.sendReport(
        process.env.RabbitMQ_QUEUE_NAME!,
        result
      );

      console.log(result);
      console.log("###################");
    } catch (error) {
      console.error("Task failed", error);
    }
  }

  scheduleJob() {
    const job = new CronJob(
      "0 12 * * *",
      async () => {
        await this.handleTask();
      },
      null,
      true
    );

    job.start();
  }
}

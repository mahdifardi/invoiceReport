import { CronJob } from "cron";
import { InvoiceService } from "../invoice-creation/invoice.service";

export class CronJobService {
  constructor(private invoiceService: InvoiceService) {
    this.scheduleJob();
  }

  async handleTask() {
    try {
      const result = await this.invoiceService.getDailyReport();
      console.log("###################");
      console.log(result);
      console.log("###################");
    } catch (error) {
      console.error("Task failed", error);
    }
  }

  scheduleJob() {
    const job = new CronJob(
      "* * * * *",
      async () => {
        await this.handleTask();
      },
      null,
      true
    );

    job.start();
  }
}

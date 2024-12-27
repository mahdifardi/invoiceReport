import { RabbitMQConnection } from "./rabbitqm-connection.";
import { DailySummaryReport } from "./report.model";

export class RabbitMQService {
    constructor(
        private rabbitMQConnection: RabbitMQConnection
    ){}

    async sendReport(queue: string, dailySummaryReport: DailySummaryReport) {
        await this.rabbitMQConnection.sendToQueue(queue, dailySummaryReport);
        console.log("Sent the dailySummaryReport to queue")
    }
}
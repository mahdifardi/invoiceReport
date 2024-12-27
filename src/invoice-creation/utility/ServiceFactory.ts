import { DataSource } from "typeorm";
import { InvoiceRepository } from "../invoice.repository";
import { InvoiceService } from "../invoice.service";
import { InvoiceHnadler } from "../invoiceHnadler";
import { RabbitMQConnection } from "../../sales-report/rabbitqm-connection.";
import { RabbitMQService } from "../../sales-report/rabbitmq.service";

export class ServiceFactory {
  private dataSource: DataSource;
  private invoiceHandler: InvoiceHnadler;
  private invoiceRepo: InvoiceRepository;
  private invliceService: InvoiceService;
  private mqConnection: RabbitMQConnection;
  private mqService: RabbitMQService;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;

    this.invoiceRepo = new InvoiceRepository(this.dataSource);

    this.invliceService = new InvoiceService(this.invoiceRepo);

    this.invoiceHandler = new InvoiceHnadler(this.invliceService);

    this.mqConnection = new RabbitMQConnection()

    this.mqService = new RabbitMQService(this.mqConnection)
  }

  getInvoiceHandler(): InvoiceHnadler {
    return this.invoiceHandler;
  }

  getInvoiceService(): InvoiceService {
    return this.invliceService;
  }

  getRabbitMQService(): RabbitMQService {
    return this.mqService;
  }
}

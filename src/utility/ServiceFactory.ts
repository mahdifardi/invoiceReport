import { DataSource } from "typeorm";
import { InvoiceHnadler } from "../invoiceHnadler";
import { InvoiceRepository } from "../invoice.repository";
import { InvoiceService } from "../invoice.service";

export class ServiceFactory {
  private dataSource: DataSource;
  private invoiceHandler: InvoiceHnadler;
  private invoiceRepo: InvoiceRepository;
  private invliceService: InvoiceService;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;

    this.invoiceRepo = new InvoiceRepository(this.dataSource);

    this.invliceService = new InvoiceService(this.invoiceRepo);

    this.invoiceHandler = new InvoiceHnadler(this.invliceService);
  }

  getInvoiceHandler(): InvoiceHnadler {
    return this.invoiceHandler;
  }
}

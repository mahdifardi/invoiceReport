import { InvoiceDto } from "./dto/invoice.dto";
import { InvoiceEntity } from "./entity/invoice.entity";
import { InvoiceService } from "./invoice.service";
import { Invoice } from "./model/invoice.model";

export class InvoiceHnadler {
  constructor(private invoiceService: InvoiceService) {}

  public async createInvoice(dto: InvoiceDto): Promise<Invoice> {
    return this.invoiceService.createInvoice(dto);
  }

  public async getInvoiceById(
    invoiceId: string
  ): Promise<InvoiceEntity | null> {
    return this.invoiceService.getInvoiceById(invoiceId);
  }

  public async getInvoices(): Promise<Invoice[]> {
    return this.invoiceService.getInvoices();
  }
}

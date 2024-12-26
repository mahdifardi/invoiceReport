import { ObjectId } from "mongodb";
import { InvoiceDto } from "./dto/invoice.dto";
import { InvoiceRepository } from "./invoice.repository";
import { Invoice } from "./model/invoice.model";
import { InvoiceEntity } from "./entity/invoice.entity";

export class InvoiceService {
  constructor(private invoiceRepo: InvoiceRepository) {}

  async createInvoice(dto: InvoiceDto): Promise<InvoiceEntity> {
    const invoice = this.invoiceRepo.create(dto);

    return invoice;
  }

  async getInvoiceById(invoiceId: string): Promise<InvoiceEntity | null> {
    const invoiceObjectId = new ObjectId(invoiceId);
    const invoice = this.invoiceRepo.getInvoiceById(invoiceObjectId);

    return invoice;
  }

  async getInvoices(): Promise<Invoice[]> {
    const invoice = this.invoiceRepo.getInvoices();

    return invoice;
  }
}

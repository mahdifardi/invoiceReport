import { ObjectId } from "mongodb";
import { InvoiceDto } from "./dto/invoice.dto";
import { InvoiceRepository } from "./invoice.repository";
import { Invoice } from "./model/invoice.model";
import { InvoiceEntity } from "./entity/invoice.entity";
import { DailySummaryReport } from "../sales-report/report.model";

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

  async getDailyReport(): Promise<DailySummaryReport> {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // Start of the day (00:00:00)
    console.log(startOfDay);
    const endOfDay = new Date(startOfDay);
    endOfDay.setHours(23, 59, 59, 999); // End of the day (23:59:59)
    console.log(endOfDay);

    const result = this.invoiceRepo.getDailySummary(startOfDay, endOfDay);

    return result;
  }
}
